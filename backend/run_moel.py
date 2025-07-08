import sys
import torch
from PIL import Image
import os

model_path = os.path.join("checkpoints", "sam2.1_hiera_large.pt")

def predict(image_path):
    # Load image
    image = Image.open(image_path).convert("RGB")

    # Simulated model load (for example purposes)
    model = torch.load(model_path, map_location=torch.device('cpu'))
    model.eval()

    print("Prediction successful for:", image_path)

if __name__ == "__main__":
    image_path = sys.argv[1]
    predict(image_path)
