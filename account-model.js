/* v21 compatibility boundary. Views are derived, never a second persisted account. */
(function(root){'use strict';
const keys={guide:'zroute-v205-state',dashboard:'zroute-command-v2',fighter:'zroute-fighter-v1'};
const buildings={1001:'base',1002:'building-defense-line',1004:'hospital',1007:'alpha',5044:'warrior',1020:'camp',10202:'building-soldier-training-camp-2',10203:'building-soldier-training-camp-3',10204:'building-soldier-training-camp-4'};
const copy=x=>JSON.parse(JSON.stringify(x));
function prepare(doc,validators){
 if(!doc||doc.format!=='zroute-workspace'||doc.version!==1||!doc.data||typeof doc.data!=='object'||Array.isArray(doc.data))throw Error('Unsupported workspace backup');
 const included=Object.keys(doc.data);
 if(!included.length||included.some(k=>!Object.values(keys).includes(k)))throw Error('Unknown workspace tool');
 // Validate a private copy: validators cannot mutate the uploaded document.
 const next=copy(doc);
 for(const k of included){if(typeof validators[k]!=='function')throw Error('Missing tool validator');next.data[k]=validators[k](copy(next.data[k]));}
 return next;
}
function view(data){
 const snapshot=copy(data),g=snapshot[keys.guide],d=snapshot[keys.dashboard],f=snapshot[keys.fighter];
 const fields=g?.fields||[],byGroup=group=>fields.filter(x=>x.group===group);
 const buildingIds=new Set(Object.values(buildings));
 const conflicts=[];
 const inventory=Object.entries(buildings).map(([id,fieldId])=>{
  const observation=fields.find(x=>x.id===fieldId)||null,completed=d?.buildings?.[id]??null;
  if(observation&&observation.status!=='unknown'&&observation.value!==''&&completed!==null&&completed!==''&&Number(observation.value)!==Number(completed))conflicts.push({kind:'building',id:Number(id),guide:observation.value,dashboard:completed});
  return {id:Number(id),fieldId,observation,completed,queues:d?.queues?.filter(q=>q.building===Number(id))||[]};
 });
 // Include audited guide-only buildings too; no made-up client IDs or costs.
 for(const observation of fields.filter(x=>x.building&&!buildingIds.has(x.id)))inventory.push({id:null,fieldId:observation.id,observation,completed:null,queues:[]});
 const materials=['hero-books','gear-materials'].map(id=>({id,observation:fields.find(x=>x.id===id)||null}));
 const bookCandidates=fields.filter(x=>x.id!=='hero-books'&&/skill books|books on hand/i.test(x.label));
 for(const x of bookCandidates)conflicts.push({kind:'possible-skill-book-alias',id:x.id,value:x.value});
 return {schemaVersion:21,heroes:byGroup('Heroes').filter(x=>!materials.some(m=>m.id===x.id)),squads:{formation:fields.find(x=>x.id==='formation')||null},equipment:byGroup('Gear'),buildings:inventory,research:d?.research||null,resources:{balances:d?.resources||null,materials,observations:byGroup('Resources')},fighter:f||null,conflicts};
}
root.ZRAccountModel={keys,buildings,prepare,view};
})(typeof window==='undefined'?globalThis:window);
