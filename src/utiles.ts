export const color: { [key: string]: string } = {
    red: "\u001b[1;31m", redBackGround: "\u001b[1;41m",
    green: "\u001b[1;32m", greenBackGround: "\u001b[1;42m",
    yellow: "\u001b[1;33m", yellowBackGround: "\u001b[1;43m",
    blue: "\u001b[1;34m", blueBackGround: "\u001b[1;44m",
    purple: "\u001b[1;35m", purpleBackGround: "\u001b[1;45m",
    cyan: "\u001b[1;36m", cyanBackGround: "\u001b[1;46m",
    reset: "\u001b[0m "
}
//---------------------------------------------------------------------------
export const emojis: { [key: string]: string } = {
    happy: "😁", sad: "😢", fingerCross: "🤞", luck: "🍀", adult: "🔞", palanca: "📍",
    chears: "🥂", award: "🏆", money: "💲", error: "❗", question: "❓", warn: "🔔"
} //🎲♠♣♥♦🏆💎🎴
//---------------------------------------------------------------------------
export const centrar = (str: string, length: number = 80, char: string = ' ') =>
    str.padStart((str.length + length) / 2, char).padEnd(length, char);
//---------------------------------------------------------------------------
export function formatoDinero(dinero: number): string {
    return emojis.money + " " + new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(dinero);
 // return emojis.money + " " + new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency', maximumFractionDigits: 2 }).format(dinero);
 // return new Intl.NumberFormat("es-AR", { currency: 'ARS', style: "currency", maximumFractionDigits: 2 }).format(dinero);
}
//---------------------------------------------------------------------------
export function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);        // max = Math.floor(max);
    return Math.floor(Math.random() * (Math.floor(max) - min + 1) + min);
}