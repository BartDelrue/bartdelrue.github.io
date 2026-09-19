export function calcL(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255,
        g = parseInt(hex.slice(3, 5), 16) / 255,
        b = parseInt(hex.slice(5, 7), 16) / 255;

    const rg = r <= .03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
        gg = g <= .03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
        bg = b <= .03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return .2126 * rg + .7152 * gg + .0722 * bg;
}

export  function calcRatio(colorA, colorB) {
    const a = calcL(colorA), b = calcL(colorB);
    return a > b ? (a + .05) / (b + .05) : (b + .05) / (a + .05)
}
