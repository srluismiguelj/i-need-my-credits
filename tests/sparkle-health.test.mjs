import test from 'node:test';import assert from 'node:assert/strict';
import {generateKeyPairSync,sign} from 'node:crypto';
import {validateSignedFeed,validateArchiveSignature} from '../scripts/sparkle-health.mjs';
test('signed update feed and archive reject altered content and unsafe release destinations',()=>{
 const {publicKey,privateKey}=generateKeyPairSync('ed25519');
 const pub=publicKey.export({format:'der',type:'spki'}).subarray(-32).toString('base64');
 const archive=Buffer.from('isolated example archive'),signature=sign(null,archive,privateKey).toString('base64');
 const body=`<rss><channel><item><sparkle:shortVersionString>0.3.61</sparkle:shortVersionString><enclosure url="https://github.com/srluismiguelj/i-need-my-credits/releases/download/v0.3.61/INeedMyCredits-0.3.61-update.zip" length="${archive.length}" sparkle:edSignature="${signature}"></enclosure></item></channel></rss>`;
 const signed=value=>value+`<!-- sparkle-signatures:\nedSignature: ${sign(null,Buffer.from(value),privateKey).toString('base64')}\nlength: ${Buffer.byteLength(value)}\n-->\n`;
 assert.equal(validateSignedFeed(signed(body),'0.3.61',pub).size,archive.length);
 validateArchiveSignature(archive,signature,pub);
 assert.throws(()=>validateArchiveSignature(Buffer.from('altered archive'),signature,pub));
 assert.throws(()=>validateSignedFeed(signed(body).replace('0.3.61','0.3.62'),'0.3.61',pub));
 assert.throws(()=>validateSignedFeed(signed(body),'0.3.62',pub));
 assert.throws(()=>validateSignedFeed(signed(body.replaceAll('srluismiguelj','foreign-owner')),'0.3.61',pub));
 assert.throws(()=>validateSignedFeed(body,'0.3.61',pub));
});
