const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const p=path.join(__dirname,'..'),copy=x=>JSON.parse(JSON.stringify(x));
function harness(){const store=new Map(),elements=new Map(),c={window:{},document:{getElementById:id=>{if(!elements.has(id))elements.set(id,{});return elements.get(id)}},localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)}};vm.createContext(c);for(const s of [...fs.readFileSync(p+'/account-transfer.html','utf8').matchAll(/<script src="([^"]+)"/g)].map(m=>m[1].split('?')[0]).filter(s=>s!=='account-transfer.js'))vm.runInContext(fs.readFileSync(p+'/'+s,'utf8'),c);Object.assign(c,c.window);c.ZRWorkspace.mount=()=>{};c.ZRWorkspace.renderRecovery=()=>{};vm.runInContext(fs.readFileSync(p+'/account-transfer.js','utf8'),c);Object.assign(c,c.window);return {c,store,elements};}
const file=process.env.ZR_WORKSPACE_FILE;
test('Real backup: complete lossless and repeated import/export, preservation and conflict review',{skip:!file},async()=>{
 const raw=fs.readFileSync(file,'utf8'),doc=JSON.parse(raw),{c,store,elements}=harness(),A=c.ZRAccountModel;
 assert.equal(Object.keys(doc.data).length,3);
 const prepared=c.window.ZRValidateWorkspace(doc);assert.deepEqual(copy(prepared),doc.data);
 async function upload(d){await elements.get('workspaceImport').onchange({target:{files:[{size:raw.length,text:async()=>JSON.stringify(d)}],value:'x'}});}
 await upload(doc);assert.equal(store.size,0);assert.match(elements.get('transferStatus').textContent,/All included tools validated/);elements.get('applyWorkspace').onclick();assert.deepEqual(copy(c.ZRWorkspace.bundle().data),doc.data);
 await upload(c.ZRWorkspace.bundle());elements.get('applyWorkspace').onclick();assert.deepEqual(copy(c.ZRWorkspace.bundle().data),doc.data);
 assert.equal(A.view(prepared).conflicts.length,0);
 const changed=copy(doc);changed.data[A.keys.dashboard].buildings[1001]=25;
 // Keep queues coherent so the validator accepts the intentional observation conflict.
 changed.data[A.keys.dashboard].queues.filter(q=>q.building===1001).forEach(q=>{q.status='idle';q.target=26});
 await upload(changed);assert.match(elements.get('transferPreview').innerHTML,/"kind":"building"|&quot;kind&quot;:&quot;building&quot;/);
 const extended=copy(doc);for(const v of Object.values(extended.data))v.extension={keep:true};extended.data[A.keys.dashboard].resources[0].extension='resource';extended.data[A.keys.fighter].components[0].extension='component';
 assert.deepEqual(copy(c.window.ZRValidateWorkspace(extended)),extended.data);
 const invalid=copy(doc);invalid.data[A.keys.guide].fields.push(copy(invalid.data[A.keys.guide].fields[0]));const before=copy(c.ZRWorkspace.bundle().data);await upload(invalid);assert.match(elements.get('transferStatus').textContent,/Import rejected/);assert.deepEqual(copy(c.ZRWorkspace.bundle().data),before);
 assert.equal(fs.readFileSync(file,'utf8'),raw);
});
