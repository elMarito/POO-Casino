// export
//  abstract class util {
export const color: { [key: string]: string } = {
    red: "\u001b[1;31m",
    green: "\u001b[1;32m",
    yellow: "\u001b[1;33m",
    blue: "\u001b[1;34m",
    purple: "\u001b[1;35m",
    cyan: "\u001b[1;36m",
    redBackGround: "\u001b[1;41m",
    greenBackGround: "\u001b[1;42m",
    yellowBackGround: "\u001b[1;43m",
    blueBackGround: "\u001b[1;44m",
    purpleBackGround: "\u001b[1;45m",
    cyanBackGround: "\u001b[1;46m",
    reset: "\u001b[0m "
}
export const emojis: { [key: string]: string } = {
    happy: "😁", sad: "😢", fingerCross: "🤞", luck: "🍀", adult: "🔞", palanca: "📍",
    chears: "🥂", award: "🏆", money: "💲", error: "❗", question: "❓", warn: "🔔"
} //🎲♠♣♥♦🏆💎🎴
//---------------------------------------------------------------------------
// static centrar = (str: string, length: number, char: string = ' ') =>
export const centrar = (str: string, length: number = 80, char: string = ' ') =>
    str.padStart((str.length + length) / 2, char).padEnd(length, char);
//---------------------------------------------------------------------------
export function formatoDinero(dinero: number): string {
    // static formatoDinero(dinero: number): string {
    // 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲  this.emojis.money
    return emojis.money + " " + new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(dinero);
    // return this.emojis.money +" "+ new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency', maximumFractionDigits: 2 }).format(dinero);
    //  return new Intl.NumberFormat("es-AR", { currency: "$", style: "currency", maximumFractionDigits: 2 }).format(dinero);
}
//---------------------------------------------------------------------------
// static getIcon(x:emojis):string{
//     return this.emojis
// }
//---------------------------------------------------------------------------
export function getRandomIntInclusive(min: number, max: number): number {
    // static getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);        // max = Math.floor(max);
    return Math.floor(Math.random() * (Math.floor(max) - min + 1) + min);
}
// }

// let emooo1: string = util.centrar("hola", 10);
// let emooo2: string = util.formatoDinero(3333);
// let emooo3: number = util.getRandomIntInclusive(1, 10);
// let emooo4: string = util.emojis.adult;