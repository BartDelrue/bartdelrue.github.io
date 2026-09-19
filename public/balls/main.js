import Ball from "./ball.js";
import hsl2rgb from "./hsl2rgb.js";
import {calcRatio} from "./contrast.js";
import Stripe from "./stripe.js";


const controls = document.querySelector('#controls');
const btnCircle = document.querySelector('#btnCircle');
const btnStripe = document.querySelector('#btnStripe');
const css = document.querySelector('#css');
const baseColorInput = document.querySelector('#base');
const bgCollection = {};
const root = document.querySelector(':root');

let count = 0;
let color = hsl2rgb(Math.floor(Math.random() * 360) + 1, 100, 15);
let background = 'none';

setBackground(color);

baseColorInput.value = color;
baseColorInput.addEventListener('change', ({target: {value}}) => setBackground(value));
btnCircle.addEventListener('click', () => {
    const uid = ++count;
    new Ball(uid,
        undefined,
        c => controls.appendChild(c),
        draw,
        c => controls.removeChild(c));
});
btnStripe.addEventListener('click', () => {
    const uid = ++count;
    new Stripe(uid,
        undefined,
        c => controls.appendChild(c),
        draw,
        c => controls.removeChild(c));
});

function setBackground(v) {
    color = v;
    root.style.setProperty('--bg-color', color)
    root.style.setProperty('--text-color', calcRatio(color, '#FFFFFF') < 4.5 ? '#000000' : '#FFFFFF');
    root.style.setProperty('--shadow-color', calcRatio(color, '#FFFFFF') < 4.5 ? '#FFFFFF' : '#000000');
    showValue()
}

function draw(uid, bg) {
    bg ? bgCollection[uid] = bg : delete bgCollection[uid]
    background = `${Object.values(bgCollection).toString()}`
    root.style.setProperty('--bg', "" + background);
    showValue()
}

function showValue() {
    css.value = `background-color: ${color};\nbackground-image: ${background};`;
}

for (let i = 3; i--;) {
    new Ball(++count,
        {
            x: (Math.floor(Math.random() * 200) + 1) - 100,
            y: (Math.floor(Math.random() * 200) + 1) - 100,
            alpha: Math.floor((Math.random() * 30)) + 20,
            size: (Math.floor(Math.random() * 20) + 41),
            blur: 0
        },
        c => controls.appendChild(c),
        draw,
        c => controls.removeChild(c))
}

new Stripe(++count,
    {
        x: (Math.floor(Math.random() * 200) + 1) - 100,
        y: (Math.floor(Math.random() * 200) + 1) - 100,
        alpha: Math.floor((Math.random() * 30)) + 20,
        size: (Math.floor(Math.random() * 20) + 41),
        blur: 0,
        angle: (Math.floor(Math.random() * 720) + 1) - 360
    },
    c => controls.appendChild(c),
    draw,
    c => controls.removeChild(c));

