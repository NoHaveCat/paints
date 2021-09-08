const canvas=document.querySelector('.canvas');
const ctx=canvas.getContext('2d');
const colors=document.getElementsByClassName('controls_color');
const lineWidth=document.querySelector('#jsRange');
const mode=document.querySelector('#jsMode')
const save=document.querySelector('#jsSave');
let painting = false;
let fillVar=false;
const CANVASSIZE=700;
canvas.height=CANVASSIZE;
canvas.width=CANVASSIZE;
ctx.fillStyle='white';
ctx.fillRect(0,0,CANVASSIZE,CANVASSIZE)
ctx.lineWidth=2.5;
ctx.strokeStyle='rgb(44,44,44)';
ctx.fillStyle='rgb(44,44,44)';
canvas.backgroundColor='white';
function canvasMouseMove(event){
    const offsetX=event.offsetX;
    const offsetY=event.offsetY;
    if (painting){
        ctx.lineTo(offsetX,offsetY)
        ctx.stroke()
    }
    else
    {
        ctx.beginPath();
        ctx.moveTo(offsetX,offsetY)
    }
}
function StartPainting(event){
    painting= true;    
}
function Stoppaiting(event){
    painting= false;
}
function filling(){
    if (fillVar){
        ctx.fillRect(0,0,CANVASSIZE,CANVASSIZE);
    }
}
function modeChange(){
    
    if(fillVar){
        fillVar=false;
        mode.innerText='fill'
    } else{
        fillVar=true;
        mode.innerText='draw'
    }
}
function Clickcontextmenu(event){
    event.preventDefault();
}
if (canvas){
    canvas.addEventListener('mousemove',canvasMouseMove);
    canvas.addEventListener('mousedown',StartPainting);
    canvas.addEventListener('mouseup',Stoppaiting);
    canvas.addEventListener('mouseleave',Stoppaiting)
    canvas.addEventListener('mousedown',filling);
    mode.addEventListener('click',modeChange);
    canvas.addEventListener('contextmenu',Clickcontextmenu);
}
function colorselect(color){
    a=color.target.style.backgroundColor;
    ctx.strokeStyle=a;
    ctx.fillStyle=a;
}
Array.from(colors).forEach(color => color.addEventListener('click',colorselect));
function changeLine(){
    ctx.lineWidth=lineWidth.value;
}
lineWidth.addEventListener('mouseup',changeLine);
function saveFile(){
    const img=canvas.toDataURL('image/jpeg')
    const link=document.createElement('a');
    console.log(link)
    link.href=img
    link.download='다운로드';
    link.click();
}
save.addEventListener('click',saveFile);




