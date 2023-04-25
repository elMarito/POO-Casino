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
exports.Ruleta = void 0;
var readlineSync = require("readline-sync"); // formato typscrypt
var JuegoDeCasinoAbstract_1 = require("./JuegoDeCasinoAbstract");
var Ruleta = /** @class */ (function (_super) {
    __extends(Ruleta, _super);
    function Ruleta() {
        var _this = _super.call(this, 100, 5000) || this;
        _this.nombre = "Ruleta";
        return _this;
    }
    Ruleta.prototype.presentarJuego = function () {
        console.log("=".repeat(80));
        console.log("Usted a elegido el juego Ruleta, \"Mi casa mis reglas\"");
        console.log("-".repeat(80));
        console.log("Puede elegir un numero de 0 a 36 o un color entre el rojo y negro \n            hasta que la casa haga girar la bola.\n             \n             Si el jugador gana aumenta su dinero y si pierde se le resta.                         \n             Sus probabilidades de ganar son 1 en 36");
        console.log("-".repeat(80));
        console.log(" Uds. Dispone de $ ".concat(this.dineroDisponible.toLocaleString(), " para apostar."));
        console.log("=".repeat(80));
    };
    Ruleta.prototype.solicitarCreditos = function () {
        if (this.dineroDisponible < this.apuestaMinima) {
            console.log("No tienes suficientes créditos para iniciar el juego."); // Se muestra un mensaje si no hay suficientes créditos
            return 0; // Se devuelve 0 si no hay suficientes créditos
        }
        var respuesta = readlineSync.keyInYNStrict("Quiere que la ruleta gire?");
        if (respuesta)
            return this.apuestaMinima;
        else
            throw new Error("Usted Salio del juego.");
    };
    Ruleta.prototype.iniciarJuego = function () {
        var dinero = 0;
        do {
            console.log("-".repeat(80));
            dinero = this.solicitarCreditos();
            if (dinero === 0) /* continuar = false; */
                throw new Error("Operacion cancelada. Fondos insuficientes.");
            this.dineroApostado = dinero; // Se solicitan 100 créditos
            console.log("Girando ruleta...");
            // Generamos un número aleatorio entre 0 y 36 para determinar quién ganó
            var ganador = Math.floor(Math.random() * 2);
            if (ganador === 0) {
                console.log("¡Felicidades usted ganó!");
                var dineroGanado = this.dineroApostado * 2;
                this.pagarApuesta(dineroGanado);
            }
            else {
                this.descontarApuestaPerdida();
                console.log("¡Lo siento usted perdió!");
            }
            console.log(" Uds. Dispone de $ ".concat(this.dineroDisponible.toLocaleString(), " para apostar."));
        } while (this.dineroDisponible >= this.apuestaMinima);
    };
    return Ruleta;
}(JuegoDeCasinoAbstract_1.JuegoDeCasino));
exports.Ruleta = Ruleta;
;
