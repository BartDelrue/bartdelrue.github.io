'use strict'
import BaseShape from "./baseShape.mjs";

export default class Stripe extends BaseShape {
    get angle() {
        return this._angle;
    }

    set angle(value) {
        this._angle = value;
        this.draw();
    }

    constructor(uid, settings =
                    {angle: 0, alpha: 30, size: 50, blur: 0, color: '#000000'},
                created, updated, remove) {
        super(uid, settings, created, updated, remove);
        this._angle = settings.angle;
        this._makeControls(uid);
    }

    _makeControls(uid) {
        const c = document.createElement('fieldset');
        c.id = uid;
        c.className = 'circle';

        c.innerHTML =
            '<legend>stripe</legend>' +
            '<div>' +
            '<label for="size' + uid + '">size</label> ' +
            '<input type="range" id="size' + uid + '" class="size" value="' + this._size + '" max="100"> ' +
            '<label for="transp' + uid + '">opacity</label> ' +
            '<input type="range" id="transp' + uid + '" class="transp" value="' + this._alpha + '" max="255"> ' +
            '<label for="blur' + uid + '">blur</label> ' +
            '<input type="range" id="blur' + uid + '" class="blur" value="' + this.blur + '" max="100"> ' +
            '</div>' +
            '<div>' +
            '<label for="angle' + uid + '">Angle</label>' +
            '<input type="range" id="angle' + uid + '" class="angle" value="' + this._angle + '" min="-360" max="360"> ' +
            '<label for="color' + uid + '">color</label> ' +
            '<input type="color" class="color" id="color' + uid + '" value="' + this._color + '">' +
            '<div><button class="remove small" id="color' + uid + '">remove stripe</button></div>' +
            '</div>';

        this.created(c);
        this.draw();

        c.querySelector('.size').addEventListener('input', ({target: {value}}) => this.size = +value);
        c.querySelector('.angle').addEventListener('input', ({target: {value}}) => this.angle = +value);
        c.querySelector('.transp').addEventListener('input', ({target: {value}}) => this.alpha = +value);
        c.querySelector('.blur').addEventListener('input', ({target: {value}}) => this.blur = +value);
        c.querySelector('.color').addEventListener('change', ({target: {value}}) => this.color = value);
        c.querySelector('.remove').addEventListener('click', () => {
            this.remove(c);
            this.updated(this.uid);
        });
    };

    draw() {
        let bg = `linear-gradient(${this.angle}deg, ${this.color + ('0' + this.alpha.toString(16)).slice(-2)} ${this.size}%, transparent ${this.blur + this.size + 0.05}%)`;
        this.updated(this.uid, bg)
    }
}
