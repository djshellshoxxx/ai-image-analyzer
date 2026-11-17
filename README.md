# ai-image-analyzer (PROVENANCE V4)

ai-image-analyzer is a single-page browser tool. The page calls itself **PROVENANCE V4 — AI Media Forensics (Batch)**. It looks for evidence that an image or video was created or edited by generative AI.

Live site: https://djshellshoxxx.github.io/ai-image-analyzer/

## What it checks

- **Content Credentials (C2PA):** validates embedded signed manifests with the c2pa-web SDK. This is the strongest signal.
- **Metadata declarations:** EXIF, XMP and IPTC fields that name an AI-generated or algorithmic source. These are easy to fake or strip.
- **Pixel classifiers:** optional ONNX models that you enable and point at a model URL. Their output is a statistical estimate.
- **Filename conventions:** names that match known AI-generator or AI-stock patterns.
- **Container and format parsers:** BMP, SVG, JPEG XL, MP4, HEIC/AVIF-family boxes and camera RAW metadata.
- **Research modules:** spectral, colour, bit-plane and JPEG-fingerprint probes. Most report no score (`null`) until they are calibrated against your own corpus.
- **Audio and voice forensics:** a separate section of the page.

## What it does not show

The page states these limits itself. A result is evidence to weigh, not proof:

- A "Trusted" C2PA state is the closest thing to proof the tool can show. Other results can be wrong, especially on heavily compressed or stylised images.
- Absence of AI evidence is not evidence that an image is authentic.

## Privacy and network use

The page says that files are not uploaded anywhere and that the checks run in the browser tab. The HTML has no `fetch()` calls in the page script. The page loads `onnxruntime-web` from a CDN, and model-backed detectors download the model weights from URLs that you enter.

## Running it

Open the live site, or serve the folder locally:

```sh
python -m http.server 8000
```

There is no build step and no test suite in the repository.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole application (markup, styles and script, including embedded source for the forensic modules) |
| `ui-assistance.js` | Small UI helper |

## Licence

No licence file is present, so no licence is granted by this README. The owner should add one.

## Wiki

Wiki source pages are in [docs/wiki/](docs/wiki/Home.md): user guide and codebase notes.
