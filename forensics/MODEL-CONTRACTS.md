# Model contracts

## Noiseprint++
Requires two ONNX URLs: a residual extractor and a feature encoder. The residual output must be image-like or flattenable to a residual plane. The feature encoder output must be a vector that can be L2-normalized. The simple UI extracts the fused embedding; calibrated distance scoring requires a matched real/synthetic reference set.

## Diffusion reconstruction
Requires one image-to-image ONNX model compatible with the reconstruction adapter. The analyzer compares the original and reconstructed image with reconstruction-error measurements. Model preprocessing and output scale must match the model used for calibration.

## DiffusionPrint
Requires a 64x64-patch ONNX model. Supported output modes are `fake-logit`, `fake-probability`, and `class-logits`. The main UI renders the resulting localization heatmap. Embedding-output models require a prototype bank and are supported by the embedded module API rather than the simple page controls.

## Gaussian embedding
Requires a frozen image encoder. The main UI performs an embedding-extraction connectivity run. A scored posterior requires real/fake reference distributions produced with the same encoder and preprocessing.

## Editprint
Requires an ONNX export matching the Editprint inference path. The default browser path uses the documented 1536x1536 center-crop-style preprocessing and ImageNet normalization. The simple UI extracts the processing-history embedding; similarity scoring requires a labeled reference bank.

## PRNU
Requires multiple reference photographs from the exact same physical camera. Matching is meaningful only when dimensions and processing conditions are compatible with the analyzed image.

## General
ONNX models are executed in-browser with ONNX Runtime Web. A selected detector with incomplete configuration now produces an explicit warning rather than silently skipping.
