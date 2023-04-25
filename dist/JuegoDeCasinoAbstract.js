"use strict";
exports.__esModule = true;
exports.JuegoDeCasino = void 0;
var utiles_1 = require("./utiles");
var readlineSync = require("readline-sync"); // formato typscrypt
//=============================================================================
var JuegoDeCasino /* implements iJuegoDeCasino */ = /** @class */ (function () {
    //---------------------------------------------------------------------------
    function JuegoDeCasino(apuestaMinima, apuestaMaxima) {
        this.nombre = "";
        this.apuestaMinima = apuestaMinima;
        this.apuestaMaxima = apuestaMaxima;
        this.dineroDisponible = 0; //esto deberia estar en el jugador Fondos
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
    // public jugar(casino:Casino, jugador:Jugador): void {
    JuegoDeCasino.prototype.jugar = function () {
        console.clear();
        this.presentarJuego(); //jugador:Jugador
        try {
            this.solicitarFondos(); //jugador:Jugador
            console.clear();
            this.iniciarJuego(); //jugador:Jugador
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
            // en caso de error reintegrar la apuesta.
            // if (this.dineroApostado > 0) this.jugador.cobrarApuesta(this.dineroApostado);
        }
        finally {
            // console.log("Ud. Recibe: $", jugador.getFondos());
            console.log("Ud. Recibe: $", this.dineroDisponible);
            this.dineroDisponible = 0;
        }
    };
    //---------------------------------------------------------------------------
    // protected solicitarFondos(jugador: Jugador): void {
    JuegoDeCasino.prototype.solicitarFondos = function () {
        // if (jugador.getFondos() > this.apuestaMinima) return
        var dinero = 0;
        do {
            console.log("-".repeat(80));
            console.log(this.emojis.error, "Por favor ingrese la candidad de dinero para Jugar : \n       (Apuesta minima: ".concat((0, utiles_1.formatoDinero)(this.apuestaMinima), ", Maxima: ").concat((0, utiles_1.formatoDinero)(this.apuestaMaxima), ").\n       (ENTER): para cancelar y abandonar el juego."));
            dinero = Number(readlineSync.question("Fondos: "));
            if (isNaN(dinero) || dinero === 0)
                throw new Error("Operacion cancelada. Ud. abandono el Juego.");
            // if (dinero > 0) apuestaEsValida(dinero);
        } while (!this.apuestaEsValida(dinero));
        // si cancela la apuesta o si no dispone de dinero tirar error
        this.dineroDisponible = dinero;
        // this.dineroDisponible = jugador.agregarFondos(dinero)
        // jugador.agregarFondos(dinero)
    };
    // protected abstract chequearResultado(): void ; //############################
    //---------------------------------------------------------------------------
    // protected pagarApuesta(ganancia: number, jugador: Jugador): void {
    JuegoDeCasino.prototype.pagarApuesta = function (ganancia) {
        console.log(this.emojis.happy, this.emojis.award, " \u00A1FELICIDADES! Ganaste \uD83E\uDD42 ", this.emojis.money, ganancia, this.emojis.money);
        // jugador.pagarApuesta(ganancia)<-esta mal
        this.dineroDisponible += ganancia;
        // Casino.pagarApuesta(ganancia);
        // jugador.cobrarApuesta(ganancia);
    };
    // protected descontarApuestaPerdida(jugador: Jugador): void {
    JuegoDeCasino.prototype.descontarApuestaPerdida = function () {
        console.log(this.emojis.sad, " Lo siento pero perdiste, inténtalo de nuevo.");
        this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
        // casino.cobrarApuesta(this.dineroApostado);
        // this.dineroApostado=0;
    };
    //---------------------------------------------------------------------------
    // Metodos propios.----------------------------------------------------------
    JuegoDeCasino.prototype.apuestaEsValida = function (dinero, max) {
        if (max === undefined)
            max = this.apuestaMaxima;
        if (dinero >= this.apuestaMinima && dinero <= max)
            return true;
        // throw new Error("Operacion cancelada. Ud. abandono el Juego.");
        // console.log(this.emojis.error.repeat(40));
        console.error(this.emojis.error, "ERROR! Apuesta invalida! la apuesta ingresada esta fuera de los limites.");
        // console.log(this.emojis.error.repeat(40));
        //    console.log(`!`.repeat(80));
        return false;
    };
    return JuegoDeCasino;
}());
exports.JuegoDeCasino = JuegoDeCasino;
