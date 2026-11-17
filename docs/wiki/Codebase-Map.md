# Codebase Map

- `index.html`: the whole application. It includes the page markup, styles, the detection methods (C2PA, metadata, container parsers, classifiers) and an embedded JSON block `forensics-sources` that holds module source.
- `ui-assistance.js`: small UI helper.
- ONNX Runtime Web is loaded from a CDN at version 1.22.0 (see the script tags in `index.html`).
