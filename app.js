'use strict';
const KEY='zroute-v205-state', BACKUP=KEY+'-previous';
const clone=x=>JSON.parse(JSON.stringify(x));
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>document.querySelector(s);
const statuses=['recorded','inherited','unknown','manual'];
function validate(x){
 if(!x||x.schemaVersion!==1||!Array.isArray(x.fields)||!Array.isArray(x.tasks)||!Array.isArray(x.history))throw Error('This is not a supported v20.5 backup.');
 if(x.fields.length>2000||x.tasks.length>2000||x.history.length>20000)throw Error('Backup is too large.');
 const str=(v,n)=>typeof v==='string'&&v.length<=n;
 const ids=new Set();
 for(const f of x.fields){if(!str(f.id,100)||!f.id||ids.has(f.id)||!str(f.group,80)||!str(f.label,160)||!str(f.value,500)||!str(f.source,500)||!statuses.includes(f.status)||!str(f.updated,80))throw Error('Invalid tracker entry.');ids.add(f.id)}
 const tids=new Set();
 for(const t of x.tasks){if(!str(t.id,100)||!t.id||tids.has(t.id)||!str(t.title,160)||!str(t.why,800)||!['next','active','verify','blocked','done'].includes(t.status)||(t.field!=null&&(!ids.has(t.field)||!Number.isFinite(t.target)))||(t.field==null&&t.target!=null))throw Error('Invalid action.');tids.add(t.id)}
 for(const t of x.tasks){if(t.priority!==undefined&&(!Number.isInteger(t.priority)||t.priority<1||t.priority>999))throw Error('Invalid priority.');}
 for(const h of x.history)if(!str(h.at,80)||!str(h.kind,80)||!str(h.text,2000))throw Error('Invalid history.');
 for(const f of x.fields){if(f.building!==undefined&&(f.building!==true||typeof f.built!=='boolean'||!['available','conditional','locked'].includes(f.access)||!['none','upgrading'].includes(f.upgradeStatus)||(f.upgradeTarget!==null&&(!Number.isInteger(f.upgradeTarget)||f.upgradeTarget<1))||(f.built&&(!/^\d+$/.test(f.value)||Number(f.value)<1))||(!f.built&&(f.value!==''||f.upgradeTarget!==null))||(f.upgradeStatus==='upgrading'&&(!f.built||f.upgradeTarget<=Number(f.value)))))throw Error('Invalid building record.');}
 return clone(x);
}

const AUDIT='buildings-2026-10-20';
function applyBuildingAudit(s){
 if(s.buildingAudit===AUDIT)return s;
 for(const row of window.ZROUTE_BUILDINGS){
  const old=s.fields.find(f=>f.id===row.id);
  if(old)continue;
  s.fields.push(clone(row));
 }
 s.buildingAudit=AUDIT;
 s.history.unshift({at:new Date().toISOString(),kind:'building audit',text:'Added missing building audit entries only; all existing observations retained. Review the supplied snapshot before applying any corrections.'});
 return s;
}

