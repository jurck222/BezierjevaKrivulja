import { Bezier } from "./Bezier.js";
import { Vector } from "./Vector.js";
import { Spline } from "./Spline.js";
function drawLine(seznamZlepkov){
    let seznam=[];
    for(let x=0; x<seznamZlepkov.length;x++ ){ 
        ctx.strokeStyle = barve[x];
                for(let i =0; i<seznamZlepkov[x].spl.length;i++){
                ctx.beginPath();
                ctx.setLineDash([3,4]);
                ctx.moveTo(seznamZlepkov[x].spl[i].p[0].kord[0],seznamZlepkov[x].spl[i].p[0].kord[1]);
                ctx.lineTo(seznamZlepkov[x].spl[i].p[1].kord[0],seznamZlepkov[x].spl[i].p[1].kord[1]);
                ctx.moveTo(seznamZlepkov[x].spl[i].p[3].kord[0],seznamZlepkov[x].spl[i].p[3].kord[1]);
                ctx.lineTo(seznamZlepkov[x].spl[i].p[2].kord[0],seznamZlepkov[x].spl[i].p[2].kord[1]);
                ctx.stroke();
                drawCircle(seznamZlepkov[x].spl[i].p[1].kord[0],seznamZlepkov[x].spl[i].p[1].kord[1]);
                drawCircle(seznamZlepkov[x].spl[i].p[2].kord[0],seznamZlepkov[x].spl[i].p[2].kord[1]);
                drawRect(seznamZlepkov[x].spl[i].p[3].kord[0],seznamZlepkov[x].spl[i].p[3].kord[1]);
                drawRect(seznamZlepkov[x].spl[i].p[0].kord[0],seznamZlepkov[x].spl[i].p[0].kord[1]);
                seznam=drawCurve(seznamZlepkov[x].spl[i]);
                ctx.setLineDash([]);
                ctx.beginPath();
                for(let j = 0; j<seznam.length-1;j+=2){       
                    ctx.moveTo(seznam[j].kord[0],seznam[j].kord[1]);
                    ctx.lineTo(seznam[j+1].kord[0],seznam[j+1].kord[1]); 
                }
                ctx.stroke();
                }
    }
}
function prvaCrta(sez){
    if(zlepki.length>1){
        ctx.strokeStyle = barve[IzbranZlepek];
        drawLine(zlepki);
    }
    ctx.strokeStyle = barve[IzbranZlepek];
    ctx.beginPath();
    ctx.setLineDash([3,4]);
    ctx.moveTo(sez[0].kord[0],sez[0].kord[1]);
    ctx.lineTo(sez[1].kord[0],sez[1].kord[1]);
    ctx.stroke();
    drawCircle(sez[1].kord[0],sez[1].kord[1]);
    drawRect(sez[0].kord[0],sez[0].kord[1]);
}
function startDragLine(e) {
    firstClick = new Vector ([e.pageX, e.pageY]);
    drawCircle(firstClick.kord[0],firstClick.kord[1]);
    crte.push(firstClick);
    temp.push(firstClick);
    intervalLoop = setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        color.value=barve[IzbranZlepek];
        drawLine(zlepki);
        if (temp.length>=2){
        prvaCrta(temp);
        }
        ctx.beginPath();
        ctx.setLineDash([3,4]);
        ctx.moveTo(firstClick.kord[0], firstClick.kord[1]);
        ctx.lineTo(cursorX, cursorY, 6);
        ctx.stroke();
        drawRect(firstClick.kord[0],firstClick.kord[1]);
    },10);
    drawLine(zlepki);
}
function drawCircle(x,y){
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.arc(x,y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}
function drawRect(x,y){
    ctx.beginPath();
    ctx.fillStyle = 'red';
    let w =10;
    ctx.setLineDash([]);
    let fillRect = true;
    ctx.rect(x-w/2, y-w/2, w, w);
    if (fillRect) {
        ctx.fill();
    }
    ctx.stroke();   
}
function makeBezier(){
    drawLine(zlepki);
    IzbranZlepek = selection.value;
    let bez = new Bezier([]);
    if(zlepki[IzbranZlepek].spl.length<1){
        bez = new Bezier([crte[0],crte[1],crte[3],crte[2]]);
        let a = crte[2];
        let b = crte[3];
        crte=[];
        crte.push(a);
        crte.push(a.add(a.subtract(b)));
        zlepki[IzbranZlepek].spl.push(bez);
    }
    else{
        bez = new Bezier([crte[0],crte[1],crte[3],crte[2]]);
        let a = crte[2];
        let b = crte[3];
        crte=[];
        crte.push(a);
        crte.push(a.add(a.subtract(b)));
        zlepki[IzbranZlepek].spl.push(bez);
    }
    return bez;
}
function drawCurve(bez){
    let seznam = [];
    let x= new Vector();
    for(let i = 0;i<1; i+=0.005){  
            x=bez.value(i);
            seznam.push(x);
            if((i+0.005)<1){
            x=bez.value(i+0.005);
            seznam.push(x);
            } 
    }
    return seznam;
}
function drawU(tocke){
    ctx.strokeStyle=barve[IzbranZlepek];
    ctx.setLineDash([]);
    ctx.beginPath();
    for(let j = 0; j<tocke.length-1;j+=2){       
        ctx.moveTo(tocke[j].kord[0],tocke[j].kord[1]);
        ctx.lineTo(tocke[j+1].kord[0],tocke[j+1].kord[1]); 
    }
    ctx.stroke();
}
function stopDragLine(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
    lastClick = new Vector([e.pageX, e.pageY]);
    crte.push(lastClick);
    temp.push(lastClick);
    drawCircle(cursorX,cursorY);
    if(zlepki[IzbranZlepek].spl.length!=0){
        if(crte.length==4){
            drawU(drawCurve(makeBezier(crte)));
        }
    }
    else{
        if(crte.length==4){
            drawU(drawCurve(makeBezier(crte)));
        }
    }
    clearInterval(intervalLoop);
}
function init() {
    document.onmousemove = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
    };
    canvas.addEventListener('mousedown', startDragLine, false);
    canvas.addEventListener('mouseup', stopDragLine, false);
}
let isEmpty = true;
let krivulja=0;
let crte = [];
let barve=[];
let cursorX;
let cursorY;
let ods = document.getElementById("odstrani");
let canvas = document.getElementById("canvas"); 
let ctx = canvas.getContext('2d');
let firstClick = new Vector();
let lastClick = new Vector();
let intervalLoop = null;
let temp=[];
let zlepki=[];
let sp = new Spline([]);
let selection = document.getElementById('krivulje');
let gumb = document.getElementById("dodaj");
zlepki.push(sp);
let opt = document.createElement('option');
opt.value = krivulja;
opt.innerHTML = "krivulja"+krivulja;
opt.id="krivulja"+krivulja;
selection.appendChild(opt);
let IzbranZlepek = selection.value;
let color= document.getElementById("barve");
let barva = color.value;
barve.push(barva);
selection.addEventListener('change',function(){
    crte=[];
    IzbranZlepek = selection.value;
    color.value=barve[IzbranZlepek];
    let n = zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p[zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p.length-1];
    let m= zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p[zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p.length-2];
    crte.push(zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p[zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p.length-1]);
    crte.push(n.add(n.subtract(m)));
});
color.addEventListener('change',function(){
    barva=color.value;
    IzbranZlepek = selection.value;
    barve[IzbranZlepek]=barva;
    color.value=barve[IzbranZlepek];
    drawLine(zlepki);
});
gumb.addEventListener('click',function(){
    zlepki.push(new Spline([]));
    krivulja+=1;
    crte=[];
    temp=[];
    barve.push('#000000');
    opt = document.createElement('option');
    opt.value = krivulja;
    opt.innerHTML = "krivulja"+krivulja;
    opt.id="krivulja"+krivulja;
    selection.appendChild(opt); 
    selection.value=krivulja;
    color.value=barve[IzbranZlepek];
});
ods.addEventListener('click',function(){
    zlepki[IzbranZlepek]=new Spline([]);
    barve[IzbranZlepek]=[];
    document.getElementById("krivulja"+IzbranZlepek).text = "";
    if(selection.value!=0){
    selection.value=0;
    IzbranZlepek=selection.value;
    }
    else if(selection.text==""){
        selection.value=0; 
        IzbranZlepek=selection.value;
    }
    else{
        selection.value=0; 
        IzbranZlepek=selection.value;
    }
    crte=[];
    temp=[];
    for(let i =0; i<zlepki.length;i++ ){
        if(zlepki[i].spl.length!=0){
            isEmpty=false;
            break;
        }
    }
    if(!isEmpty){
    let n = zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p[zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p.length-1];
    let m= zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p[zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p.length-2];
    crte.push(zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p[zlepki[IzbranZlepek].spl[zlepki[IzbranZlepek].spl.length-1].p.length-1]);
    crte.push(n.add(n.subtract(m)));
    drawLine(zlepki);
    isEmpty=true;
    }
    else{
        zlepki=[];
        while(selection.options.length>0){
            selection.remove(0);
        }
        krivulja=0;
        zlepki.push(new Spline([]));
        crte=[];
        temp=[];
        barve.push('#000000');
        opt = document.createElement('option');
        opt.value = krivulja;
        opt.innerHTML = "krivulja"+krivulja;
        opt.id="krivulja"+krivulja;
        selection.appendChild(opt); 
        selection.value=krivulja;
        IzbranZlepek = selection.value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});
init();
