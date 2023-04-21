import * as readlineSync from "readline-sync"; // formato typscrypt
//=============================================================================
import { Jugador } from "./jugador";
import { Casino } from "./casino";
// import { JuegoDeCasino } from "./juegoDeCasino";
import { Poker } from "./poker";
import { Ruleta } from "./ruleta";
import { TragamonedasClasico } from "./TragamonedasClasico";
import { TragamonedasMultilinea } from "./TragamonedasMultilinea";
//-----------------------------------------------------------------------------
console.clear();
console.log(`-`.repeat(80)); //adult: "🔞",
console.log(`Ud. esta a punto de ingresar al "Casino" 
    pero antes debe responder la siguiente pregunta.`);

let respuesta: string = readlineSync.question("Ingrese su edad: ");
if (Number(respuesta) < 18) {
    console.log(`🔞 Lo sentimos, si no eres mayor de edad, no puedes jugar.`);
} else {
    console.log(` Lo sentimos, si no eres mayor de edad, no puedes jugar.`);
    const edad: number = Number(respuesta);

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

    // console.log(casino)
    // console.table(casino)
    // jugador.jugar();
    casino.recibir(jugador);
    // jugador.ingresarACasino(casino);
}

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