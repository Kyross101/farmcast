from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import anthropic
import base64
import io
import json
import re
import os

# ── CONFIG ──
CLAUDE_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
YOLO_MODEL_PATH = os.environ.get("FARMCAST_YOLO_MODEL", "yolov8n.pt")  # Configurable via environment

app = FastAPI(title="FarmCast AI Server", version="1.0.0")

PORT = int(os.environ.get("PORT", 8000))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

yolo_model = None

def get_yolo_model():
    global yolo_model
    if yolo_model is None:
        from ultralytics import YOLO
        yolo_model = YOLO(YOLO_MODEL_PATH)
        print(f"✅ YOLO model loaded from: {YOLO_MODEL_PATH}")
    return yolo_model

def get_claude_client():
    return anthropic.Anthropic(api_key=CLAUDE_API_KEY)

@app.get("/")
def health():
    return {"status": "ok", "message": "🌿 FarmCast AI Server is running!"}

@app.post("/scan")
async def scan_plant(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        max_size = 1024
        if max(image.size) > max_size:
            ratio = max_size / max(image.size)
            new_size = (int(image.width * ratio), int(image.height * ratio))
            image = image.resize(new_size, Image.LANCZOS)

        img_width, img_height = image.size

        buffer = io.BytesIO()
        image.save(buffer, format="JPEG", quality=85)
        img_bytes = buffer.getvalue()
        img_base64 = base64.standard_b64encode(img_bytes).decode("utf-8")

        # ── Step 1: YOLO Object Detection ──
        detections = []
        try:
            model = get_yolo_model()
            results = model(image, conf=0.25, verbose=False)
            for result in results:
                boxes = result.boxes
                if boxes is not None:
                    for box in boxes:
                        x1, y1, x2, y2 = box.xyxy[0].tolist()
                        conf = float(box.conf[0])
                        cls = int(box.cls[0])
                        label = model.names[cls]
                        
                        # Normalized top-left coordinates [0.0 - 1.0]
                        detections.append({
                            "label": label,
                            "confidence": round(conf * 100, 1),
                            "bbox": {
                                "x": round(x1 / img_width, 4),
                                "y": round(y1 / img_height, 4),
                                "width": round((x2 - x1) / img_width, 4),
                                "height": round((y2 - y1) / img_height, 4),
                            }
                        })
        except Exception as e:
            print(f"YOLO detection error: {e}")
            return {
                "success": False,
                "error": "YOLO detection failed",
                "detail": str(e)
            }

        # ── Step 2: Claude AI Analysis ──
        claude_result = {
            "plant_name": "Unknown Plant",
            "plant_type": "Unknown",
            "health_status": "Healthy",
            "severity": "none",
            "confidence": 85,
            "description": "No plant detected.",
            "treatments": []
        }

        try:
            client = get_claude_client()
            prompt = """You are an expert botanist and plant pathologist specializing in Philippine crops.
Analyze this plant image carefully and respond ONLY with a valid JSON object — no markdown, no extra text.

Required JSON format:
{
  "plant_name": "exact common name (e.g. Tomato, Rice, Eggplant, Rose)",
  "plant_type": "category (Vegetable/Fruit/Cereal/Ornamental/Herb/Tree/Unknown)",
  "health_status": "Healthy OR specific disease name if diseased",
  "severity": "none/low/medium/high",
  "confidence": 90,
  "description": "1-2 sentence description of what you observe",
  "treatments": ["treatment 1", "treatment 2", "treatment 3"]
}

Rules:
- If no plant visible: plant_name = "No Plant Detected", severity = "none"
- Be specific with disease names (e.g. "Late Blight", "Leaf Curl Virus")
- treatments should be practical and specific (3-5 items)
- confidence is 0-100"""

            # Fixed: Updated to valid production Claude model string
            message = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=800,
                messages=[{
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/jpeg",
                                "data": img_base64,
                            }
                        },
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ]
                }]
            )

            raw = message.content[0].text.strip()
            clean = re.sub(r'```(?:json)?', '', raw).strip().strip('`').strip()
            claude_result = json.loads(clean)

        except Exception as e:
            print(f"Claude AI error: {e}")

        return {
            "success": True,
            "image_size": {"width": img_width, "height": img_height},
            "detections": detections,
            "analysis": claude_result,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/identify")
async def identify_plant(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        if max(image.size) > 800:
            ratio = 800 / max(image.size)
            new_size = (int(image.width * ratio), int(image.height * ratio))
            image = image.resize(new_size, Image.LANCZOS)

        buffer = io.BytesIO()
        image.save(buffer, format="JPEG", quality=80)
        img_base64 = base64.standard_b64encode(buffer.getvalue()).decode("utf-8")

        client = get_claude_client()
        message = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=500,
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/jpeg",
                            "data": img_base64,
                        }
                    },
                    {
                        "type": "text",
                        "text": 'Identify this plant. Respond ONLY with JSON: {"plant_name": "name", "plant_type": "type", "health_status": "Healthy or disease", "severity": "none/low/medium/high", "confidence": 85, "description": "brief description"}'
                    }
                ]
            }]
        )

        raw = message.content[0].text.strip()
        clean = re.sub(r'```(?:json)?', '', raw).strip().strip('`').strip()
        result = json.loads(clean)

        return {"success": True, "analysis": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/detect")
async def detect_realtime(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        if max(image.size) > 640:
            ratio = 640 / max(image.size)
            new_size = (int(image.width * ratio), int(image.height * ratio))
            image = image.resize(new_size, Image.LANCZOS)

        img_width, img_height = image.size

        model = get_yolo_model()
        results = model(image, conf=0.25, verbose=False)
        detections = []

        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    conf = float(box.conf[0])
                    cls = int(box.cls[0])
                    label = model.names[cls]
                    detections.append({
                        "label": label,
                        "confidence": round(conf * 100, 1),
                        "bbox": {
                            "x": round(x1 / img_width, 4),
                            "y": round(y1 / img_height, 4),
                            "width": round((x2 - x1) / img_width, 4),
                            "height": round((y2 - y1) / img_height, 4),
                        }
                    })

        detections.sort(key=lambda d: d["confidence"], reverse=True)

        return {
            "success": True,
            "detections": detections[:10],
            "image_size": {"width": img_width, "height": img_height}
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))