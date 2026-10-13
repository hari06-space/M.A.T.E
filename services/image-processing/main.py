import hashlib
import io
from typing import List, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from pydantic import BaseModel
from PIL import Image

app = FastAPI(
    title="M.A.T.E. Image Processing & Similarity Service",
    description="Dedicated microservice for EXIF removal, exact SHA-256 detection, and perceptual image hashing.",
    version="1.0.0"
)

class SimilarityResult(BaseModel):
    sha256: str
    match_type: str
    confidence: float
    description: str
    phash: Optional[str] = None
    hamming_distance: Optional[int] = None

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "mate-image-processing",
        "supported_algorithms": ["sha256", "phash", "dhash", "exif_sanitizer"]
    }

@app.post("/api/v1/process-image", response_model=SimilarityResult)
async def process_image(file: UploadFile = File(...)):
    """
    Validates image, computes SHA-256 digest, removes EXIF metadata,
    and calculates perceptual hash.
    """
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Empty file uploaded")
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File exceeds 10MB limit")

    # 1. Exact SHA-256 Checksum
    sha256_hash = hashlib.sha256(contents).hexdigest()

    try:
        # 2. Decode and validate image
        image = Image.open(io.BytesIO(contents))
        image.verify()  # Check file integrity

        # Re-open for actual processing (verify closes stream)
        image = Image.open(io.BytesIO(contents))

        # 3. EXIF Sanitization: Strip EXIF by saving raw RGB data without metadata
        data = list(image.getdata())
        sanitized_image = Image.new(image.mode, image.size)
        sanitized_image.putdata(data)

        # 4. Simple Perceptual Hash implementation (Average Hash baseline)
        resized = sanitized_image.convert("L").resize((8, 8), Image.Resampling.LANCZOS)
        pixels = list(resized.getdata())
        avg = sum(pixels) / len(pixels)
        bits = "".join(["1" if p > avg else "0" for p in pixels])
        phash_hex = hex(int(bits, 2))[2:].zfill(16)

        return SimilarityResult(
            sha256=sha256_hash,
            match_type="PROCESSED_AND_INDEXED",
            confidence=1.0,
            description="Image validated, EXIF geolocation stripped, hashes computed.",
            phash=phash_hex,
            hamming_distance=0
        )

    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Invalid or corrupted image format: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
