/* Derived hero observations and disposable plans. No persistence or combat formulas. */
(function(root){'use strict';
const copy=x=>JSON.parse(JSON.stringify(x));
function evidence(f){return !f||f.status==='unknown'||String(f.value??'').trim()===''?'Missing':f.status==='recorded'?'Confirmed record':f.status==='manual'?'Player reported':'Unverified record';}
function create(fields){
 const source=copy(fields||[]),roster=new Map();
 // Discover heroes from saved hero-specific observations, never from a game catalog.
 for(const f of source){if(!['Heroes','Skills','Gear'].includes(f.group))continue;const m=/^(.+?)(Level|Stars|Skills|Helmet|Vest|Rifle|Scope)$/.exec(f.id);if(!m)continue;const id=m[1];if(!roster.has(id))roster.set(id,{id,name:(f.label||id).split(' ')[0],gear:[]});const h=roster.get(id);if(m[2]==='Level')h.level=f;else if(m[2]==='Stars')h.stars=f;else if(m[2]==='Skills')h.skills=f;else h.gear.push({...f,slot:m[2]});}
 const formation=source.find(f=>f.id==='formation')||null;
 // Only parse the explicit Front / rear notation; keep all original text visible.
 const placements=[];if(formation&&evidence(formation)!=='Missing'){for(const match of String(formation.value).matchAll(/(?:^|;)\s*(Front|rear):\s*([^;]+)/gi)){match[2].split(/\s*\+\s*/).forEach((name,i)=>{const hero=[...roster.values()].find(h=>h.name.toLowerCase()===name.trim().toLowerCase());if(hero)placements.push({hero:hero.id,position:match[1].toLowerCase()+' '+(i+1),evidence:evidence(formation)});});}}
 return {roster:[...roster.values()],formation,placements,equipment:source.filter(f=>f.group==='Gear'),unlinked:source.filter(f=>['Heroes','Skills','Gear'].includes(f.group)&&!['hero-books','gear-materials'].includes(f.id)&&![...roster.values()].some(h=>[h.level,h.stars,h.skills,...h.gear].some(x=>x?.id===f.id)))};
}
function plan(view){return {placements:copy(view.placements),gear:view.roster.flatMap(h=>h.gear.map(g=>({item:g.id,hero:h.id,slot:g.slot})))};}
function simulate(view,draft,change){const next=copy(draft);if(!view.roster.some(h=>h.id===change.hero))throw Error('Choose a saved hero');if(change.kind==='squad'){if(!/^(front [12]|rear [123])$/.test(change.position))throw Error('Choose a valid position');next.placements=next.placements.filter(x=>x.hero!==change.hero&&x.position!==change.position);next.placements.push({hero:change.hero,position:change.position,evidence:'Simulation'});}else if(change.kind==='gear'){const item=next.gear.find(x=>x.item===change.item);if(!item)throw Error('Choose a saved gear item');const occupant=next.gear.find(x=>x.hero===change.hero&&x.slot===item.slot&&x!==item);if(occupant){occupant.hero=item.hero;}item.hero=change.hero;}else throw Error('Unknown simulation');return next;}
root.ZRHeroModel={create,evidence,plan,simulate};
})(typeof window==='undefined'?globalThis:window);
