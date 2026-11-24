const fs=require('fs'),assert=require('assert');global.createImageBitmap=async()=>({width:2,height:2});
const src=fs.readFileSync(__dirname+'/../js/formats.js','utf8');
const F=new Function(src+';return{mkCur,mkAni,decCur,decAni,zip,crc,enc}')();
(async()=>{const png=new Uint8Array([0x89,0x50,0x4e,0x47,1,2,3,4,5]),c=F.mkCur(png,32,32,3,1),d=await F.decCur(c);
assert.deepStrictEqual([d.w,d.h,d.hx,d.hy,d.png.length],[32,32,3,1,9]);
const a=F.mkAni([c,c,c],32,32,4),r=await F.decAni(a);assert.strictEqual(r.n,3);assert.strictEqual(r.jif,4);assert.strictEqual(r.frames.length,3);assert.strictEqual(a.length%2,0);
assert.strictEqual(F.crc(F.enc('123456789')),0xcbf43926);
await assert.rejects(()=>F.decCur(new Uint8Array(30)));await assert.rejects(()=>F.decAni(new Uint8Array(30)));
fs.writeFileSync(process.argv[2]||'/tmp/t.zip',F.zip([{n:'a.txt',d:F.enc('hello')},{n:'b/c.bin',d:new Uint8Array([1,2,3])}]));console.log('formats: all tests passed')})();
