for (const player of document.querySelectorAll('.slide-player')) {
 const image=player.querySelector('.slide-image'),prev=player.querySelector('.slide-prev'),next=player.querySelector('.slide-next'),counter=player.querySelector('.slide-counter'),expand=player.querySelector('.slide-expand'),transcript=player.querySelector('.slide-transcript p'),help=player.querySelector('.slide-help');
 let slides=[],index=0,start=null;
 const render=()=>{
  image.src=slides[index].src;image.alt=`${player.dataset.title}, slide ${index+1} of ${slides.length}`;
  counter.textContent=`${index+1} / ${slides.length}`;transcript.textContent=slides[index].text||'This slide contains visual content without extractable text.';
  prev.disabled=index===0;next.disabled=index===slides.length-1;
  if(index+1<slides.length){const preload=new Image();preload.src=slides[index+1].src;}
 };
 const move=delta=>{if(!slides.length)return;index=Math.max(0,Math.min(slides.length-1,index+delta));render();};
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 player.addEventListener('keydown',e=>{if(!slides.length)return;if(e.key==='ArrowRight'){e.preventDefault();move(1)}else if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}else if(e.key==='Home'){e.preventDefault();index=0;render()}else if(e.key==='End'){e.preventDefault();index=slides.length-1;render()}});
 image.addEventListener('touchstart',e=>{start={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}},{passive:true});
 image.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);start=null},{passive:true});
 if(player.requestFullscreen&&document.fullscreenEnabled){expand.hidden=false;expand.addEventListener('click',async()=>{try{if(document.fullscreenElement===player)await document.exitFullscreen();else await player.requestFullscreen()}catch{help.textContent='Full screen is unavailable in this browser. You can still click through the slides here.'}});document.addEventListener('fullscreenchange',()=>{expand.textContent=document.fullscreenElement===player?'Exit full screen':'Full screen'})}
 image.addEventListener('error',()=>{help.textContent='This slide could not load. You can download the presentation below.'});
 next.disabled=true;
 fetch(player.dataset.deck).then(r=>{if(!r.ok)throw Error('Slide list unavailable');return r.json()}).then(data=>{if(!Array.isArray(data)||!data.length)throw Error('Empty deck');slides=data;render()}).catch(()=>{next.disabled=true;help.textContent='The slide player could not load. Please use the download below.'});
}
