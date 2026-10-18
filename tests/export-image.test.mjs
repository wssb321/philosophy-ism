import test from 'node:test';
import assert from 'node:assert/strict';
import { exportResultImage, safeExportFilename } from '../assets/js/export-image.js';

function fakeElement(hasDisclaimer = true) {
  const classes = new Set();
  return {
    classList:{ add:(name)=>classes.add(name), remove:(name)=>classes.delete(name), contains:(name)=>classes.has(name) },
    style:{ backgroundColor:'' },
    querySelector:(selector)=>selector === '.export-disclaimer' && hasDisclaimer ? {} : null,
  };
}

test('export captures at high resolution with a fixed background and safe filename', async () => {
  const element = fakeElement();
  let captureOptions;
  let downloaded;
  const result = await exportResultImage(element, { filename:'测试 / result:*', capture:async (_node, options) => { captureOptions=options; return {toDataURL:()=> 'data:image/png;base64,x'}; }, download:async (_canvas, filename)=>{downloaded=filename;} });
  assert.equal(result.ok, true);
  assert.ok(captureOptions.scale >= 2);
  assert.equal(captureOptions.backgroundColor, '#f7f4ee');
  assert.equal(downloaded, '测试-result.png');
  assert.equal(element.classList.contains('export-mode'), false);
  assert.equal(element.style.backgroundColor, '');
});

test('filename normalization removes unsafe path characters', () => {
  assert.equal(safeExportFilename(' ../a\\b?:* '), 'a-b.png');
});

test('concurrent export requests share one capture operation', async () => {
  const element = fakeElement();
  let calls = 0;
  let release;
  const capture = () => { calls += 1; return new Promise((resolve)=>{ release=()=>resolve({toDataURL:()=>''}); }); };
  const first = exportResultImage(element, {capture,download:async()=>{}});
  const second = exportResultImage(element, {capture,download:async()=>{}});
  release();
  const results = await Promise.all([first,second]);
  assert.equal(calls,1);
  assert.deepEqual(results,[{ok:true},{ok:true}]);
});

test('capture failure returns an error and restores the element', async () => {
  const element = fakeElement();
  const result = await exportResultImage(element,{capture:async()=>{throw new Error('blocked');}});
  assert.equal(result.ok,false);
  assert.match(result.error,/blocked/);
  assert.equal(element.classList.contains('export-mode'),false);
  assert.equal(element.style.backgroundColor,'');
});

test('export refuses a result without the required disclaimer', async () => {
  const result = await exportResultImage(fakeElement(false),{capture:async()=>({})});
  assert.equal(result.ok,false);
  assert.match(result.error,/免责声明/);
});
