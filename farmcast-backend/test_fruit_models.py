from ultralytics import YOLO
import glob
import os
import time

MODELS = [
    "yolo_fruits_and_vegetables_v1.pt",
    "yolo_fruits_and_vegetables_v2.pt",
    "yolo_fruits_and_vegetables_v3.pt",
]

IMAGE_DIR = "test_fruits_and_vegetables"
CONF = 0.25

images = glob.glob(os.path.join(IMAGE_DIR, "*"))

print("=" * 70)
print("FarmCast - Fruits & Vegetables Model Test")
print("=" * 70)
print(f"Images found: {len(images)}")
print(f"Confidence: {CONF}")
print()

for model_path in MODELS:
    print("=" * 70)
    print(f"MODEL: {model_path}")
    print("=" * 70)

    model = YOLO(model_path)

    total_time = 0
    detections = 0

    for image in images:
        start = time.time()

        results = model(
            image,
            conf=CONF,
            verbose=False
        )

        elapsed = time.time() - start
        total_time += elapsed

        found = []

        for r in results:
            for b in r.boxes:
                cls_id = int(b.cls[0])
                confidence = float(b.conf[0])

                found.append(
                    f"{model.names[cls_id]} ({confidence * 100:.1f}%)"
                )

        if found:
            detections += 1
            result_text = ", ".join(found)
        else:
            result_text = "NO DETECTION"

        print(
            f"{os.path.basename(image):30} "
            f"{elapsed:.3f}s -> {result_text}"
        )

    average = total_time / len(images) if images else 0

    print()
    print(f"Images detected: {detections}/{len(images)}")
    print(f"Average time:    {average:.3f} sec/image")
    print(f"Approx FPS:      {1 / average:.2f}" if average else "Approx FPS: N/A")
    print()

print("=" * 70)
print("Test complete")
print("=" * 70)