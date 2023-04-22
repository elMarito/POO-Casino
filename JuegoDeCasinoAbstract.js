"use strict";
exports.__esModule = true;
exports.JuegoDeCasino = void 0;
var readline_sync_1 = require("readline-sync");
//=============================================================================
var JuegoDeCasino /* implements iJuegoDeCasino */ = /** @class */ (function () {
    //---------------------------------------------------------------------------
    function JuegoDeCasino(apuestaMinima, apuestaMaxima) {
        //---------------------------------------------------------------------------
        // Metodos auxiliares.-------------------------------------------------------
        // public name(str: string, length: number, char: string = ' '):string {
        //   return str.padStart((str.length + length) / 2, char).padEnd(length, char);
        // }
        this.centrar = function (str, length, char) {
            if (char === void 0) { char = ' '; }
            return str.padStart((str.length + length) / 2, char).padEnd(length, char);
        };
        this.nombre = "";
        this.apuestaMinima = apuestaMinima;
        this.apuestaMaxima = apuestaMaxima;
        this.dineroDisponible = 0;
        this.dineroApostado = 0;
        this.emojis = {
            happy: "😁", sad: "😢", fingerCross: "🤞", luck: "🍀", money: "💲",
            chears: "🥂", award: "🏆", error: "❗", question: "❓", warn: "🔔"
        }; //🎲♠♣♥♦🎴💎
    }
    //---------------------------------------------------------------------------
    // Metodos de la interfaz.---------------------------------------------------   
    JuegoDeCasino.prototype.getNombre = function () { return this.nombre; };
    // public getApuestaMinima(): number { return this.apuestaMinima; }
    // public getApuestaMaxima(): number { return this.apuestaMaxima; }
    // public getDineroDisponible(): number { return this.dineroDisponible; }
    // public getDineroApostado(): number { return this.dineroApostado; }
    //---------------------------------------------------------------------------
    JuegoDeCasino.prototype.jugar = function () {
        this.presentarJuego();
        // this.inicializarJuego();
        try {
            this.solicitarFondos();
            this.iniciarJuego();
            // this.chequearResultado();
            // this.pagarApuesta();
            return;
        }
        catch (error) { // result = error.message; // error under useUnknownInCatchVariables 
            console.clear();
            if (error instanceof Error) {
                console.log(error.message);
            }
            else if (typeof error === "string") {
                console.log(error);
            }
        }
        finally {
            console.log("Ud. Recibe: ", this.dineroDisponible);
            this.dineroDisponible = 0;
        }
    };
    //---------------------------------------------------------------------------
    JuegoDeCasino.prototype.solicitarFondos = function () {
        var dinero = 0;
        do {
            console.log("-".repeat(80)); // 💲
            console.log(this.emojis.error, "Por favor ingrese la candidad de dinero para Jugar : \n       (Apuesta minima: ".concat(this.formatoDinero(this.apuestaMinima), ", Maxima: ").concat(this.formatoDinero(this.apuestaMaxima), ").\n       (ENTER): para cancelar y abandonar el juego."));
            dinero = Number(readline_sync_1["default"].question("Fondos: "));
            if (dinero === 0)
                throw new Error("Operacion cancelada. Ud. abandono el Juego.");
            // if (dinero > 0) apuestaEsValida(dinero);
        } while (!this.apuestaEsValida(dinero));
        // si cancela la apuesta o si no dispone de dinero tirar error
        this.dineroDisponible = dinero;
    };
    // protected abstract chequearResultado(): void ; //############################
    //---------------------------------------------------------------------------
    JuegoDeCasino.prototype.pagarApuesta = function (ganancia) {
        console.log(this.emojis.happy, this.emojis.award, " \u00A1FELICIDADES! Ganaste \uD83E\uDD42 \uD83D\uDCB2 ".concat(ganancia, " "), this.emojis.money);
        this.dineroDisponible += ganancia;
    };
    JuegoDeCasino.prototype.descontarApuestaPerdida = function () {
        console.log(this.emojis.sad, " Lo siento pero perdiste, inténtalo de nuevo.");
        // mensaje: 2 Mala Suerte!. Volver a intentarlo ?
        this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
        // console.log(`-`.repeat(80));
        // let dinero = Number(readlineSync.question(
        //   `Ud. dispone de $ ${this.dineroDisponible} para apostar. 
        //   Ingrese la cantidad destinada a este giro.
        //   Al presionar (ENTER) se accionara el tragamonedas.
        //   (si no ingresa un monto al presionar (ENTER) abandonara el juego.)
        //   : `));
        // if (dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
    };
    //---------------------------------------------------------------------------
    // Metodos propios.----------------------------------------------------------
    JuegoDeCasino.prototype.apuestaEsValida = function (dinero, max) {
        if (max === undefined)
            max = this.apuestaMaxima;
        if (dinero >= this.apuestaMinima && dinero <= max)
            return true;
        // throw new Error("Operacion cancelada. Ud. abandono el Juego.");
        console.log(this.emojis.error.repeat(80));
        console.error(this.emojis.error, "ERROR! Apuesta invalida! la apuesta ingresada esta fuera de los limites.");
        console.log(this.emojis.error.repeat(80));
        //    console.log(`!`.repeat(80));
        return false;
    };
    //---------------------------------------------------------------------------
    JuegoDeCasino.prototype.formatoDinero = function (dinero) {
        return this.emojis.money + " " + new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(dinero);
        // return this.emojis.money +" "+ new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency', maximumFractionDigits: 2 }).format(dinero);
        //  return new Intl.NumberFormat("es-AR", { currency: "$", style: "currency", maximumFractionDigits: 2 }).format(dinero);
    };
    //---------------------------------------------------------------------------
    JuegoDeCasino.prototype.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        // max = Math.floor(max);
        return Math.floor(Math.random() * (Math.floor(max) - min + 1) + min);
    };
    return JuegoDeCasino;
}());
exports.JuegoDeCasino = JuegoDeCasino;
//-----------------------------------------------------------------------------
