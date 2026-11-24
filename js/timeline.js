// ---- timeline
function strip(){const s=$('#strip');s.replaceChildren();for(let i=0;i<P.n;i++){const c=E('canvas',{width:48,height:48,className:i===cf?'cur':'',title:'Frame '+(i+1),onclick(){cf=i;play=false;$('#tP').textContent='Play';strip()}});const x=c.getContext('2d');x.imageSmoothingEnabled=false;draw(x,P,i/P.n,48/P.size);s.append(c)}}
const step=v=>{play=false;$('#tP').textContent='Play';cf=(cf+v+P.n)%P.n;strip()};
$('#tP').onclick=e=>{play=!play;e.target.textContent=play?'Pause':'Play'};$('#tS').onclick=()=>{play=false;cf=0;$('#tP').textContent='Play';strip()};$('#tB').onclick=()=>step(-1);$('#tF').onclick=()=>step(1);
