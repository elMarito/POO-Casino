"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Poker = void 0;
var readlineSync = require("readline-sync"); // formato typscrypt
var JuegoDeCasinoAbstract_1 = require("./JuegoDeCasinoAbstract");
var Poker = /** @class */ (function (_super) {
    __extends(Poker, _super);
    function Poker() {
        var _this = _super.call(this, 50, 50000) || this;
        _this.nombre = "Poker";
        return _this;
    }
    //---------------------------------------------------------------------------
    Poker.prototype.presentarJuego = function () {
        console.clear();
        console.log("=".repeat(80));
        console.log("Usted a elegido el juego Poker de la Casa, \"Mi casa mis reglas\"");
        console.log("-".repeat(80));
        console.log(" 1- El jugador y la banca reciben cartas.\n    2- No hay empates.\n    3- Si el jugador gana aumenta su dinero y si pierde se le resta.                         \n    4- Probabilidades: 0.7 la Banca y 0.5 el jugador\n    (El valor de apuesta en cada mano es $ ".concat(this.apuestaMinima, ")"));
        console.log("-".repeat(80));
        console.log(" Uds. Dispone de $ ".concat(this.dineroDisponible.toLocaleString(), " para apostar."));
        console.log("=".repeat(80));
    };
    //---------------------------------------------------------------------------
    Poker.prototype.solicitarCreditos = function () {
        if (this.dineroDisponible < this.apuestaMinima) {
            console.log("No tienes suficientes créditos para iniciar el juego."); // Se muestra un mensaje si no hay suficientes créditos
            return 0; // Se devuelve 0 si no hay suficientes créditos
        }
        var respuesta = readlineSync.keyInYNStrict("Valor unico de apuesta $ ".concat(this.apuestaMinima, ". Quiere jugar una Mano"));
        if (respuesta)
            return this.apuestaMinima;
        else
            throw new Error("Usted Salio del juego.");
    };
    //---------------------------------------------------------------------------
    Poker.prototype.iniciarJuego = function () {
        var dinero = 0;
        do {
            console.log("-".repeat(80));
            dinero = this.solicitarCreditos();
            if (dinero === 0) /* continuar = false; */
                throw new Error("Operacion cancelada. Fondos insuficientes.");
            this.dineroApostado = dinero;
            console.log("Repartiendo cartas...");
            // Generamos un número aleatorio entre 0 y 1 para determinar quién ganó
            var ganador = Math.floor(Math.random() * 2);
            if (ganador === 0) {
                console.log("¡El jugador 1 ganó!");
                var dineroGanado = this.dineroApostado * 2;
                this.pagarApuesta(dineroGanado);
            }
            else {
                this.descontarApuestaPerdida();
                console.log("¡La banca ganó!");
            }
            console.log(" Uds. Dispone de $ ".concat(this.dineroDisponible.toLocaleString(), " para apostar."));
        } while (this.dineroDisponible >= this.apuestaMinima);
    };
    return Poker;
}(JuegoDeCasinoAbstract_1.JuegoDeCasino));
exports.Poker = Poker;
