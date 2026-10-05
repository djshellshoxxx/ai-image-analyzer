# Implementation checklist

Status reflects the browser application on the audit branch dated 2026-10-05.

## Provenance and metadata
- [x] C2PA / Content Credentials validation
- [x] EXIF / TIFF metadata parsing
- [x] XMP parsing
- [x] IPTC-IIM parsing
- [x] PNG, JPEG, WebP, GIF, TIFF, HEIC/HEIF, AVIF structural parsing
- [x] BMP header parsing
- [x] SVG metadata/text inspection
- [x] JPEG XL container inspection
- [x] MP4 ISO-BMFF inspection and video-frame sampling
- [x] WebM format identification and frame sampling
- [x] TIFF-based RAW metadata parsing
- [x] Batch processing, per-file JSON/text export, batch JSON and CSV export

## Pixel and watermark analysis
- [x] Community Forensics neural pixel classifier
- [x] Meta WAM detector
- [x] Vendor/provenance watermark capability reporting
- [x] Spectral-tail analysis
- [x] CFA/demosaic probes
- [x] LOTA bit-plane analysis
- [x] Color-restoration analysis
- [x] Color-distribution analysis
- [x] JPEG fingerprinting
- [x] Generator-spectrum extraction
- [x] PRNU matching
- [x] Diffusion reconstruction
- [x] DiffusionPrint localization
- [x] DiffusionPrint heatmap rendering in result cards
- [x] Gaussian embedding extraction
- [x] Editprint embedding extraction
- [x] Explicit warnings when an enabled detector is missing its required model URL or reference files

## Audio / voice
- [x] File upload and drag/drop
- [x] Live microphone capture
- [x] WAV/BWF, MP3, FLAC, Ogg/Opus and MP4/M4A parsing
- [x] AIFF/WebM identification
- [x] Acoustic/spectral measurements
- [x] AASIST-L ONNX anti-spoofing analysis
- [x] Optional C2PA inspection
- [x] Pluggable detector hooks
- [x] JSON and CSV export

## Deliberate limitations
- WebM/MKV deep EBML metadata parsing is not implemented.
- Fujifilm RAF metadata extraction is limited to format identification.
- MP4/QuickTime metadata parsing is intentionally shallow rather than a full per-track metadata walker.
- Proprietary watermark verifiers such as Google/OpenAI SynthID are reported as external-only where no public local verifier is available.
- Model-backed research detectors do not ship third-party checkpoints when redistribution or a stable browser-ready model is unavailable.
- Gaussian, Noiseprint++, generator-spectrum, DiffusionPrint embedding mode and Editprint reference-bank scoring require matched calibration/reference data; the embedded module APIs expose those capabilities, while the simple page UI focuses on inference and inspection.
