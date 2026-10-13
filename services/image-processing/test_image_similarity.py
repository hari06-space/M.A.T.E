from fastapi.testclient import TestClient
from main import app
import io
from PIL import Image

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_process_valid_image():
    # Create synthetic test RGB image in-memory
    file_byte_io = io.BytesIO()
    image = Image.new("RGB", (100, 100), color=(255, 94, 54))  # M.A.T.E. sunset orange
    image.save(file_byte_io, "JPEG")
    file_byte_io.seek(0)

    response = client.post(
        "/api/v1/process-image",
        files={"file": ("test.jpg", file_byte_io, "image/jpeg")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "sha256" in data
    assert "phash" in data
    assert data["match_type"] == "PROCESSED_AND_INDEXED"
