// ---- header, shortcuts, tabs
$('#bNew').onclick=async()=>{if(await ask('Start a new project? The current one stays in your autosave only until you edit the new one.')){P=fresh();sel=null;hist=[JSON.stringify(P)];fut=[];fit();refresh()}};
$('#bSave').onclick=()=>dl(JSON.stringify(P),P.name+'.cursorlab.json','application/json');$('#bOpen').onclick=()=>$('#fOpen').click();
$('#bLib').onclick=()=>{lib.push({id:'c'+Date.now(),name:P.name,proj:JSON.parse(JSON.stringify(P))});S(LK,lib);msg('Saved to library.')};
$('#bU').onclick=undo;$('#bR').onclick=redo;
$('#xCur').onclick=async()=>{const s=P.size,c=mkCur(await fpng(P,cf),s,s,cl(P.hot.x,0,s-1),cl(P.hot.y,0,s-1));dl(c,P.name+'.cur')};
$('#xAni').onclick=async()=>{if(!anim(P))return msg('No animation: set an effect on a layer and use 2+ frames. A static cursor exports as .cur.');dl((await build(P)).data,P.name+'.ani')};
$('#xPng').onclick=async()=>dl(await fpng(P,cf),P.name+'.png','image/png');
$('#xZip').onclick=async()=>{const f=[];for(let i=0;i<P.n;i++)f.push({n:`frame_${String(i+1).padStart(2,'0')}.png`,d:await fpng(P,i)});dl(zip(f),P.name+'_frames.zip','application/zip')};$('#xVer').onclick=verify;
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||dlg.open)return;const m=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();if(m&&k==='z'){e.preventDefault();e.shiftKey?redo():undo()}else if(m&&k==='y'){e.preventDefault();redo()}else if(m&&k==='d'){e.preventDefault();dup()}else if(m&&k==='c'){const l=L_();clip=l&&JSON.stringify(l)}else if(m&&k==='v'&&clip){const l={...JSON.parse(clip),id:Math.random().toString(36).slice(2)};l.x+=2;P.layers.push(l);sel=l.id;commit()}else if(k==='delete'||k==='backspace')del();else if(k===' '){e.preventDefault();$('#tP').click()}else if(k.startsWith('arrow')&&L_()){e.preventDefault();const l=L_(),s=e.shiftKey?2:.5;if(k==='arrowleft')l.x-=s;if(k==='arrowright')l.x+=s;if(k==='arrowup')l.y-=s;if(k==='arrowdown')l.y+=s;commit()}});
let hotPing=-1e9,last=0;(function tick(ts){if(play&&P.n>1&&ts-last>P.d*1000/60){last=ts;cf=(cf+1)%P.n;[...$('#strip').children].forEach((c,i)=>c.classList.toggle('cur',i===cf))}if(cf>=P.n)cf=0;if(sd){strip();sd=0}if(tab==='ed')rEd();if(tab==='pv')rPv(ts);requestAnimationFrame(tick)})(0);

