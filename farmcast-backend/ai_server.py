from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from dotenv import load_dotenv
import io
import json
import re
import os
import uvicorn

load_dotenv()

CROP_MODEL_PATH = os.environ.get(
    "FARMCAST_CROP_MODEL",
    "yolo_fruits_and_vegetables_v1.pt"
)

DISEASE_MODEL_PATH = os.environ.get(
    "FARMCAST_DISEASE_MODEL",
    "PlantDiseaseDetection.pt"
)

CROP_CONFIDENCE = float(os.environ.get("FARMCAST_CROP_CONF", "0.40"))
DISEASE_CONFIDENCE = float(os.environ.get("FARMCAST_DISEASE_CONF", "0.25"))

app = FastAPI(title="FarmCast AI Server", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

crop_model = None
disease_model = None


def get_crop_model():
    """Lazy-load the YOLO V1 fruit/vegetable model."""
    global crop_model
    if crop_model is None:
        from ultralytics import YOLO
        crop_model = YOLO(CROP_MODEL_PATH)
        print(f"✅ Crop model loaded successfully from: {CROP_MODEL_PATH}")
        print(f"🌱 Crop model classes: {crop_model.names}")
    return crop_model


def get_disease_model():
    """Lazy-load the plant disease detection model."""
    global disease_model
    if disease_model is None:
        from ultralytics import YOLO
        disease_model = YOLO(DISEASE_MODEL_PATH)
        print(f"✅ Disease model loaded successfully from: {DISEASE_MODEL_PATH}")
        print(f"🦠 Disease model classes: {disease_model.names}")
    return disease_model


CROP_MAPPING = {
    "tomato": "Tomato",
    "eggplant/aubergine": "Eggplant",
    "edible corn/corn/maize": "Corn",
    "green bean": "Sitaw",
    "sweet potato": "Kamote",
    "garlic/ail": "Garlic",
    "onion": "Onion",
}

DISEASE_CROP_MAPPING = {
    "tomato": "Tomato",
    "corn": "Corn",
    "eggplant": "Eggplant",
    "garlic": "Garlic",
    "rice": "Rice",
    "cabbage": "Cabbage",
}

HEALTHY_LABELS = {
    "tomato healthy",
    "corn healthy",
}

NEUTRAL_LEAF_LABELS = {
    "tomato leaf",
    "corn leaf",
    "eggplant leaf",
    "garlic leaf",
    "rice leaf",
    "cabbage leaf",
}

def map_crop_label(yolo_label):
    """Map an exact YOLO V1 class to a FarmCast canonical crop name."""
    normalized = str(yolo_label).strip().lower()
    return CROP_MAPPING.get(normalized)

def get_disease_recommendation(health_status):
    status = health_status.lower()

    if health_status == "Healthy":
        return {
            "severity": "none",
            "description": "No disease was detected in the plant.",
            "treatments": [
                "Continue regular plant care.",
                "Maintain proper watering and sunlight.",
                "Monitor the plant regularly for new symptoms."
            ]
        }

    if health_status == "No specific disease detected":
        return {
            "severity": "none",
            "description": "The plant was identified, but no specific disease was detected.",
            "treatments": [
                "Continue monitoring the plant.",
                "Maintain proper watering and plant care.",
                "Scan again if visible symptoms develop."
            ]
        }

    if "blight" in status:
        return {
            "severity": "medium",
            "description": "Signs consistent with a blight disease were detected.",
            "treatments": [
                "Remove heavily affected leaves.",
                "Avoid overhead watering.",
                "Improve airflow around the plant.",
                "Monitor nearby plants for similar symptoms."
            ]
        }

    if "rust" in status:
        return {
            "severity": "medium",
            "description": "Signs consistent with a rust disease were detected.",
            "treatments": [
                "Remove heavily affected leaves.",
                "Keep foliage dry when watering.",
                "Improve spacing and airflow.",
                "Monitor the plant for spreading symptoms."
            ]
        }

    if "mildew" in status:
        return {
            "severity": "medium",
            "description": "Signs consistent with mildew were detected.",
            "treatments": [
                "Remove badly affected leaves.",
                "Improve airflow around the plant.",
                "Avoid prolonged moisture on leaves.",
                "Monitor new growth for symptoms."
            ]
        }

    if "leaf spot" in status or "spot" in status:
        return {
            "severity": "medium",
            "description": "Leaf spot symptoms were detected.",
            "treatments": [
                "Remove severely affected leaves.",
                "Avoid wetting foliage during watering.",
                "Keep the growing area clean.",
                "Monitor nearby leaves for spreading spots."
            ]
        }

    if "virus" in status or "mosaic" in status:
        return {
            "severity": "high",
            "description": "Symptoms consistent with a viral plant disease were detected.",
            "treatments": [
                "Separate the affected plant from healthy plants when possible.",
                "Remove severely affected plant material.",
                "Control insects that may spread plant viruses.",
                "Clean tools after handling affected plants."
            ]
        }

    if "wilt" in status:
        return {
            "severity": "high",
            "description": "Wilt symptoms were detected.",
            "treatments": [
                "Check soil moisture and drainage.",
                "Remove severely affected plant material.",
                "Avoid spreading contaminated soil between plants.",
                "Monitor nearby plants for similar symptoms."
            ]
        }

    return {
        "severity": "unknown",
        "description": f"The local AI detected {health_status}.",
        "treatments": [
            "Monitor the affected plant closely.",
            "Remove severely damaged plant material.",
            "Maintain proper watering and growing conditions."
        ]
    }
    
def parse_disease_label(raw_label):
    label = str(raw_label).strip()
    lower = label.lower()

    crop_name = "Unknown"
    crop_prefix = None

    for prefix, canonical_crop in DISEASE_CROP_MAPPING.items():
        if lower.startswith(prefix):
            crop_name = canonical_crop
            crop_prefix = prefix
            break

    if lower in HEALTHY_LABELS:
        health_status = "Healthy"

    elif lower in NEUTRAL_LEAF_LABELS:
        health_status = "No specific disease detected"

    else:
        disease = lower

        if crop_prefix:
            disease = disease[len(crop_prefix):].strip()

        health_status = (
            disease.title()
            if disease
            else "Unable to determine"
        )

    return {
        "plant_name": crop_name,
        "health_status": health_status
    }
    
def build_detection(box, label, img_width, img_height):
    """Convert one Ultralytics box to FarmCast's normalized response format."""
    x1, y1, x2, y2 = box.xyxy[0].tolist()
    conf = float(box.conf[0])

    return {
        "label": str(label),
        "confidence": round(conf * 100, 1),
        "bbox": {
            "x": round(x1 / img_width, 4),
            "y": round(y1 / img_height, 4),
            "width": round((x2 - x1) / img_width, 4),
            "height": round((y2 - y1) / img_height, 4),
        }
    }


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "🌿 FarmCast Local AI Server is running!",
        "version": app.version,
        "crop_model": os.path.basename(CROP_MODEL_PATH),
        "disease_model": os.path.basename(DISEASE_MODEL_PATH),
    }