let state=window.ZRWorkspace.consume('guide',clone(window.ZROUTE_SEED)), storageOK=true, corrupt=false;
let raw=null;
try{raw=localStorage.getItem(KEY)}catch(e){storageOK=false}
if(raw){
 try{state=validate(JSON.parse(raw))}catch(e){corrupt=true;$('#storageMessage').textContent='Saved data is unreadable. Baseline shown in memory; existing data has not been overwritten. Import a valid backup to recover.'}
}else if(storageOK){
 try{
  const map={'v204-1':'camp22','v204-2':'t8','v204-3':'alpha23','v204-4':'dirkVest','v204-5':'carterScope','v204-6':'economy','v204-7':'medicVerify','v204-8':'gather5','v204-9':'lucian'};
  for(const [old,id] of Object.entries(map))if(localStorage.getItem('zroute-v204-'+old)==='1'){state.tasks.find(t=>t.id===id).status='done';state.history.push({at:new Date().toISOString(),kind:'migration',text:'Imported prior checkmark: '+id+'. Original completion date unknown; tracker level was not changed.'})}
  localStorage.setItem(KEY,JSON.stringify(state));
 }catch(e){storageOK=false}
}
if(!storageOK)$('#storageMessage').textContent='Browser storage unavailable or full. You can edit in memory; export a backup before leaving this page.';
if(!corrupt){const before=JSON.stringify(state);applyBuildingAudit(state);if(before!==JSON.stringify(state)&&storageOK){try{localStorage.setItem(KEY+'-before-building-audit',raw||before);localStorage.setItem(KEY,JSON.stringify(state))}catch(e){storageOK=false}}}
function log(s,kind,text){s.history.unshift({at:new Date().toISOString(),kind,text})}
function done(t,s=state){const f=s.fields.find(f=>f.id===t.field);return t.status==='done'||(f&&Number.isFinite(t.target)&&f.status!=='unknown'&&f.value.trim()!==''&&Number.isFinite(Number(f.value))&&Number(f.value)>=t.target)}
function reconcile(next,prev){for(const t of next.tasks){const p=prev.tasks.find(x=>x.id===t.id);if(!p||!t.field)continue;
 const oldField=prev.fields.find(f=>f.id===p.field), newField=next.fields.find(f=>f.id===t.field);
 if(oldField&&newField&&oldField.value===newField.value&&oldField.status===newField.status)continue;
 const before=done(p,prev), f=next.fields.find(x=>x.id===t.field);const reached=f.status!=='unknown'&&f.value.trim()!==''&&Number.isFinite(Number(f.value))&&Number(f.value)>=t.target;
 if(reached&&!before){t.status='done';log(next,'completion',t.title+' — target reached in tracker.')}
 if(!reached&&before){t.status='next';log(next,'reopened',t.title+' — tracker is below target; review again.')}
}}
function commit(next){
 if(corrupt){$('#storageMessage').textContent='Existing saved data is unreadable. Export a backup and import a valid state to recover before editing.';return false}
 const prior=clone(state),previous=JSON.stringify(state);next.savedAt=new Date().toISOString();
 try{window.ZRWorkspace.checkpoint('Master guide edit');localStorage.setItem(BACKUP,previous);localStorage.setItem(KEY,JSON.stringify(next));storageOK=true;$('#storageMessage').textContent='Saved in this browser. Export a backup for safekeeping.'}
 catch(e){storageOK=false;$('#storageMessage').textContent='Browser storage unavailable or full. Changes remain in memory only. Export now to keep them.'}
 state=next;if(storageOK){try{window.ZRWorkspace.sync('guide',next,prior)}catch(e){$('#storageMessage').textContent='Guide saved; linked dashboard update failed: '+e.message}}render();window.ZRWorkspace.renderRecovery();return true;
}
function render(){
 renderBuildings();renderGatekeepers();window.ZRFighter?.renderActionLinks();
 const open=state.tasks.filter(t=>!done(t)).sort((a,b)=>(a.priority||50)-(b.priority||50)), completed=state.tasks.filter(t=>done(t));
 $('#counts').textContent=`${open.length} open · ${completed.length} complete`;
 function card(t,i,isDone){const f=state.fields.find(f=>f.id===t.field);return `<article class="action"><div class="rank">${isDone?'✓':String(i+1).padStart(2,'0')}</div><div><div class="tag">${esc(isDone?'completed':t.status)}</div><strong>${esc(t.title)}</strong><p>${esc(t.why)}</p>${f?`<small>Tracker: ${esc(f.value)} → ${t.target} · ${esc(f.status)} · ${esc(f.source)}</small>`:''}</div><div><button data-toggle="${esc(t.id)}">${isDone?'Reopen':'Mark complete'}</button><details><summary>Edit plan / priority</summary><form data-plan="${esc(t.id)}"><label>Action<input name="title" value="${esc(t.title)}" maxlength="160" required></label><label>Why / next step<textarea name="why" maxlength="800" required>${esc(t.why)}</textarea></label><label>Priority (lower first)<input name="priority" type="number" min="1" max="999" value="${t.priority||50}"></label><label>Target level (linked actions only)<input name="target" type="number" min="1" max="250" value="${t.target??''}" ${t.field?'':'disabled'}></label><button>Save plan</button></form></details>${!isDone?`<label>Status<select data-status="${esc(t.id)}">${['next','active','verify','blocked'].map(x=>`<option ${t.status===x?'selected':''}>${x}</option>`).join('')}</select></label>`:''}</div></article>`}
 $('#actionList').innerHTML=open.map((t,i)=>card(t,i,false)).join('')||'<p>All current actions complete. Add your next goal below.</p>';
 $('#completed').innerHTML=completed.map((t,i)=>card(t,i,true)).join('')||'<p>No actions completed yet.</p>';
 $('#history').innerHTML=state.history.map(h=>`<li><small>${esc(h.at)} · ${esc(h.kind)}</small><br>${esc(h.text)}</li>`).join('');
 const filter=$('#groupFilter').value;const groups=[...new Set(state.fields.map(f=>f.group))];$('#groupFilter').innerHTML='<option value="">All categories</option>'+groups.map(g=>`<option ${g===filter?'selected':''}>${esc(g)}</option>`).join('');
 $('#fields').innerHTML=state.fields.filter(f=>(!f.building||f.built)&&(!filter||f.group===filter)).map(f=>`<div class="field"><form data-field="${esc(f.id)}"><label>${esc(f.label)}<input name="value" value="${esc(f.value)}" maxlength="500"></label><label>Evidence status<select name="status">${statuses.map(s=>`<option ${s===f.status?'selected':''}>${s}</option>`).join('')}</select></label><label>Source / recording timestamp<input name="source" value="${esc(f.source)}" maxlength="500" required></label><label>Observed date<input name="updated" type="date" value="${esc(f.updated.slice(0,10))}" required></label>${f.building?`<label>Build status<select name="upgradeStatus"><option value="none" ${f.upgradeStatus==='none'?'selected':''}>Not running / selected</option><option value="upgrading" ${f.upgradeStatus==='upgrading'?'selected':''}>Upgrade confirmed running</option></select></label><label>Running target<input name="upgradeTarget" type="number" min="1" max="30" value="${f.upgradeTarget??''}"></label>`:''}<button>Save row</button></form><small>${esc(f.group)} · ${esc(f.status)} · Last observed ${esc(f.updated)}</small></div>`).join('');
 $('#lastSaved').textContent=state.savedAt?'Last save: '+new Date(state.savedAt).toLocaleString():'Baseline: 17 Oct 2026';
 document.querySelectorAll('.historical input').forEach(x=>{x.disabled=true});
}
document.addEventListener('submit',e=>{const form=e.target;if(form.dataset.plan){e.preventDefault();const d=new FormData(form),next=clone(state),t=next.tasks.find(x=>x.id===form.dataset.plan);t.title=String(d.get('title'));t.why=String(d.get('why'));t.priority=Number(d.get('priority'));if(t.field){const oldTarget=t.target;t.target=Number(d.get('target'));if(oldTarget!==t.target)reconcilePlanTarget(t,next);}try{validate(next);log(next,'plan','Edited action and priority: '+t.title);commit(next)}catch(err){$('#storageMessage').textContent=err.message}return}if(form.dataset.field){e.preventDefault();const next=clone(state), f=next.fields.find(x=>x.id===form.dataset.field), data=new FormData(form), old=f.value;f.value=String(data.get('value'));f.status=String(data.get('status'));f.source=String(data.get('source'));f.updated=String(data.get('updated'));if(f.building){f.upgradeStatus=String(data.get('upgradeStatus'));f.upgradeTarget=f.upgradeStatus==='upgrading'?Number(data.get('upgradeTarget')):null;if(f.upgradeStatus==='upgrading'&&f.upgradeTarget<=Number(f.value)){f.upgradeStatus='none';f.upgradeTarget=null;f.observationNote='Upgrade completion manually confirmed.'}if(f.upgradeStatus==='upgrading'&&f.upgradeTarget!==Number(f.value)+1){$('#storageMessage').textContent='Running target must be one above confirmed level.';return}if(!/^\d+$/.test(f.value)||Number(f.value)<1){$('#storageMessage').textContent='Enter a positive whole confirmed level.';return}if(f.upgradeStatus==='upgrading'&&Number(f.value)>=f.upgradeTarget){f.upgradeStatus='none';f.upgradeTarget=null;f.observationNote='Upgrade completion manually confirmed.'}}log(next,'edit',`${f.label}: ${old} → ${f.value}; ${f.status}; ${f.source}`);reconcile(next,state);commit(next)}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-toggle]');if(!b)return;const next=clone(state),t=next.tasks.find(t=>t.id===b.dataset.toggle);if(done(t)&&t.field){const f=state.fields.find(f=>f.id===t.field);if(f.status!=='unknown'&&f.value.trim()!==''&&Number(f.value)>=t.target){$('#storageMessage').textContent='This target is reached in the tracker. Lower or correct the tracker value to reopen it.';return}}
 const was=done(t);t.status=was?'next':'done';log(next,was?'reopened':'completion',t.title+' — manually '+(was?'reopened.':'completed; tracker values unchanged.'));commit(next)});
