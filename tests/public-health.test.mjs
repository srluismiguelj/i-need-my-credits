import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {origin, repository, request, validateManifest, validateRelease, validateHtml, verifyParts} from '../scripts/check-public-health.mjs';
const bytes = Buffer.from('signed installer fixture');
const sha = value => createHash('sha256').update(value).digest('hex');
const manifest = () => ({version:'1.2.3', distributionReady:true, downloadURL:origin+'/downloads/INeedMyCredits-1.2.3-universal.dmg', size:bytes.length, sha256:sha(bytes), parts:[{path:'/release-parts/INeedMyCredits-1.2.3-universal.dmg/000.bin',size:bytes.length,sha256:sha(bytes)}]});
test('an unready release, foreign download host, traversal or wrong part size cannot pass', () => {
  validateManifest(manifest());
  for (const override of [{distributionReady:false},{downloadURL:'https://example.com/file.dmg'},{size:1}]) assert.throws(()=>validateManifest({...manifest(),...override}));
  const bad=manifest();bad.parts[0].path='/release-parts/../private';assert.throws(()=>validateManifest(bad));
});
test('GitHub metadata must agree with the exact public release and digest', () => {
  const m=manifest(), r={tag_name:'v1.2.3',draft:false,prerelease:false,html_url:`https://github.com/${repository}/releases/tag/v1.2.3`,assets:[{name:'INeedMyCredits-1.2.3-universal.dmg',size:m.size,digest:'sha256:'+m.sha256},{name:'SHA256SUMS-1.2.3.txt'}]};
  validateRelease(m,r);
  assert.throws(()=>validateRelease(m,{...r,tag_name:'v1.2.2'}));
  assert.throws(()=>validateRelease(m,{...r,assets:[{...r.assets[0],digest:'sha256:'+sha('different')},r.assets[1]]}));
});
test('a 200 page with noindex or a different canonical fails', () => {
  const page=`<title>Usage</title><link rel="canonical" href="${origin}/"><h1>Usage</h1>`;
  validateHtml(page,'/');
  validateHtml(page.replace(origin+'/',origin),'/');
  assert.throws(()=>validateHtml(page,'/ideas'));
  assert.throws(()=>validateHtml(page+'<meta name="robots" content="noindex">','/'));
  assert.throws(()=>validateHtml(page+'<h1>Duplicate</h1>','/'));
});
test('retry transient failures; authorization is never sent to the website', async () => {
  let calls=0, waits=0;
  const fetchImpl=async(url,options)=>{calls++;assert.equal(options.headers.Authorization,undefined);return new Response('',{status:calls===1?503:200});};
  const response=await request(origin+'/',{fetchImpl,token:'test-only-secret',wait:async()=>waits++});
  assert.equal(response.status,200);assert.equal(calls,2);assert.equal(waits,1);
  await request(`https://api.github.com/repos/${repository}/releases/latest`,{token:'test-only-secret',fetchImpl:async(url,options)=>{assert.equal(options.headers.Authorization,'Bearer test-only-secret');return new Response('{}');}});
  await assert.rejects(request('https://example.com/',{fetchImpl}),/Unexpected destination/);
});
test('deep verification detects truncated and corrupted bytes, independently of HTTP status', async () => {
  await verifyParts(manifest(),async()=>new Response(bytes),true);
  await assert.rejects(verifyParts(manifest(),async()=>new Response(bytes.subarray(1)),true),/truncated/);
  await assert.rejects(verifyParts(manifest(),async()=>new Response(Buffer.alloc(bytes.length)),true),/corrupted/);
  const m=manifest();m.sha256=sha('different');await assert.rejects(verifyParts(m,async()=>new Response(bytes),true),/Complete installer/);
});
test('daily availability handles omitted CDN length without treating it as zero; wrong lengths still fail', async () => {
  await verifyParts(manifest(),async()=>new Response(null,{status:200}),false);
  await assert.rejects(verifyParts(manifest(),async()=>new Response(null,{status:200,headers:{'content-length':'1'}}),false),/length differs/);
  await assert.rejects(verifyParts(manifest(),async()=>new Response(null,{status:404}),false),/unavailable/);
});
