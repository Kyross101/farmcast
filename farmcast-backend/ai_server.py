from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from dotenv import load_dotenv
import anthropic
import base64
import io
import json
import re
import os
import uvicorn

load_dotenv()

CLAUDE_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
YOLO_MODEL_PATH = os.environ.get("FARMCAST_YOLO_MODEL", "best.pt")

app = FastAPI(title="FarmCast AI Server", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

yolo_model = None

def get_yolo_model():
    """Lazy load YOLO model to optimize startup memory."""
    global yolo_model
    if yolo_model is None:
        from ultralytics import YOLO
        yolo_model = YOLO(YOLO_MODEL_PATH)
        print(f"✅ YOLO model loaded successfully from: {YOLO_MODEL_PATH}")
    return yolo_model

@app.get("/")
def health_check():
    return {"status": "ok", "message": "🌿 FarmCast Local AI Server is running!"}

# ── 1. REAL-TIME CAMERA DETECTION ENDPOINT ──
@app.post("/detect")
async def detect_realtime(file: UploadFile = File(...)):
    """Handles real-time camera frame detection using custom YOLOv8 model."""
    try:
        await file.seek(0)
        contents = await file.read()
        
        if not contents:
            return {"success": False, "detections": []}

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
                        "label": str(label),
                        "confidence": round(conf * 100, 1),
                        "bbox": {
                            "x": round(x1 / img_width, 4),
                            "y": round(y1 / img_height, 4),
                            "width": round((x2 - x1) / img_width, 4),
                            "height": round((y2 - y1) / img_height, 4),
                        }
                    })

        detections.sort(key=lambda d: d["confidence"], reverse=True)
        return {"success": True, "detections": detections[:10], "image_size": {"width": img_width, "height": img_height}}

    except Exception as e:
        return {"success": False, "error": str(e), "detections": []}

# ── 2. FULL PLANT SCAN & ANALYSIS ENDPOINT ──
@app.post("/scan")
async def scan_plant(file: UploadFile = File(...)):
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
                        "label": str(label),
                        "confidence": round(conf * 100, 1),
                        "bbox": {
                            "x": round(x1 / img_width, 4),
                            "y": round(y1 / img_height, 4),
                            "width": round((x2 - x1) / img_width, 4),
                            "height": round((y2 - y1) / img_height, 4),
                        }
                    })

        # Base analysis (fallback)
        analysis = {
            "plant_name": detections[0]["label"] if detections else "Plant",
            "plant_type": "Crop",
            "health_status": "Healthy",
            "severity": "none",
            "confidence": detections[0]["confidence"] if detections else 85.0,
            "description": f"Scanned {detections[0]['label'] if detections else 'plant'} using local YOLO.",
            "treatments": ["Maintain regular watering.", "Ensure adequate sunlight."]
        }

        if CLAUDE_API_KEY:
            try:
                buffer = io.BytesIO()
                image.save(buffer, format="JPEG", quality=85)
                img_base64 = base64.standard_b64encode(buffer.getvalue()).decode("utf-8")

                client = anthropic.Anthropic(api_key=CLAUDE_API_KEY)
                prompt = """Analyze this plant image. Respond ONLY with a valid raw JSON object:
{
  "plant_name": "Name",
  "plant_type": "Category",
  "health_status": "Healthy or Disease Name",
  "severity": "none/low/medium/high",
  "confidence": 90,
  "description": "Short observation.",
  "treatments": ["step 1", "step 2"]
}"""
                message = client.messages.create(
                    model="claude-3-5-sonnet-20241022",
                    max_tokens=600,
                    messages=[{
                        "role": "user",
                        "content": [
                            {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": img_base64}},
                            {"type": "text", "text": prompt}
                        ]
                    }]
                )
                raw_text = message.content[0].text.strip() if message.content else ""
                if raw_text:
                    match = re.search(r'\{.*\}', raw_text, re.DOTALL)
                    if match:
                        analysis = json.loads(match.group(0))
                        print("✅ Claude analysis parsed")
            except Exception as claude_err:
                print(f"⚠️ Claude error: {claude_err}")

        return {
            "success": True,
            "image_size": {"width": img_width, "height": img_height},
            "detections": detections,
            "analysis": analysis
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
    uvicorn.run("ai_server:app", host="127.0.0.1", port=8000, reload=True)