@app.post("/detect")
async def detect_realtime(file: UploadFile = File(...)):
    """Real-time crop identification using YOLO V1."""
    try:
        await file.seek(0)
        contents = await file.read()

        if not contents:
            return {
                "success": False,
                "error": "Empty image",
                "detections": []
            }

        try:
            image = Image.open(io.BytesIO(contents)).convert("RGB")
        except Exception as img_err:
            return {
                "success": False,
                "error": f"Invalid image: {str(img_err)}",
                "detections": []
            }

        if max(image.size) > 640:
            ratio = 640 / max(image.size)
            new_size = (
                max(1, int(image.width * ratio)),
                max(1, int(image.height * ratio))
            )
            image = image.resize(new_size, Image.LANCZOS)

        img_width, img_height = image.size
        model = get_crop_model()

        results = model(
            image,
            conf=CROP_CONFIDENCE,
            verbose=False
        )

        detections = []

        for result in results:
            boxes = result.boxes
            if boxes is None:
                continue

            for box in boxes:
                cls = int(box.cls[0])
                raw_label = model.names[cls]
                farmcast_crop = map_crop_label(raw_label)

                if farmcast_crop is None:
                    continue

                detection = build_detection(
                    box,
                    farmcast_crop,
                    img_width,
                    img_height
                )
                detection["raw_label"] = str(raw_label)
                detections.append(detection)

        detections.sort(
            key=lambda detection: detection["confidence"],
            reverse=True
        )

        return {
            "success": True,
            "detections": detections[:10],
            "image_size": {
                "width": img_width,
                "height": img_height
            },
            "model": "yolo_v1_crop",
            "confidence_threshold": CROP_CONFIDENCE,
        }

    except Exception as e:
        print(f"❌ Detect exception: {e}")
        return {
            "success": False,
            "error": str(e),
            "detections": []
        }
    
@app.post("/scan")
async def scan_plant(file: UploadFile = File(...)):
    """Full plant-health scan using disease YOLO + optional Claude analysis."""
    try:
        await file.seek(0)
        contents = await file.read()

        if not contents or len(contents) < 100:
            return {
                "success": False,
                "error": "Empty or corrupt image",
                "detections": [],
                "analysis": {}
            }

        try:
            image = Image.open(io.BytesIO(contents)).convert("RGB")
        except Exception as img_err:
            return {
                "success": False,
                "error": f"Invalid image: {str(img_err)}",
                "detections": [],
                "analysis": {}
            }

        img_width, img_height = image.size
        model = get_disease_model()

        results = model(
            image,
            conf=DISEASE_CONFIDENCE,
            verbose=False
        )

        detections = []

        for result in results:
            boxes = result.boxes
            if boxes is None:
                continue

            for box in boxes:
                cls = int(box.cls[0])
                label = model.names[cls]
                detections.append(
                    build_detection(
                        box,
                        label,
                        img_width,
                        img_height
                    )
                )

        detections.sort(
            key=lambda detection: detection["confidence"],
            reverse=True
        )

        if detections:
            top_detection = detections[0]


            parsed = parse_disease_label(top_detection["label"])
            recommendation = get_disease_recommendation(
                parsed["health_status"]
            )

            analysis = {
                "plant_name": parsed["plant_name"],
                "plant_type": "Crop",
                "health_status": parsed["health_status"],
                "severity": recommendation["severity"],
                "confidence": top_detection["confidence"],
                "description": recommendation["description"],
                "treatments": recommendation["treatments"]
            }
        else:
            analysis = {
                "plant_name": "Unknown",
                "plant_type": "Crop",
                "health_status": "Unable to determine",
                "severity": "unknown",
                "confidence": 0,
                "description": (
                    "No reliable disease detection was produced by the local model."
                ),
                "treatments": []
            }

        return {
            "success": True,
            "image_size": {
                "width": img_width,
                "height": img_height
            },
            "detections": detections,
            "analysis": analysis,
            "model": "plant_disease_detection",
            "confidence_threshold": DISEASE_CONFIDENCE,
        }

    except Exception as e:
        print(f"❌ Scan exception: {e}")
        return {
            "success": False,
            "error": str(e),
            "detections": [],
            "analysis": {}
        }


if __name__ == "__main__":
    uvicorn.run(
        "ai_server:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )
