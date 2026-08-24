from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import anthropic
import base64
import io
import json
import re
import os

# ============================================================
# CONFIG
# ============================================================

CLAUDE_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
YOLO_MODEL_PATH = os.environ.get(
    "FARMCAST_YOLO_MODEL",
    "yolov8n.pt"
)

PORT = int(os.environ.get("PORT", 8000))

# Keep CPU/thread usage low for small Render instances
os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")
os.environ.setdefault("YOLO_CONFIG_DIR", "/tmp/Ultralytics")

app = FastAPI(
    title="FarmCast AI Server",
    version="1.0.0"
)

# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# GLOBAL YOLO MODEL
# ============================================================

yolo_model = None


def get_yolo_model():
    global yolo_model

    if yolo_model is None:
        from ultralytics import YOLO

        print("Loading YOLO model...")

        yolo_model = YOLO(YOLO_MODEL_PATH)

        print(
            f"YOLO model loaded from: {YOLO_MODEL_PATH}"
        )

    return yolo_model


# ============================================================
# CLAUDE
# ============================================================

def get_claude_client():
    if not CLAUDE_API_KEY:
        raise RuntimeError(
            "ANTHROPIC_API_KEY is not configured"
        )

    return anthropic.Anthropic(
        api_key=CLAUDE_API_KEY
    )


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
def health():
    return {
        "status": "ok",
        "message": "🌿 FarmCast AI Server is running!"
    }


# ============================================================
# IMAGE HELPERS
# ============================================================

def resize_image(image, max_size):
    """
    Resize image while keeping aspect ratio.
    """

    if max(image.size) <= max_size:
        return image

    ratio = max_size / max(image.size)

    new_size = (
        max(1, int(image.width * ratio)),
        max(1, int(image.height * ratio))
    )

    return image.resize(
        new_size,
        Image.Resampling.LANCZOS
    )


def image_to_base64(image, quality=75):
    """
    Convert PIL image to JPEG base64.
    """

    buffer = io.BytesIO()

    image.save(
        buffer,
        format="JPEG",
        quality=quality,
        optimize=True
    )

    return base64.b64encode(
        buffer.getvalue()
    ).decode("utf-8")


# ============================================================
# YOLO DETECTION
# ============================================================

def run_yolo_detection(image, conf=0.30):
    """
    Run YOLO using a small image size to reduce memory usage.
    """

    model = get_yolo_model()

    results = model.predict(
        source=image,
        conf=conf,
        imgsz=320,
        device="cpu",
        verbose=False,
        max_det=10
    )

    detections = []

    img_width, img_height = image.size

    for result in results:

        boxes = result.boxes

        if boxes is None:
            continue

        for box in boxes:

            x1, y1, x2, y2 = (
                box.xyxy[0].tolist()
            )

            confidence = float(
                box.conf[0]
            )

            cls = int(
                box.cls[0]
            )

            label = model.names[cls]

            detections.append({
                "label": str(label),

                "confidence": round(
                    confidence * 100,
                    1
                ),

                "bbox": {
                    "x": round(
                        x1 / img_width,
                        4
                    ),

                    "y": round(
                        y1 / img_height,
                        4
                    ),

                    "width": round(
                        (x2 - x1) / img_width,
                        4
                    ),

                    "height": round(
                        (y2 - y1) / img_height,
                        4
                    )
                }
            })

    detections.sort(
        key=lambda item: item["confidence"],
        reverse=True
    )

    return detections[:10]


# ============================================================
# /detect
# REAL-TIME YOLO ENDPOINT
# ============================================================

@app.post("/detect")
async def detect_realtime(
    file: UploadFile = File(...)
):

    try:

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        # Small image for realtime detection
        image = resize_image(
            image,
            480
        )

        detections = run_yolo_detection(
            image,
            conf=0.30
        )

        return {
            "success": True,

            "detections": detections,

            "image_size": {
                "width": image.width,
                "height": image.height
            }
        }

    except Exception as e:

        print(
            f"/detect error: {type(e).__name__}: {e}"
        )

        return {
            "success": False,
            "error": str(e),
            "detections": []
        }


# ============================================================
# /scan
# YOLO + CLAUDE
# ============================================================

@app.post("/scan")
async def scan_plant(
    file: UploadFile = File(...)
):

    try:

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        # Keep scan image reasonably small
        image = resize_image(
            image,
            768
        )

        img_width = image.width
        img_height = image.height

        # ----------------------------------------------------
        # YOLO
        # ----------------------------------------------------

        try:

            detections = run_yolo_detection(
                image,
                conf=0.25
            )

        except Exception as e:

            print(
                f"YOLO scan error: {e}"
            )

            detections = []

        # ----------------------------------------------------
        # Default Claude result
        # ----------------------------------------------------

        claude_result = {
            "plant_name": "Unknown Plant",
            "plant_type": "Unknown",
            "health_status": "Unknown",
            "severity": "none",
            "confidence": 0,
            "description": "Unable to analyze the plant.",
            "treatments": []
        }

        # ----------------------------------------------------
        # CLAUDE
        # ----------------------------------------------------

        try:

            client = get_claude_client()

            img_base64 = image_to_base64(
                image,
                quality=70
            )

            prompt = """
You are an expert botanist and plant pathologist
specializing in Philippine crops.

Analyze this plant image carefully.

Respond ONLY with valid JSON.

Required format:

{
  "plant_name": "common plant name",
  "plant_type": "Vegetable/Fruit/Cereal/Ornamental/Herb/Tree/Unknown",
  "health_status": "Healthy or disease name",
  "severity": "none/low/medium/high",
  "confidence": 0,
  "description": "brief observation",
  "treatments": [
    "treatment 1",
    "treatment 2",
    "treatment 3"
  ]
}

Rules:

- If no plant is visible:
  plant_name = "No Plant Detected"
  severity = "none"

- Be specific when identifying diseases.

- treatments should be practical.

- confidence must be between 0 and 100.
"""

            message = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=600,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image",
                                "source": {
                                    "type": "base64",
                                    "media_type": "image/jpeg",
                                    "data": img_base64
                                }
                            },
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    }
                ]
            )

            raw = (
                message
                .content[0]
                .text
                .strip()
            )

            clean = re.sub(
                r"```(?:json)?",
                "",
                raw
            ).strip().strip("`").strip()

            claude_result = json.loads(
                clean
            )

        except Exception as e:

            print(
                f"Claude scan error: {e}"
            )

        return {
            "success": True,

            "image_size": {
                "width": img_width,
                "height": img_height
            },

            "detections": detections,

            "analysis": claude_result
        }

    except Exception as e:

        print(
            f"/scan error: {type(e).__name__}: {e}"
        )

        return {
            "success": False,
            "error": str(e),
            "detections": []
        }


# ============================================================
# /identify
# CLAUDE PLANT IDENTIFICATION
# ============================================================

@app.post("/identify")
async def identify_plant(
    file: UploadFile = File(...)
):

    try:

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        image = resize_image(
            image,
            640
        )

        img_base64 = image_to_base64(
            image,
            quality=70
        )

        client = get_claude_client()

        message = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=400,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/jpeg",
                                "data": img_base64
                            }
                        },
                        {
                            "type": "text",
                            "text": """
Identify this plant.

Respond ONLY with JSON:

{
  "plant_name": "name",
  "plant_type": "type",
  "health_status": "Healthy or disease",
  "severity": "none/low/medium/high",
  "confidence": 0,
  "description": "brief description"
}
"""
                        }
                    ]
                }
            ]
        )

        raw = (
            message
            .content[0]
            .text
            .strip()
        )

        clean = re.sub(
            r"```(?:json)?",
            "",
            raw
        ).strip().strip("`").strip()

        result = json.loads(
            clean
        )

        return {
            "success": True,
            "analysis": result
        }

    except Exception as e:

        print(
            f"/identify error: {type(e).__name__}: {e}"
        )

        return {
            "success": False,
            "error": str(e)
        }


# ============================================================
# PRODUCTION STARTUP
# ============================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "ai_server:app",
        host="0.0.0.0",
        port=PORT,
        reload=False,
        workers=1
    )