from ultralytics import YOLO
import glob
import os
import time
import statistics

MODEL_PATH = "PlantDiseaseDetection.pt"
IMAGE_DIR = "test_images"
CONF = 0.25

print("=" * 70)
print("FarmCast - PlantDiseaseDetection Benchmark")
print("=" * 70)

print(f"Model: {MODEL_PATH}")
print(f"Images: {IMAGE_DIR}")
print(f"Confidence threshold: {CONF}")
print()

# Load model
print("Loading model...")
model = YOLO(MODEL_PATH, task="detect")
print("Model loaded.\n")

# Find images
extensions = ["*.jpg", "*.jpeg", "*.png", "*.webp"]

files = []
for ext in extensions:
    files.extend(glob.glob(os.path.join(IMAGE_DIR, ext)))

files.sort()

if not files:
    print("ERROR: Walang images na nakita sa test_images/")
    raise SystemExit(1)

print(f"Found {len(files)} images.\n")

# Warm-up
print("Warming up model...")
model(files[0], conf=CONF, verbose=False)
print("Warm-up complete.\n")

results = []
times = []

for index, image_path in enumerate(files, start=1):
    filename = os.path.basename(image_path)

    start = time.perf_counter()

    predictions = model(
        image_path,
        conf=CONF,
        verbose=False
    )

    elapsed = time.perf_counter() - start
    times.append(elapsed)

    detections = []

    for result in predictions:
        for box in result.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            detections.append({
                "class": model.names[class_id],
                "confidence": confidence * 100
            })

    print(f"[{index:02d}/{len(files)}] {filename}")
    print(f"    Time: {elapsed:.3f} sec")

    if detections:
        for detection in detections:
            print(
                f"    -> {detection['class']} "
                f"({detection['confidence']:.1f}%)"
            )
    else:
        print("    -> NO DETECTION")

    print()

# Summary
average_time = statistics.mean(times)
minimum_time = min(times)
maximum_time = max(times)

print("=" * 70)
print("SUMMARY")
print("=" * 70)

print(f"Total images:       {len(files)}")
print(f"Average time:       {average_time:.3f} sec/image")
print(f"Fastest:            {minimum_time:.3f} sec")
print(f"Slowest:            {maximum_time:.3f} sec")
print(f"Approx FPS:         {1 / average_time:.2f}")

print("=" * 70)
print("Benchmark complete.")
print("=" * 70)