"use strict";
exports.__esModule = true;
var readlineSync = require("readline-sync"); // formato typscrypt
//=============================================================================
var jugador_1 = require("./jugador");
var casino_1 = require("./casino");
var poker_1 = require("./poker");
var ruleta_1 = require("./ruleta");
var TragamonedasClasico_1 = require("./TragamonedasClasico");
var TragamonedasMultilinea_1 = require("./TragamonedasMultilinea");
var utiles_1 = require("./utiles");
//-----------------------------------------------------------------------------
console.clear();
console.log("-".repeat(80));
console.log("Si desea ingresar al Casino debe ser mayor de edad.\n");
var respuesta = readlineSync.question("Ingrese su edad: ");
var edad = Number(respuesta);
// console.log(edad);
if (isNaN(edad) || edad < 18) {
    console.log("".concat(utiles_1.color.red).concat(utiles_1.emojis.edad, " Lo sentimos, si no eres mayor de edad, no puedes jugar."));
    // process.exit(0)  // para terminar el programa.
}
else {
    respuesta = readlineSync.question("Ingrese su nombre: ");
    var nombre = respuesta;
    //-----------------------------------------------------------------------------
    var jugador = new jugador_1.Jugador(nombre, edad, 0);
    //-----------------------------------------------------------------------------
    var casino = new casino_1.Casino("Casino Argento", "algun lugar", "una localidad", 10000000, new TragamonedasClasico_1.TragamonedasClasico(100, 10000), new TragamonedasMultilinea_1.TragamonedasMultilinea(100, 10000), new poker_1.Poker(), new ruleta_1.Ruleta());
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