document.addEventListener('change',e=>{if(e.target.dataset.status){const next=clone(state), t=next.tasks.find(t=>t.id===e.target.dataset.status);t.status=e.target.value;log(next,'status',t.title+' → '+t.status);commit(next)}});
$('#groupFilter').addEventListener('change',render);
$('#addTask').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target),next=clone(state);next.tasks.push({id:'task-'+crypto.randomUUID(),title:d.get('title'),why:d.get('why'),field:null,target:null,status:'next'});log(next,'action','Added: '+d.get('title'));commit(next);e.target.reset()});
$('#addField').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target),next=clone(state);next.fields.push({id:'field-'+crypto.randomUUID(),group:d.get('group'),label:d.get('label'),value:d.get('value'),source:d.get('source'),status:'manual',updated:new Date().toISOString().slice(0,10)});log(next,'entry','Added: '+d.get('label'));commit(next);e.target.reset()});
$('#export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='z-route-v20.5-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#transferMessage').textContent='Backup download requested. Keep this file outside the browser.'});
let pending=null;
$('#import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>10000000)throw Error('File exceeds 10 MB.');pending=applyBuildingAudit(validate(JSON.parse(await file.text())));$('#importPreview').hidden=false;$('#importPreview').innerHTML=`<p>Replace current account with ${pending.fields.length} tracker entries, ${pending.tasks.length} actions and ${pending.history.length} history entries? A recovery copy of the current state will be saved first.</p><button id="confirmImport">Import and replace</button> <button id="cancelImport">Cancel</button>`;$('#transferMessage').textContent='Backup validated; review before replacing your data.'}catch(err){pending=null;$('#importPreview').hidden=true;$('#transferMessage').textContent='Import rejected: '+err.message}e.target.value=''});
$('#importPreview').addEventListener('click',e=>{if(e.target.id==='cancelImport'){$('#importPreview').hidden=true;pending=null}if(e.target.id==='confirmImport'&&pending){const next=pending;log(next,'import','Imported backup; previous state retained for recovery.');if(corrupt){try{localStorage.setItem(KEY+'-unreadable',localStorage.getItem(KEY)||'');corrupt=false}catch(err){$('#transferMessage').textContent='Cannot safely preserve unreadable state. Export and free browser space before import.';return}}commit(next);pending=null;$('#importPreview').hidden=true;$('#transferMessage').textContent='Backup imported.'}});
$('#undo').addEventListener('click',()=>{try{const raw=localStorage.getItem(BACKUP);if(!raw)throw Error('No previous save available.');const next=applyBuildingAudit(validate(JSON.parse(raw)));log(next,'restore','Restored previous save; displaced state available with Restore previous save.');commit(next)}catch(err){$('#transferMessage').textContent=err.message}});
addEventListener('storage',e=>{if(e.key===KEY&&e.newValue){try{state=applyBuildingAudit(validate(JSON.parse(e.newValue)));render();$('#storageMessage').textContent='Updated from another open tab.'}catch(err){$('#storageMessage').textContent='Another tab wrote invalid data. Reload or import a valid backup.'}}});
render();window.ZRWorkspace.mount();
window.ZRWorkspace.register(KEY,validate);
addEventListener('zr-linked',e=>{if(e.detail.key===KEY){try{state=validate(window.ZRWorkspace.read(KEY));render()}catch(err){$('#storageMessage').textContent=err.message}}});

function renderBuildings(){
 const rows=state.fields.filter(f=>f.building);
 $('#buildingCount').textContent=`${rows.filter(f=>f.built).length} built · ${rows.filter(f=>!f.built).length} locked/unbuilt`;
 $('#buildingRows').innerHTML=rows.map(f=>`<tr><td>${esc(f.label)}</td><td>${f.built?'Lv'+esc(f.value):'Not built'}</td><td>${f.upgradeStatus==='upgrading'?'UPGRADING → '+esc(f.upgradeTarget):esc(f.access)}<br>${esc(f.observationNote||'')}${f.unlockServerDay?' Server Day '+f.unlockServerDay:''}</td><td>${esc(f.source)}<br>${esc(f.updated)}</td></tr>`).join('');
 const camp=state.fields.find(f=>f.id==='camp'), metal=state.fields.find(f=>f.id==='building-metal-smelting-plant-5'), base=state.fields.find(f=>f.id==='base');
 $('#buildingReviews').innerHTML='<strong>Building strategy review</strong><p>'+ (camp?.upgradeStatus==='upgrading'?'Camp 1: Lv'+esc(camp.value)+' confirmed → '+esc(camp.upgradeTarget)+' pending. Player reports T8 unlock at Lv24; confirm completion and troop availability in game. ':'Review T8 troop availability against the confirmed Camp 1 level. ')+ 'Review progression from Base Lv'+esc(base?.value||'unknown')+' using the current in-game upgrade panel; next prerequisites and costs are not yet verified.'+(metal?.upgradeStatus==='upgrading'?' Confirm Metal Smelting Plant 5 completion: Lv'+esc(metal.value)+' → '+esc(metal.upgradeTarget)+' pending.':'')+'</p>';
}

function renderGatekeepers(){
 const level=id=>{const f=state.fields.find(f=>f.id===id);return !f||f.status==='unknown'||f.value.trim()===''||!Number.isFinite(Number(f.value))?null:Number(f.value)};
 const gates=[['base',27,'Base'],['camp',27,'Camp 1'],['alpha',26,'Alpha'],['hospital',25,'Hospital 1'],['building-defense-line',26,'Defense Line'],['warrior',24,'Warrior']];
 const active=state.fields.filter(f=>f.building&&f.upgradeStatus==='upgrading').map(f=>f.label+' '+f.value+'→'+f.upgradeTarget),missing=gates.filter(([id,t])=>level(id)===null||level(id)<t);
 const explanation=missing.length?'Required gatekeepers precede optional buildings. Remaining recorded targets: '+missing.map(([id,t,n])=>n+' '+(level(id)===null?'unknown':'Lv'+level(id))+'→'+t).join('; ')+'. Review the dependency dashboard before starting; targets are not proof of next-level eligibility.':'Building targets recorded. Confirm T9 troop eligibility and training invoice; no automatic unlock assumed.';
 $('#gatekeeperActions').innerHTML='<strong>Tier 1 · Base 27 → Camp 1 Lv27 → T9</strong><p>'+gates.map(([id,t,n])=>n+' '+(level(id)??'Unknown')+'/'+t).join(' · ')+'</p><p>'+esc(explanation)+'</p><p>'+esc(active.length?'Recorded running: '+active.join('; ')+'. Timers remain manual.':'No running building recorded in this tracker; verify queue availability.')+'</p><p><a href="command-dashboard.html">Recalculate prerequisites, invoices, three queues, research ROI and resource forecasts →</a></p><details><summary>Review supplied snapshot without replacing newer entries</summary><p>Supplied: Base24, Camp1 24 / T8, Alpha23→24 running, Warrior22→23 running, Hospital1 19, Defense22. Existing edits remain authoritative. To correct one value, use its tracker row; record starts separately.</p></details>';
}

function reconcilePlanTarget(t,s){const f=s.fields.find(f=>f.id===t.field);if(!f)return;const reached=f.status!=='unknown'&&f.value.trim()!==''&&Number.isFinite(Number(f.value))&&Number(f.value)>=t.target;t.status=reached?'done':'next';}

// Read/write facade for the Command Center. Existing state and validation remain authoritative.
window.ZRGuideAPI={get:()=>clone(state),validate,edit(id,value,options={}){let next=clone(state),f=next.fields.find(x=>x.id===id);if(!f){f={id,group:options.group||'Resources',label:options.label||id,value:'',status:'unknown',source:'Not recorded',updated:''};next.fields.push(f)}const old=f.value;if(options.heroDetail!==undefined){if(!Array.isArray(f.originalObservations))f.originalObservations=[];f.originalObservations.push({label:f.label,value:f.value,source:f.source,status:f.status,updated:f.updated,heroDetail:f.heroDetail||null});if(options.label)f.label=options.label;f.heroDetail={...clone(options.heroDetail),version:1,rawValue:String(value)};}f.value=String(value);f.status=options.status||'manual';f.source=options.source||'Player update in Command Center';f.updated=new Date().toISOString();if(f.building){if(!/^\d+$/.test(f.value)||Number(f.value)<1||Number(f.value)>30)throw Error('Building level must be 1–30');if(options.upgradeStatus!==undefined){f.upgradeStatus=options.upgradeStatus;f.upgradeTarget=f.upgradeStatus==='upgrading'?Number(options.upgradeTarget):null;}if(f.upgradeStatus==='upgrading'&&Number(f.value)>=f.upgradeTarget){f.upgradeStatus='none';f.upgradeTarget=null;}if(f.upgradeStatus==='upgrading'&&f.upgradeTarget!==Number(f.value)+1)throw Error('Running target must be the next level');}reconcile(next,state);log(next,'Command Center',f.label+': '+(options.heroChange||old+' → '+f.value));let ok=commit(validate(next));if(!ok||!storageOK)throw Error('Browser storage unavailable; export your record before leaving.');return true;},ready:true};
