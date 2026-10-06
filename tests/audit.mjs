import fs from 'node:fs';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

for (const id of [
  'm-c2pa','m-neural','m-wam','m-circ','m-spectral','m-cfa','m-lota',
  'm-colorrestore','m-colordist','m-jpegfp','m-genspec','m-rawscan',
  'm-bmp','m-svg','m-jxl','m-mp4','m-raw','m-noiseprint','m-diffrecon',
  'm-diffprint','m-gaussian','m-editprint','m-prnu','file','drop','results'
]) {
  assert.ok(html.includes('id="' + id + '"'), 'missing UI element ' + id);
}

for (const moduleName of [
  'core.js','spectral-tail.js','cfa-demosaic.js','lota-bitplane.js',
  'noiseprint-cluster.js','color-restoration.js','color-distribution.js',
  'jpeg-fingerprint.js','generator-spectrum.js','prnu.js',
  'diffusion-reconstruction.js','diffusionprint-localizer.js',
  'gaussian-embedding.js','editprint.js'
]) {
  assert.ok(html.includes('"' + moduleName + '"'), 'missing embedded forensics module ' + moduleName);
}

assert.ok(html.includes('reportMissingAdvancedConfiguration'), 'advanced detectors must report missing required model/reference configuration');
assert.ok(html.includes('heatmapDataUrl'), 'DiffusionPrint heatmap must be rendered, not only computed');
assert.ok(html.includes('referenceDetected: f.provenance.referenceDetected'), 'JSON export must preserve provenance reference detection');
assert.ok(html.includes('sdkAttempted: f.provenance.sdkAttempted'), 'JSON export must preserve C2PA SDK attempt state');
assert.ok(html.includes('activeSourceTypes: f.provenance.activeSourceTypes'), 'JSON export must preserve active C2PA source types');
assert.ok(html.includes('ingredientSourceTypes: f.provenance.ingredientSourceTypes'), 'JSON export must preserve ingredient C2PA source types');
assert.ok(html.includes('watermarkActions: f.provenance.watermarkActions'), 'JSON export must preserve C2PA watermark actions');
assert.ok(html.includes('watermarkDeclarations: f.provenance.watermarkDeclarations'), 'JSON export must preserve watermark declarations');
assert.ok(html.includes('rawHints: f.provenance.rawHints'), 'JSON export must preserve raw provenance hints');
assert.ok(html.includes('formatAdvancedMetrics'), 'text report must expose advanced detector metrics');
assert.ok(html.includes('buildAdvancedExport'), 'JSON export must sanitize browser-only advanced artifacts');
assert.ok(html.includes('dl-heatmap'), 'DiffusionPrint heatmap must have a direct download action');
assert.ok(html.includes('summarizeMethodConfig'), 'exports must include a sanitized analysis configuration snapshot');
assert.ok(html.includes('analysisConfig: f.analysisConfig'), 'JSON export must preserve analysis configuration');
assert.ok(html.includes('runtime: {'), 'JSON export must identify important runtime/dependency versions');
assert.ok(html.includes('boundedAnalysisSize'), 'pixel decoding must enforce the declared canvas pixel limit');
assert.ok((html.match(/MAX_PREVIEW_PIXELS/g) || []).length > 1, 'MAX_PREVIEW_PIXELS must be used, not only declared');
assert.ok(html.includes("m.key === 'jpegfp' ? file : pixelCanvas"), 'JPEG fingerprinting must receive original file bytes rather than a canvas');
assert.ok(html.includes('ORT_SESSION_CACHE'), 'embedded ONNX helpers must cache inference sessions across scales and batch files');
assert.ok(html.includes('advancedModelSkipResult'), 'enabled advanced detectors that cannot run must appear explicitly as skipped results');
assert.ok((html.match(/MAX_PRNU_PIXELS/g) || []).length > 1, 'PRNU must have an explicit browser workload guard');
assert.ok(html.includes('c2paSdkShouldAttempt'), 'checked C2PA validation must not depend solely on custom raw-hint detection');
assert.ok(html.includes('.srw'), 'Samsung SRW parser support must be exposed by the UI/file picker');
assert.ok(html.includes('audio/*,.wav,.mp3,.m4a,.mp4,.aac'), 'audio MP4 support must be exposed by the dedicated audio picker');
assert.ok(html.includes("id: 'aac', name: 'AAC / ADTS'"), 'raw ADTS AAC must be identified before generic MPEG audio sync');
assert.ok(html.includes('function parseAdts'), 'raw ADTS AAC must expose basic stream metadata');
for (const control of ['data-pa-signal','data-pa-neural','data-pa-c2pa']) {
  assert.ok(html.includes(control), 'audio UI missing configurable analyzer control ' + control);
}
assert.ok(html.includes('currentAudioOptions'), 'audio UI controls must feed both file and microphone analysis');
assert.ok(html.includes('ingredientAiGenerated'), 'audio C2PA must distinguish AI ingredients from active-asset AI declarations');
assert.ok(html.includes("classification: 'AI_DERIVED_DECLARED'"), 'audio summary must report validated AI ingredients separately');
assert.ok(html.includes("if(/\\.dng$/i.test(name))return'image/x-adobe-dng'"), 'DNG must use the correct C2PA MIME fallback');

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
const duplicateIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
assert.deepEqual(duplicateIds, [], 'duplicate DOM ids: ' + duplicateIds.join(', '));

const domRefs = [...html.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map(m => m[1]);
const missingRefs = [...new Set(domRefs.filter(id => !ids.includes(id)))];
assert.deepEqual(missingRefs, [], 'getElementById references missing DOM ids: ' + missingRefs.join(', '));

for (const doc of [
  new URL('../forensics/README.md', import.meta.url),
  new URL('../forensics/MODEL-CONTRACTS.md', import.meta.url),
  new URL('../forensics/IMPLEMENTATION-CHECKLIST.md', import.meta.url)
]) {
  assert.ok(fs.existsSync(doc), 'missing referenced documentation: ' + doc.pathname);
}

const scriptTags = [...html.matchAll(/<script([^>]*)>([\\s\\S]*?)<\\/script>/gi)]
  .filter(([,attrs]) => !/type=["']application\\/json["']/i.test(attrs));
assert.ok(scriptTags.length >= 2, 'expected classic analyzer script and module audio script');
for (let i = 0; i < scriptTags.length; i++) {
  const attrs = scriptTags[i][1];
  const code = scriptTags[i][2];
  if (!code.trim()) continue;
  const ext = /type=["']module["']/i.test(attrs) ? '.mjs' : '.js';
  const tmp = path.join(os.tmpdir(), 'ai-image-analyzer-inline-' + i + ext);
  fs.writeFileSync(tmp, code);
  const checked = spawnSync(process.execPath, ['--check', tmp], { encoding:'utf8' });
  try { fs.unlinkSync(tmp); } catch {}
  assert.equal(checked.status, 0, 'inline script syntax failure: ' + (checked.stderr || checked.stdout));
}

console.log('ai-image-analyzer structural and syntax audit passed');
