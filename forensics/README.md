# PROVENANCE V4 forensic modules

The browser application in `index.html` embeds the forensic ES modules so the analyzer also works when opened directly from `file://`.

Implemented module families:

- Spectral-tail FFT analysis
- CFA/demosaic consistency probes
- LOTA low-bit / gradient-patch analysis
- Color-restoration and color-distribution probes
- JPEG structural fingerprinting
- Generator-spectrum fingerprints
- Noiseprint++ residual/feature pipeline
- PRNU camera sensor matching
- Diffusion/autoencoder reconstruction forensics
- DiffusionPrint-style patch localization
- Prior-conditioned Gaussian embedding discriminants
- Editprint processing-history embeddings

The no-model modules produce measurements and summaries but are intentionally not treated as calibrated AI probabilities. Model-backed modules require caller-supplied ONNX files unless a model URL is explicitly bundled by the main application.

The main application also includes C2PA validation, EXIF/XMP/IPTC parsing, format-specific container parsing, a Community Forensics neural classifier, Meta WAM watermark detection, batch export, and a separate audio/voice forensic module.
