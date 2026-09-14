const gallery=document.querySelector('.swiss-slideshow');
if(gallery){
 const slides=[...gallery.querySelectorAll('.gallery-slide')],counter=gallery.querySelector('.gallery-count');let current=0,start=null;
 function show(index){slides[current].querySelector('video')?.pause();current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==current);const img=slides[current].querySelector('img');if(img)img.loading='eager';counter.textContent=`${current+1} / ${slides.length}`;const next=slides[(current+1)%slides.length].querySelector('img');if(next){const preload=new Image();preload.src=next.src}}
 gallery.querySelector('.gallery-prev').addEventListener('click',()=>show(current-1));gallery.querySelector('.gallery-next').addEventListener('click',()=>show(current+1));
 gallery.addEventListener('keydown',e=>{if(e.target.closest('video'))return;if(e.key==='ArrowRight'){e.preventDefault();show(current+1)}else if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}else if(e.key==='Home'){e.preventDefault();show(0)}else if(e.key==='End'){e.preventDefault();show(slides.length-1)}});
 gallery.addEventListener('touchstart',e=>{if(e.target.closest('video'))return;start={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}},{passive:true});
 gallery.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)show(current+(dx<0?1:-1))},{passive:true});
 show(0);
}
