// ---- preview lab
const pv=$('#pv'),pc=$('#pc'),pcx=pc.getContext('2d');let mx=-99,my=-99;
pv.onpointermove=e=>{const r=pv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top};pv.onpointerdown=e=>{const r=pv.getBoundingClientRect();$('#pco').textContent=`Click registered at x ${Math.round(e.clientX-r.left)}, y ${Math.round(e.clientY-r.top)} (hotspot ${P.hot.x},${P.hot.y})`};
$('#pbg').onchange=e=>{pv.className=e.target.value};
function rPv(ts){if(pc.width!==P.size)pc.width=pc.height=P.size;pcx.clearRect(0,0,P.size,P.size);const fi=Math.floor(ts/(P.d*1000/60))%P.n;draw(pcx,P,anim(P)?fi/P.n:0,1);pc.style.transform=`translate(${mx-P.hot.x}px,${my-P.hot.y}px)`}
