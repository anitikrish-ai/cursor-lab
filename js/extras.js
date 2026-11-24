// ---- extras: one-click download, templates, hotspot presets, real-size preview, undoable delete
function msgA(t,lab,fn){const e=E('div',{className:'toast'},t,E('button',{className:'tb',textContent:lab,onclick(){fn();e.remove()}}));$('#toasts').append(e);requestAnimationFrame(()=>e.classList.add('in'));setTimeout(()=>{e.classList.remove('in');setTimeout(()=>e.remove(),300)},6000)}
const dlNow=()=>anim(P)?$('#xAni').click():$('#xCur').click();
$('#bDl').onclick=dlNow;
const TPL=[['Classic arrow',()=>fresh()],
['Hand link',()=>({...fresh(),name:'Hand link',hot:{x:14,y:2},layers:[mk('hand',{x:16,y:17,w:20,h:24})]})],
['Text beam',()=>({...fresh(),name:'Text beam',hot:{x:16,y:16},layers:[mk('ibeam',{x:16,y:16,w:12,h:22,stroke:'#111111',fill:'#ffffff'})]})],
['Crosshair',()=>({...fresh(),name:'Crosshair',hot:{x:16,y:16},layers:[mk('prec',{x:16,y:16,w:22,h:22})]})],
['Arrow with bouncing buddy',()=>({...fresh(),name:'Arrow and buddy',layers:[mk('arrow',{x:12,y:13,w:18,h:24}),mk('cross',{x:25,y:23,w:9,h:9,fx:'bounce',amp:2,fill:'#ff7a59'})]})]];
async function useTpl(i){if(P.layers.length>1&&!await ask('Replace the current cursor with this template? Undo brings it back.'))return;P=TPL[i][1]();sel=P.layers[0]?.id||null;commit();fit();refresh();tabTo('ed');msg('Started from '+TPL[i][0]+'.')}
const ts=E('select',{'aria-label':'Start from a template',onchange(){const v=this.value;this.value='';v!==''&&useTpl(+v)}},E('option',{value:'',textContent:'Start from template'}),...TPL.map((t,i)=>E('option',{value:i,textContent:t[0]})));
$('#add').prepend(ts);
$('#vhm .row').after(E('h3',{textContent:'Or start from a template'}),E('div',{className:'grid'},...TPL.map((t,i)=>E('button',{className:'card tpl',textContent:t[0],onclick:()=>useTpl(i)}))));
$('#hPre').onchange=e=>{const c=e.target.value=='m'?Math.floor(P.size/2):0;e.target.value='';P.hot={x:c,y:c};hotPing=performance.now();commit()};
$('.stage').addEventListener('wheel',e=>{if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();zoom=cl(zoom+(e.deltaY<0?1:-1),2,24);refresh()},{passive:false});
const _del=del;del=function(){if(!sel)return;_del();msgA('Layer deleted.','Undo',undo)};
addEventListener('keydown',e=>{const m=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();if(!m||dlg.open||cmd.open)return;if(k==='s'){e.preventDefault();$('#bSave').click()}else if(k==='e'){e.preventDefault();dlNow()}});
CM.push(['Download cursor',dlNow],['New cursor',()=>$('#bNew').click()],...TPL.map((t,i)=>['Template: '+t[0],()=>useTpl(i)]));
const rc=$('#rc'),rx=rc.getContext('2d');(function t(){if(tab==='ed'){if(rc.width!==P.size)rc.width=rc.height=P.size;rx.clearRect(0,0,P.size,P.size);draw(rx,P,cf/P.n,1)}requestAnimationFrame(t)})();
refresh();
