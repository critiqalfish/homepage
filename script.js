let canvas;
let ctx;
let cwidth;
let cheight;
let isDrawing = false;

window.addEventListener("DOMContentLoaded", (ev) => {
    canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        cwidth = canvas.width;
        cheight = canvas.height;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, cwidth, cheight);
        fillCanvas();

        document.getElementById("canvas-clear").addEventListener("click", (ev) => clearCanvas());
        canvas.addEventListener("mousedown", canvasMouseDown);
        canvas.addEventListener("mousemove", canvasMouseMove);
        canvas.addEventListener("mouseup", canvasMouseUp);

        randomSpotifySong();
        document.getElementById("song-refresh").addEventListener("click", (ev) => randomSpotifySong());
    }
});

const canvasMouseDown = (ev) => {
    isDrawing = true;
    handleCanvasInteraction(ev);
};

const canvasMouseMove = (ev) => {
    if (isDrawing) {
        handleCanvasInteraction(ev);
    }
};

const canvasMouseUp = (ev) => {
    isDrawing = false;
};

const handleCanvasInteraction = (ev) => {
    const rect = canvas.getBoundingClientRect();
    const canvasMouseX = Math.round((ev.clientX - rect.left) / rect.width * cwidth);
    const canvasMouseY = Math.round((ev.clientY - rect.top) / rect.height * cheight);
    const rand = randBetw(0, 4);
    switch (rand) {
        case 0:
            glitchCanvasAt(canvasMouseX, canvasMouseY);
            break;
        case 1:
            wordCanvasAt(canvasMouseX, canvasMouseY);
            break;
        default:
            fillCanvasAt(canvasMouseX, canvasMouseY);
            break;
    }
}

// inclusive
const randBetw = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getSpotifySongData = async (link) => {
    let data = [];
    const res = await fetch(`https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(link)}&songIfSingle=true`);
    const resJSON = await res.json();

    Object.keys(resJSON.entitiesByUniqueId).forEach((k) => {
        if (k.startsWith("SPOTIFY")) {
            data.push(resJSON.entitiesByUniqueId[k].thumbnailUrl);
            data.push(resJSON.entitiesByUniqueId[k].title);
            data.push(resJSON.entitiesByUniqueId[k].artistName);
        }
    });

    return data;
}

const randomSpotifySong = async () => {
    document.getElementById("music").lastElementChild.style.opacity = "0";

    const res = await fetch("./songs.txt");
    const text = await res.text();
    const links = text.split("\n");

    if (links.length !== 0) {
        const link = links[randBetw(0, links.length - 1)];
        const data = await getSpotifySongData(link);
        if (data.length === 3) {
            document.getElementById("album-img").src = data[0];
            document.getElementById("title").textContent = data[1];
            document.getElementById("interpret").textContent = data[2];
            document.getElementById("spotify").href = link;
            document.getElementById("music").lastElementChild.style.opacity = "1";
        }
    }
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

const clearCanvas = () => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, cwidth, cheight);
    fillCanvas();
}

const glitchCanvasAt = (x, y) => {
    for (let i = 0; i <= 10; i++) {
        const imgData = ctx.getImageData(x + randBetw(-10, 10), y + randBetw(-10, 10), randBetw(10, 20), randBetw(10, 20));
        ctx.putImageData(imgData, x - 10 + randBetw(-10, 10), y - 10 + randBetw(-10, 10));
    }
}

const wordCanvasAt = (x, y) => {
    let randText = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    randText += characters.charAt(randBetw(0, characters.length - 1));

    ctx.fillStyle = "#000000";
    ctx.font = "10px serif";
    ctx.fillText(randText, x + randBetw(-10, 10), y + randBetw(-10, 10));
}

const fillCanvasAt = (x, y) => {
    for (let i = 0; i <= 100; i++) {
        ctx.fillStyle = `rgba(${randBetw(0, 255)}, ${randBetw(0, 255)}, ${randBetw(0, 255)}, ${Math.random().toFixed(2)})`;
        ctx.fillRect(x + randBetw(-10, 10), y + randBetw(-10, 10), randBetw(0, cwidth / 16), randBetw(0, cheight / 8));

        if (i % 10 === 0) {
            ctx.strokeStyle = `rgb(${randBetw(0, 255)}, ${randBetw(0, 255)}, ${randBetw(0, 255)})`;
            ctx.beginPath();
            ctx.moveTo(x + randBetw(-10, 10), y + randBetw(-10, 10));
            ctx.lineTo(x + randBetw(-10, 10), y + randBetw(-10, 10));
            ctx.stroke();
        }
    }
}