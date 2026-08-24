from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import anthropic
import base64
import io
import json
import re
import os
import uvicorn

# ── CONFIGURATION ──
CLAUDE_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
YOLO_MODEL_PATH = os.environ.get("FARMCAST_YOLO_MODEL", "yolov8n.pt")

app = FastAPI(title="FarmCast AI Server", version="1.0.0")

# Enable CORS for local frontend requests
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

def get_claude_client():
    return anthropic.Anthropic(api_key=CLAUDE_API_KEY)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "🌿 FarmCast Local AI Server is running!"}

@app.post("/detect")
async def detect_realtime(file: UploadFile = File(...)):
    """Handles real-time camera frame detection using YOLOv8."""
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Resize image for faster real-time inference
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
        # Prevents 500 crashes by returning structured JSON error details
        return {
            "success": False,
            "error": str(e),
            "detections": []
        }

if __name__ == "__main__":
    uvicorn.run("ai_server:app", host="127.0.0.1", port=8000, reload=True)