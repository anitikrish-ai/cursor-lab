// ---- routing, library page, command menu
const PG=['hm','nf','ed','pv','pk','lb','hp','pr','tm'],TT={hm:'Make Windows mouse cursors',nf:'Page not found',ed:'Studio',pv:'Preview',pk:'Packs',lb:'Library',hp:'Help',pr:'Privacy policy',tm:'Terms and conditions'},HS={hm:'home',ed:'studio',pv:'preview',pk:'packs',lb:'library',hp:'help',pr:'privacy',tm:'terms'},RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function tabTo(t){if(!PG.includes(t))t='ed';tab=t;document.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t===t));PG.forEach(p=>{$('#v'+p).hidden=p!==t});$('#app').classList.toggle('v2',t!=='ed');$('#R').classList.remove('open');if(t==='pk')rPk();if(t==='lb')rLb();if(t==='ed')fit();document.title=TT[t]+' | Cursor Lab';if(t==='hm')$('#hn').textContent=P.layers.length?'Your last project, '+P.name+', is saved on this device.':'';if(HS[t])try{location.hash=HS[t]}catch{}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(b)tabTo(b.dataset.t)});
addEventListener('hashchange',()=>{const h=location.hash.slice(1),k=Object.keys(HS).find(k=>HS[k]===h);if(h&&(k||'nf')!==tab)tabTo(k||'nf')});
function openProj(p){P=JSON.parse(JSON.stringify(p));sel=null;hist=[JSON.stringify(P)];fut=[];fit();refresh();tabTo('ed')}
let lq='',ls='new';
function rLb(){const v=$('#vlb');v.replaceChildren();const q=E('input',{type:'text',placeholder:'Search cursors',value:lq,oninput(){lq=this.value;rLb2()}}),so=E('select',{onchange(){ls=this.value;rLb2()}},...[['new','Newest'],['name','Name'],['size','Size']].map(([a,b])=>E('option',{value:a,textContent:b,selected:a===ls})));v.append(E('h2',{textContent:'Library'}),E('p',{className:'mu',textContent:'Saved cursors. Open one in the Studio or assign it to a role in Packs.'}),E('div',{className:'row'},q,so),E('div',{id:'lg'}));rLb2()}
function rLb2(){const g=$('#lg');if(!g)return;g.replaceChildren();let a=lib.filter(i=>i.name.toLowerCase().includes(lq.toLowerCase()));if(ls==='name')a.sort((x,y)=>x.name.localeCompare(y.name));else if(ls==='size')a.sort((x,y)=>x.proj.size-y.proj.size);else a.reverse();
if(!a.length){g.className='empty';g.replaceChildren(E('p',{textContent:lib.length?'No cursors match "'+lq+'". Try a shorter search.':'Nothing saved yet. Build a cursor in the Studio, then choose File, Add to library.'}),...(lib.length?[]:[E('button',{className:'on',textContent:'Open the Studio',onclick:()=>tabTo('ed')})]));return}g.className='grid';
a.forEach(it=>{const c=E('canvas',{width:64,height:64,className:'th'}),b=(t,f)=>E('button',{textContent:t,onclick:f});c.classList.add('skel');loadAll(it.proj).then(()=>{c.classList.remove('skel');draw(c.getContext('2d'),it.proj,0,64/it.proj.size)});
g.append(E('div',{className:'card'},c,E('b',{textContent:it.name}),E('span',{className:'mu',textContent:it.proj.size+'px, '+it.proj.layers.length+' layers'+(anim(it.proj)?', animated':'')}),E('div',{className:'row'},b('Open',()=>openProj(it.proj)),b('Rename',()=>{const n=prompt('Cursor name',it.name);if(n&&n.trim()){it.name=n.trim();S(LK,lib);rLb2()}}),b('Duplicate',()=>{lib.push({id:'c'+Date.now(),name:it.name+' copy',proj:JSON.parse(JSON.stringify(it.proj))});S(LK,lib);rLb2()}),b('Delete',async()=>{if(await ask(`Delete "${it.name}" from the library? Packs using it lose that role.`)){lib=lib.filter(x=>x!==it);packs.forEach(p=>{for(const k in p.map)if(p.map[k]===it.id)delete p.map[k]});S(LK,lib);S(PK,packs);rLb2()}}))))})}
const cmd=$('#cmd'),ci=$('#ci'),cu=$('#cu');let cs=[],ck=0;
const CM=[['Go to Studio',()=>tabTo('ed')],['Go to Preview',()=>tabTo('pv')],['Go to Packs',()=>tabTo('pk')],['Go to Library',()=>tabTo('lb')],['Go to Help',()=>tabTo('hp')],['Privacy policy',()=>tabTo('pr')],['Terms and conditions',()=>tabTo('tm')],['Import image',()=>$('#add button').click()],['Export .cur',()=>$('#xCur').click()],['Export .ani',()=>$('#xAni').click()],['Validate export',()=>$('#xVer').click()],['Save project file',()=>$('#bSave').click()],['Add to library',()=>$('#bLib').click()],['Undo',undo],['Redo',redo]];
function cr(){cs=CM.filter(c=>c[0].toLowerCase().includes(ci.value.toLowerCase()));ck=Math.min(ck,Math.max(0,cs.length-1));cu.replaceChildren(...cs.map((c,i)=>E('li',{textContent:c[0],className:i===ck?'on':'',onclick(){run(i)}})))}
function run(i){const c=cs[i];if(c){cmd.close();c[1]()}}
ci.oninput=()=>{ck=0;cr()};ci.onkeydown=e=>{if(e.key==='ArrowDown'){ck=Math.min(ck+1,cs.length-1);cr();e.preventDefault()}else if(e.key==='ArrowUp'){ck=Math.max(ck-1,0);cr();e.preventDefault()}else if(e.key==='Enter')run(ck)};
function openCmd(){ci.value='';ck=0;cr();cmd.showModal();ci.focus()}
addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();cmd.open?cmd.close():openCmd()}});
$('#bCmd').onclick=openCmd;$('#bIns').onclick=()=>$('#R').classList.toggle('open');
sel=P.layers[0]?.id||null;fit();refresh();tabTo(location.hash.length>1?(Object.keys(HS).find(k=>HS[k]===location.hash.slice(1))||'nf'):'hm');


