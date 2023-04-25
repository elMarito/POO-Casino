"use strict";
exports.__esModule = true;
exports.getRandomIntInclusive = exports.formatoDinero = exports.centrar = exports.emojis = exports.color = void 0;
exports.color = {
    red: "\u001b[1;31m", redBackGround: "\u001b[1;41m",
    green: "\u001b[1;32m", greenBackGround: "\u001b[1;42m",
    yellow: "\u001b[1;33m", yellowBackGround: "\u001b[1;43m",
    blue: "\u001b[1;34m", blueBackGround: "\u001b[1;44m",
    purple: "\u001b[1;35m", purpleBackGround: "\u001b[1;45m",
    cyan: "\u001b[1;36m", cyanBackGround: "\u001b[1;46m",
    reset: "\u001b[0m "
};
//---------------------------------------------------------------------------
exports.emojis = {
    happy: "😁", sad: "😢", fingerCross: "🤞", luck: "🍀", adult: "🔞", palanca: "📍",
    chears: "🥂", award: "🏆", money: "💲", error: "❗", question: "❓", warn: "🔔"
}; //🎲♠♣♥♦🏆💎🎴
//---------------------------------------------------------------------------
var centrar = function (str, length, char) {
    if (length === void 0) { length = 80; }
    if (char === void 0) { char = ' '; }
    return str.padStart((str.length + length) / 2, char).padEnd(length, char);
};
exports.centrar = centrar;
//---------------------------------------------------------------------------
function formatoDinero(dinero) {
    return exports.emojis.money + " " + new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(dinero);
    // return emojis.money + " " + new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency', maximumFractionDigits: 2 }).format(dinero);
    // return new Intl.NumberFormat("es-AR", { currency: 'ARS', style: "currency", maximumFractionDigits: 2 }).format(dinero);
}
exports.formatoDinero = formatoDinero;
//---------------------------------------------------------------------------
// static getIcon(x:emojis):string{
//     return this.emojis
// }
//---------------------------------------------------------------------------
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); // max = Math.floor(max);
    return Math.floor(Math.random() * (Math.floor(max) - min + 1) + min);
}
exports.getRandomIntInclusive = getRandomIntInclusive;
// let emooo1: string = util.centrar("hola", 10);
// let emooo2: string = util.formatoDinero(3333);
// let emooo3: number = util.getRandomIntInclusive(1, 10);
// let emooo4: string = util.emojis.adult;
