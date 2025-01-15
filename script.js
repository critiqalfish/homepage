let canvas;
let ctx;
let cwidth;
let cheight;

window.addEventListener("DOMContentLoaded", (ev) => {
    canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        cwidth = canvas.width;
        cheight = canvas.height;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, cwidth, cheight);
        console.log(cwidth, cheight)
        fillCanvas();
        canvas.addEventListener("mousedown", (ev) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = Math.round(ev.clientX - rect.left);
            const mouseY = Math.round(ev.clientY - rect.top);
            glitchCanvas(mouseX, mouseY);
        })
    }
});

// inclusive
const randBetw = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fillCanvas = () => {
    for (let i = 0; i <= 10000; i++) {
        ctx.fillStyle = `rgba(${randBetw(0, 255)}, ${randBetw(0, 255)}, ${randBetw(0, 255)}, ${Math.random().toFixed(2)})`;
        ctx.fillRect(randBetw(0, cwidth), randBetw(0, cheight), randBetw(0, cwidth / 16), randBetw(0, cheight / 8));
        
        if (i % 10 === 0) {
            ctx.strokeStyle = `rgb(${randBetw(0, 255)}, ${randBetw(0, 255)}, ${randBetw(0, 255)})`;
            ctx.beginPath();
            ctx.moveTo(randBetw(0, cwidth), randBetw(0, cheight));
            ctx.lineTo(randBetw(0, cwidth), randBetw(0, cheight));
            ctx.stroke();
            
        }
    }
}

const glitchCanvas = (x, y) => {
    console.log(x, y);
    const imgData = ctx.getImageData(x - 10, y - 10, 20, 20);
    ctx.putImageData(imgData, x - 10 + 10, y - 10 + 10);
}