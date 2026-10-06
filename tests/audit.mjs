import fs from 'node:fs';
import assert from 'node:assert/strict';

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

console.log('ai-image-analyzer structural audit passed');
