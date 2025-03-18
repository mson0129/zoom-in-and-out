const scaleInit = 100;
const scaleStep = 4;
const scaleMax = 400;
const scaleMin = 1;
let scale = scaleInit;
let offsetX = 0;
let offsetY = 0;
let offset = {x: 0, y: 0, z: 0};
let cursor = {x: 0, y: 0};
let transposedCursor = {x: 0, y: 0};

let body = document.querySelector('body');
body.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
        if (e.key === '+') {
            scale += scaleStep;
        } else if (e.key === '-') {
            scale -= scaleStep;
        } else if (e.key === '0') {
            scale = scaleInit;
        }
        if (scale < scaleMin) {
            scale = scaleMin;
        }
        render();
    }
});

body.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    if (e.buttons == 4) {
        e.preventDefault();
        offset.x += e.movementX;
        offset.y += e.movementY;
        render();
    }
    transposedCursor.x = (cursor.x-offset.x-container.offsetWidth*(100-scale)/100/2)*100/scale;
    transposedCursor.y = (cursor.y-offset.y-container.offsetHeight*(100-scale)/100/2)*100/scale;
    HUD.innerHTML = `cursor: pos(${cursor.x}, ${cursor.y})<br />transposed cursor: pos(${transposedCursor.x}, ${transposedCursor.y})<br />container: pos(${offset.x}, ${offset.y}, ${offset.z}), ${container.offsetWidth}, ${container.offsetHeight} ${scale}%`;
});

let frame = document.querySelector('.frame');
let container = document.querySelector('.container');
frame.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
        let scaleTemp = scale;
        if (e.deltaY > 0) {
            scale -= scaleStep;
        } else {
            scale += scaleStep;
        }
        if (scale < scaleMin) {
            scale = scaleMin;
        }
        let scaleDelta = scale - scaleTemp;
        // Fixed transposed cursor position
        offset.x += ((offset.x - cursor.x) * scaleDelta / 100 + container.offsetWidth * scaleDelta / 100 / 2);
        offset.y += ((offset.y - cursor.y) * scaleDelta / 100 + container.offsetHeight * scaleDelta / 100 / 2);
        render();
    } else {
        offset.x -= e.deltaX;
        offset.y -= e.deltaY;
        render();
    }
    HUD.innerHTML = `cursor: pos(${cursor.x}, ${cursor.y})<br />transposed cursor: pos(${(cursor.x-offset.x-container.offsetWidth*(100-scale)/100/2)*100/scale}, ${(cursor.y-offset.y-container.offsetHeight*(100-scale)/100/2)*100/scale})<br />container: pos(${offset.x}, ${offset.y}, ${offset.z}), ${container.offsetWidth}, ${container.offsetHeight} ${scale}%`;
});

let square = document.querySelector('.square');
square.addEventListener('click', () => {
    scale = scaleInit;
    offset.x = 0;
    offset.y = 0;
    render(); 
});

const HUD = document.querySelector('.hud');
function render() {
    container.style.transform = `perspective(500px) translate3d(${offset.x}px, ${offset.y}px, ${offset.z}px) scale(${scale/100})`;
}