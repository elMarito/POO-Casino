//=============================================================================
import * as readlineSync from "readline-sync"; // formato typscrypt
import { Jugador } from "./jugador";
import { Casino } from "./casino";
import { Tragamonedas } from "./tragamonedas";
// import { JuegoDeCasino } from "./juegoDeCasino";
// import { Ruleta } from "./ruleta";
// import { BlackJack } from "./blackJack";
//-----------------------------------------------------------------------------
const casino = new Casino("Casino Argento", "algun lugar", "una localidad"
    , [new Tragamonedas(100, 10000)])

/* ,[new Tragamonedas(2, 1000)]
,[new Ruleta(2, 1000)]
,[new BlackJack(2, 1000)]
,[new Dados(2, 1000)])
casino.agregarJuego(new Tragamonedas(100, 10000))
casino.agregarJuego(new TragamonedasMultilinea(100, 10000))
casino.agregarJuego(new Ruleta(2,1000,5))
casino.agregarJuego(new BlackJack(1, 100, 10))
casino.agregarJuego(new Dados(1, 100, 10)) */

// console.log(casino)
// console.table(casino)
//-----------------------------------------------------------------------------
console.clear();
console.log(`-`.repeat(80)); //adult: "🔞",
console.log(`Ud. esta a punto de ingresar al "Casino" 
    pero antes debe responder la siguiente pregunta.`);

let respuesta: string = readlineSync.question("Ingrese su edad: ");
if (Number(respuesta)<18) { 
    console.log(`🔞 Lo sentimos, si no eres mayor de edad, no puedes jugar.`);
    process.abort;
}
const edad: number = Number(respuesta);

respuesta = readlineSync.question("Ingrese su nombre: ")
const nombre: string = respuesta;
let jugador: Jugador = new Jugador(nombre, edad, 0);

casino.ingresar(jugador);

//para jugar en el casino debe ser mayor de edad🔞. Por favor ingrese su edad:
//-----------------------------------------------------------------------------
// console.log(`Ud. esta a punto de ingresar al "Casino Argento" 
//     pero para hacerlo debe ser mayor de dad.`);
// let edad: string = readlineSync.question("Ingrese su edad:");
// if (Number(edad) >== 18) {
//-----------------------------------------------------------------------------

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