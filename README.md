# AI Image Analyzer — PROVENANCE V4

Browser-based media forensics for finding evidence that an image, video, or audio file was generated or edited by AI.

Live site: https://djshellshoxxx.github.io/ai-image-analyzer/

## What it analyzes

PROVENANCE separates evidence by strength instead of treating every clue as an "AI probability."

- C2PA / Content Credentials validation using the official browser SDK
- EXIF, XMP, IPTC and format-specific metadata
- Community Forensics neural image classifier
- Meta Watermark Anything (WAM) detection
- Filename, resolution and software fingerprints
- Spectral-tail, CFA/demosaicing, low-bit-plane, color-restoration and color-distribution probes
- JPEG encoder fingerprints
- Generator-spectrum fingerprints
- Optional Noiseprint++, diffusion-reconstruction, DiffusionPrint, Gaussian-embedding and Editprint ONNX detectors
- PRNU physical-camera sensor fingerprint matching
- Batch image/video processing with per-file and batch reports
- Audio/voice forensics with metadata inspection, signal measurements and AASIST-L anti-spoofing analysis
- Live microphone analysis

The final verdict keeps cryptographic provenance, mutable metadata, neural estimates, research signals and circumstantial evidence separate. A negative result does not prove authenticity.

## Supported media

Image and video intake includes PNG, JPEG, WebP, HEIC/HEIF, AVIF, TIFF, GIF, BMP, SVG, JPEG XL, MP4, WebM/Matroska, and beta RAW metadata inspection for CR2, NEF, ARW, DNG, ORF, RW2, PEF, SRW and RAF.

Audio intake includes WAV/BWF, MP3, raw AAC/ADTS, M4A/MP4 audio, FLAC, Ogg/Opus, WebM audio and AIFF/AIFC. Browser codec support determines whether signal/neural analysis can run for a particular encoded file; container and metadata results can still be available when decoding fails.

## Local processing

Uploaded media is analyzed inside the browser. Media bytes are not uploaded by this application. Some enabled features download JavaScript/WASM runtimes or model weights, including C2PA, ONNX Runtime, Community Forensics and optional watermark/model detectors.

Model-backed research modules that require third-party checkpoints remain disabled unless their required model is available/configured.

## Reports

Each analyzed file can produce:

- JSON forensic report
- Plain-text report
- DiffusionPrint heatmap PNG when localization is run
- SHA-256 file hash
- Analysis configuration/runtime snapshot

Batch jobs can additionally export grouped JSON and CSV summaries.

## Development and audit

The application is intentionally deployable as a static GitHub Pages site. The forensic modules are embedded into `index.html` so the analyzer can also work when opened directly from `file://` where relative module loading is restricted.

Run the structural/syntax audit with:

```bash
npm test
```

The audit checks feature/control wiring, embedded forensic modules, DOM references, export requirements, safety/resource guards, and JavaScript syntax. GitHub Actions runs the audit for pull requests and for changes merged to `main`.

See:

- `forensics/README.md`
- `forensics/MODEL-CONTRACTS.md`
- `forensics/IMPLEMENTATION-CHECKLIST.md`

## Important limitations

Deep WebM/Matroska metadata parsing is not currently implemented. RAF support is identification-focused rather than a full proprietary RAW parser. MP4/QuickTime metadata parsing is intentionally shallower than a dedicated media-inspection library. Proprietary watermark systems without a public local verifier cannot be independently decoded by the page. Research detectors that need calibrated reference sets are not presented as calibrated probabilities unless that calibration data is actually supplied.