document.addEventListener('click',e=>document.querySelectorAll('details.menu[open]').forEach(d=>{if(!d.contains(e.target)||e.target.closest('.pop button'))d.open=false}));

addEventListener('error',e=>msg('Something went wrong: '+e.message+'. Your project is autosaved. Reload the page to continue.'));

// ---- drag and drop import
(()=>{const z=$('#C');let n=0;const has=e=>[...(e.dataTransfer?.types||[])].includes('Files'),on=e=>tab==='ed'&&has(e);
addEventListener('dragover',e=>{if(has(e))e.preventDefault()});
addEventListener('dragenter',e=>{if(on(e)){n++;z.classList.add('drop')}});
addEventListener('dragleave',e=>{if(on(e)&&--n<=0){n=0;z.classList.remove('drop')}});
addEventListener('drop',e=>{if(!has(e))return;e.preventDefault();n=0;z.classList.remove('drop');if(tab!=='ed')return msg('Open the Studio, then drop the file.');
for(const f of e.dataTransfer.files){const nm=f.name.toLowerCase(),id=f.type.startsWith('image/')?'#fImg':/\.(json|cur|ani)$/.test(nm)?'#fOpen':null;if(!id){msg('Cannot import "'+f.name+'". Drop an image (PNG, JPG, WebP, SVG, GIF) or a project (.json, .cur, .ani).');continue}
const dt=new DataTransfer();dt.items.add(f);const el=$(id);el.files=dt.files;el.dispatchEvent(new Event('change'))}});})();
