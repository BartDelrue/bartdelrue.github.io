export default class BaseShape {
    get uid() {
        return this._uid;
    }

    set uid(value) {
        this._uid = value;
    }

    set color(value) {
        this._color = value;
        this.draw();
    }

    get color() {
        return this._color;
    }

    set blur(value) {
        this._blur = value;
        this.draw();
    }

    get blur() {
        return this._blur;
    }

    set size(value) {
        this._size = value;
        this.draw();
    }

    get size() {
        return this._size;
    }

    set alpha(value) {
        this._alpha = value;
        this.draw();
    }

    get alpha() {
        return this._alpha;
    }

    constructor(uid, {
        alpha = 30,
        size = 50,
        angle = 0,
        blur = 0,
        color = '#000000',
    } = {}, created, updated, remove) {
        if (this.constructor === BaseShape) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this._alpha = alpha;
        this._size = size;
        this._blur = blur;
        this._color = color;
        this._uid = uid;
        this.created = created;
        this.updated = updated;
        this.remove = remove;
    }

    _makeControls() {
        throw new Error("Method '_makecontrols()' must be implemented.");
    };

    draw() {
        throw new Error("Method 'draw()' must be implemented.");
    }
}
