// ---- state, history, library
function commit(){const s=JSON.stringify(P);if(s!==hist.at(-1)){hist.push(s);hist.length>100&&hist.shift();fut=[]}refresh()}
function restore(s){P=JSON.parse(s);if(!P.layers.some(l=>l.id===sel))sel=null;refresh()}
const undo=()=>{if(hist.length>1){fut.push(hist.pop());restore(hist.at(-1))}},redo=()=>{if(fut.length){const s=fut.pop();hist.push(s);restore(s)}};
function sv(){sd=1;clearTimeout(svT);svT=setTimeout(()=>S(SK,P),400)}
function refresh(){lay();insp();sv();$('#zl').textContent=zoom+'× · '+P.size+'px'}
const L_=()=>P.layers.find(l=>l.id===sel);
let lib=J(LK,[]),packs=J(PK,[{id:'p1',name:'My pack',map:{}}]),cp=0;
const ROLES=[['Arrow','Normal Select'],['Help','Help Select'],['AppStarting','Working in Background'],['Wait','Busy'],['Crosshair','Precision Select'],['IBeam','Text Select'],['NWPen','Handwriting'],['No','Unavailable'],['SizeNS','Vertical Resize'],['SizeWE','Horizontal Resize'],['SizeNWSE','Diagonal Resize 1'],['SizeNESW','Diagonal Resize 2'],['SizeAll','Move'],['UpArrow','Alternate Select'],['Hand','Link Select'],['Pin','Location Select'],['Person','Person Select']];
const dlg=$('#dlg'),ask=t=>new Promise(r=>{$('#dt').textContent=t;dlg.returnValue='';dlg.onclose=()=>r(dlg.returnValue==='ok');dlg.showModal()});
