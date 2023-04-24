import * as readlineSync from "readline-sync"; // formato typscrypt
//=============================================================================
import { Jugador } from "./jugador";
import { Casino } from "./casino";
import { Poker } from "./poker";
import { Ruleta } from "./ruleta";
import { TragamonedasClasico } from "./TragamonedasClasico";
import { TragamonedasMultilinea } from "./TragamonedasMultilinea";
import { color } from './utiles';
//-----------------------------------------------------------------------------
console.clear();
console.log(`-`.repeat(80));
console.log(`Si desea ingresar al Casino debe ser mayor de edad.\n`);

let respuesta: string = readlineSync.question("Ingrese su edad: ");
const edad: number = Number(respuesta);
// console.log(edad);
if (isNaN(edad) || edad < 18) {
    console.log(`${color.red}🔞 Lo sentimos, si no eres mayor de edad, no puedes jugar.`);
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
        new Ruleta(5555, "ruleta", 50, 50000, 1000, 0))

    /* ,[new TragamonedasClasico(100, 10000, 555555)]
    ,[new TragamonedasMultilinea(100, 10000)]
    ,[new Poker()]
    ,[new Ruleta(5555,"ruleta",50,50000,1000,0)])
    casino.agregarJuego(new TragamonedasClasico(100, 10000, 555555))
    casino.agregarJuego(new TragamonedasMultilinea(100, 10000))
    casino.agregarJuego(new Poker())
    casino.agregarJuego(new Ruleta(5555,"ruleta",50,50000,1000,0))) */

    // jugador.jugar();
    casino.recibir(jugador);
    // jugador.ingresarACasino(casino);
}

// respuesta = readlineSync.question("¿ Es Ud. mayor de edad ?: ");
// let respuesta:boolean = readlineSync.keyInYN("¿ Es Ud. mayor de edad ?: ");
// if (readlineSync.keyInYN("Es Ud. mayor de edad ?: ", { guide: true })) {
//     //    , { trueValue: ['si', 's'], falseValue: ['no', 'n'], guide: true })) {
//     // 'Y' key was pressed.
//     //ingrese su nombre:
//     console.clear();
//     casino.Jugar();
// } else {
//     // Another key was pressed.
//     console.clear();
//     console.log(`🔞 Lo sentimos, si no eres mayor de edad, no puedes jugar.`);
// }
//-----------------------------------------------------------------------------