import assert from 'node:assert/strict';
import {createPublicKey,verify} from 'node:crypto';
export const updatePublicKey='CmevMaaWJ8VoQ3f9seyQnedI7FSMpDE1zk7NLNm8kP0=';
function key(raw){
 const bytes=Buffer.from(raw,'base64');assert.equal(bytes.length,32);
 return createPublicKey({key:Buffer.concat([Buffer.from('302a300506032b6570032100','hex'),bytes]),format:'der',type:'spki'});
}
export function validateSignedFeed(xml,version,publicKey=updatePublicKey){
 const bytes=Buffer.from(xml,'utf8');
 const trailer=/<!-- sparkle-signatures:\nedSignature: ([A-Za-z0-9+/=]+)\nlength: (\d+)\n-->\s*$/.exec(xml);
 assert.ok(trailer,'Signed Sparkle feed trailer missing');
 const length=Number(trailer[2]);
 assert.equal(length,Buffer.byteLength(xml.slice(0,trailer.index)),'Signed feed length mismatch');
 assert.ok(verify(null,bytes.subarray(0,length),key(publicKey),Buffer.from(trailer[1],'base64')),'Sparkle feed signature invalid');
 const item=xml.match(/<item>[\s\S]*?<\/item>/)?.[0];assert.ok(item,'Sparkle release missing');
 assert.equal(item.match(/<sparkle:shortVersionString>([^<]+)<\//)?.[1],version,'Sparkle and legacy versions differ');
 const enclosure=item.match(/<enclosure\s+[^>]*>/)?.[0];assert.ok(enclosure);
 const attribute=name=>enclosure.match(new RegExp(`(?:\\s)${name}="([^"]+)"`))?.[1];
 const name=`INeedMyCredits-${version}-update.zip`;
 assert.equal(attribute('url'),`https://github.com/srluismiguelj/i-need-my-credits/releases/download/v${version}/${name}`);
 const size=Number(attribute('length'));assert.ok(Number.isSafeInteger(size)&&size>0&&size<1024**3);
 const signature=attribute('sparkle:edSignature');assert.equal(Buffer.from(signature??'','base64').length,64);
 return {name,size,signature,url:attribute('url')};
}
export function validateArchiveSignature(bytes,signature,publicKey=updatePublicKey){
 assert.ok(verify(null,bytes,key(publicKey),Buffer.from(signature,'base64')),'Sparkle archive signature invalid');
}
