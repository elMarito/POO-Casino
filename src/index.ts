import * as readlineSync from "readline-sync"; // formato typscrypt
//=============================================================================
import { Jugador } from "./jugador";
import { Casino } from "./casino";
import { Poker } from "./poker";
import { Ruleta } from "./ruleta";
import { TragamonedasClasico } from "./TragamonedasClasico";
import { TragamonedasMultilinea } from "./TragamonedasMultilinea";
import { color, emojis } from './utiles';
//-----------------------------------------------------------------------------
console.clear();
console.log(`-`.repeat(80));
console.log(`Si desea ingresar al Casino debe ser mayor de edad.\n`);

let respuesta: string = readlineSync.question("Ingrese su edad: ");
const edad: number = Number(respuesta);

if (isNaN(edad) || edad < 18) {
    console.log(`${color.red}${emojis.adult} Lo sentimos, si no eres mayor de edad, no puedes jugar.`);
    // process.exit(0)  // para terminar el programa.
} else {
    respuesta = readlineSync.question("Ingrese su nombre: ")
    const nombre: string = respuesta;
    //-----------------------------------------------------------------------------
    const jugador: Jugador = new Jugador(nombre, edad, 0);
    //-----------------------------------------------------------------------------
    const casino = new Casino("Casino Argento", "algun lugar", "una localidad"
        , 10000000,
        new TragamonedasClasico(100, 10000),
        new TragamonedasMultilinea(100, 10000),
        new Poker(),
        new Ruleta())

    casino.recibir(jugador);
}