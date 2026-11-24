// ---- editor canvas
const ed=$('#ed'),ec=ed.getContext('2d');
function fit(){zoom=cl(Math.floor(Math.min($('.stage').clientWidth,$('.stage').clientHeight)/P.size)||4,2,24);$('#zl').textContent=zoom*100+'% · '+P.size+'px'}
function rEd(){const z=zoom,n=P.size*z;if(ed.width!==n){ed.width=ed.height=n;ed.style.width=ed.style.height=n+'px'}ec.clearRect(0,0,n,n);if($('#onion').checked&&P.n>1)draw(ec,P,((cf-1+P.n)%P.n)/P.n,z,.3);draw(ec,P,cf/P.n,z);if($('#grid').checked&&z>=6){ec.strokeStyle='rgba(128,128,128,.3)';ec.lineWidth=1;ec.beginPath();for(let i=1;i<P.size;i++){ec.moveTo(i*z,0);ec.lineTo(i*z,n);ec.moveTo(0,i*z);ec.lineTo(n,i*z)}ec.stroke()}
const l=L_();if(l){ec.save();ec.strokeStyle='#7cc4ff';ec.lineWidth=2;ec.translate(l.x*z,l.y*z);ec.rotate(l.rot*Math.PI/180);ec.strokeRect(-l.w*z/2,-l.h*z/2,l.w*z,l.h*z);ec.restore()}
const h=P.hot,hx=(h.x+.5)*z,hy=(h.y+.5)*z;ec.strokeStyle='#ff4466';ec.lineWidth=2;ec.beginPath();ec.arc(hx,hy,Math.max(5,z*.5),0,7);ec.moveTo(hx-z,hy);ec.lineTo(hx+z,hy);ec.moveTo(hx,hy-z);ec.lineTo(hx,hy+z);ec.stroke();const k=(performance.now()-hotPing)/300;if(k<1&&!RM){ec.globalAlpha=1-k;ec.beginPath();ec.arc(hx,hy,z*(.6+k*1.4),0,7);ec.stroke();ec.globalAlpha=1}}
const pt=e=>{const r=ed.getBoundingClientRect();return[(e.clientX-r.left)/zoom,(e.clientY-r.top)/zoom]};
function hit(x,y){for(let i=P.layers.length-1;i>=0;i--){const l=P.layers[i];if(!l.vis)continue;const a=-l.rot*Math.PI/180,dx=x-l.x,dy=y-l.y,rx=dx*Math.cos(a)-dy*Math.sin(a),ry=dx*Math.sin(a)+dy*Math.cos(a);if(Math.abs(rx)<=l.w/2&&Math.abs(ry)<=l.h/2)return l}}
ed.onpointerdown=e=>{ed.setPointerCapture(e.pointerId);const[x,y]=pt(e);if(hotM){P.hot={x:cl(Math.floor(x),0,P.size-1),y:cl(Math.floor(y),0,P.size-1)};hotPing=performance.now();drag={hot:1};return}const l=hit(x,y);sel=l?l.id:null;drag=l?{l,ox:l.x-x,oy:l.y-y}:null;refresh()};
ed.onpointermove=e=>{const[x,y]=pt(e);$('#co').textContent=`x ${Math.floor(x)} y ${Math.floor(y)}`;if(!drag)return;if(drag.hot)P.hot={x:cl(Math.floor(x),0,P.size-1),y:cl(Math.floor(y),0,P.size-1)};else{const s=$('#snap').checked?.5:.01;drag.l.x=Math.round((x+drag.ox)/s)*s;drag.l.y=Math.round((y+drag.oy)/s)*s}sv()};
ed.onpointerup=()=>{if(drag){drag=null;commit()}};
$('#zi').onclick=()=>{zoom=cl(zoom+2,2,24);refresh()};$('#zo').onclick=()=>{zoom=cl(zoom-2,2,24);refresh()};$('#zf').onclick=()=>{fit();refresh()};
$('#bHot').onclick=e=>{hotM=!hotM;e.target.classList.toggle('on',hotM)};
