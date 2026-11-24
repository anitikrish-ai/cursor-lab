
const $=s=>document.querySelector(s),E=(t,a,...c)=>{const e=document.createElement(t);Object.assign(e,a||{});e.append(...c);return e},cl=(v,a,b)=>Math.min(b,Math.max(a,v));
const SK='ccl.proj',LK='ccl.lib',PK='ccl.packs',J=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},S=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{msg('Storage full. Use Save to export the project file.')}};
const msg=t=>{const e=E('div',{className:'toast',textContent:t});$('#toasts').append(e);requestAnimationFrame(()=>e.classList.add('in'));setTimeout(()=>{e.classList.remove('in');setTimeout(()=>e.remove(),300)},4500)};
