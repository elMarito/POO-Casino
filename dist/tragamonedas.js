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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Tragamonedas = void 0;
var JuegoDeCasinoAbstract_1 = require("./JuegoDeCasinoAbstract");
var readlineSync = require("readline-sync"); // formato typscrypt
// import { Jugador } from "./jugador";
var utiles_1 = require("./utiles");
//=============================================================================
var Tragamonedas = /** @class */ (function (_super) {
    __extends(Tragamonedas, _super);
    //---------------------------------------------------------------------------
    function Tragamonedas(apuestaMinima, apuestaMaxima, cantidadCarretesDefault3, simbolosDefault8frutas) {
        if (cantidadCarretesDefault3 === void 0) { cantidadCarretesDefault3 = 3; }
        if (simbolosDefault8frutas === void 0) { simbolosDefault8frutas = ["🥝", "🍈", "🍉", "🍌", "🍍", "🍏", "🍐", "🍑"]; }
        var _this = _super.call(this, apuestaMinima, apuestaMaxima) || this;
        _this.nombre = "Tragamonedas";
        _this.SIMBOLOS = simbolosDefault8frutas;
        _this.emojis.palanca = "📍"; //agrego simbolo a la lista base de emojis.
        var RETRASO = 4000;
        _this.carretes = [];
        for (var i = 0; i < cantidadCarretesDefault3; i++) {
            _this.carretes.push(new Carrete((0, utiles_1.getRandomIntInclusive)(i * RETRASO, (i + 1) * RETRASO), 0, _this.reordenar(__spreadArray([], _this.SIMBOLOS, true))));
        }
        return _this;
    }
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.getNombre = function () { return this.nombre; };
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.presentarJuego = function () {
        console.log("=".repeat(80));
        console.log((0, utiles_1.centrar)("Ud a elegido el juego.....".concat(this.nombre.toLocaleUpperCase(), "...."))); // TO DO cambiar tipografia
        console.log((0, utiles_1.centrar)(this.SIMBOLOS.join()));
        console.log("-".repeat(80));
        // se podrian poner las reglas en un TXT.         TO DO
        console.log(" Reglas: \n    para poder jugar Ud. debe ingresar un candidad de dinero de la cual dispondra\n    para hacer las apuestas. Una vez acreditado el dinero, se le solicitara que\n    apueste una parte o todo el dinero del que dispone para accionar el tragamonedas.\n    Si gana se le acreditara el monto correspondiente, de lo contrario se le \n    descontara de acuerdo al resultado obtenido. de acuerdo a la siguiente tabla."); // TODO
        console.log("-".repeat(80));
        console.log(" Opciones de Apuestas: \n    Probabilidades: 0 simbolos iguales: pierde la apuesta.\n    Probabilidades: 2 simbolos iguales: salva la apuesta.\n    Probabilidades: 3 simbolos iguales: gana la apuesta x 3.");
        console.log("-".repeat(80));
        //    console.log(` Las probabiliddes de ganar son     ${this.getProbabilidades()} a 1.`); // TO DO  
        console.log((0, utiles_1.centrar)(" Puede ganar hasta \uD83D\uDCB2\uD83D\uDCB2\uD83D\uDCB2     ".concat((0, utiles_1.formatoDinero)(this.apuestaMaxima * 3), "    \uD83D\uDCB2\uD83D\uDCB2\uD83D\uDCB2"))); // TODO  
        console.log("=".repeat(80));
        1;
    };
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.iniciarJuego = function () {
        var dinero = 0;
        do {
            console.log("-".repeat(80));
            this.monstrarSimbolos(this.emojis.palanca + "\n", "                ");
            dinero = this.solicitarCreditos();
            if (dinero === 0)
                throw new Error("Operacion cancelada. Ud. abandono el Juego.");
            if (this.apuestaEsValida(dinero, this.dineroDisponible)) {
                this.dineroApostado = dinero;
                this.accionarPalanca();
                this.chequearResultado();
            }
        } while (this.dineroDisponible > this.apuestaMinima);
    };
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.solicitarCreditos = function () {
        console.log("-".repeat(80));
        console.log("Ud. dispone de ".concat(this.emojis.money), this.dineroDisponible, "para apostar.");
        console.log("Ingrese la cantidad destinada a este giro.\n    Al presionar (ENTER) se accionara ".concat(this.emojis.palanca, " el tragamonedas.\n    (si no ingresa un monto al presionar (ENTER) abandonara el juego.)"));
        var dinero = Number(readlineSync.question("Apuesta: "));
        return isNaN(dinero) ? 0 : dinero;
    };
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.monstrarSimbolos = function (proceso, girando) {
        if (girando === void 0) { girando = " girando...: ".concat(this.emojis.fingerCross, " "); }
        process.stdout.write("\r".concat(girando, "  ").concat(this.carretes.map(function (carr) { return "[" + carr.verSimbolo() + "]"; }).join(""), " ").concat(proceso));
    };
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.accionarPalanca = function () {
        // Resetear Carretes
        this.carretes.forEach(function (carrete) { return carrete.resetearVelocidad(); });
        // girando....
        var proceso = { "-": "/", "/": "|", "|": "\\", "\\": "-" };
        var procesando = proceso["-"];
        var VELOCIDAD_INICIAL = 100000;
        var velocidad = 0;
        var _loop_1 = function (index) {
            this_1.carretes.forEach(function (rod, i) {
                if (index === (rod.getRetraso() + rod.getVelocidad())) {
                    rod.girar();
                    rod.desacelerar(index + 1);
                }
            });
            procesando = proceso[procesando];
            if (index === velocidad + 1) {
                velocidad = velocidad + index;
            }
            this_1.monstrarSimbolos(procesando + " ".repeat(40));
        };
        var this_1 = this;
        for (var index = 0; index < VELOCIDAD_INICIAL; index++) {
            _loop_1(index);
        }
        this.monstrarSimbolos(" --->  ");
    };
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.chequearResultado = function () {
        var _this = this;
        var resultados = this.contarRepetidos(this.carretes);
        //logica de premios
        resultados = resultados.map(function (x) {
            if (x[1] === 1)
                return [x[0], 0];
            else if (x[1] === 2)
                return [x[0], 1];
            else
                return x;
        });
        // calcular dinero ganado/perdido.
        var dineroGanado = resultados.reduce(function (sum, resul) {
            return (typeof resul[1] === "number") ? sum + (resul[1] * _this.dineroApostado) : sum;
        }, 0);
        //si gano dinero: pagar, sino desontar del disponible
        if (dineroGanado > 0) {
            if (dineroGanado > this.dineroApostado)
                this.pagarApuesta(dineroGanado);
            else
                console.log(this.emojis.luck, " Pudo ser peor! salvo la apuesta.");
        }
        else {
            this.descontarApuestaPerdida();
        }
    };
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.contarRepetidos = function (carretes) {
        var resultados = []; //ejemplo [["z", 1], ["b", 44]]
        // Almaceno las opciones que salieron y cuantas veces en otro array.
        carretes.forEach(function (carr) {
            var salido = resultados.findIndex(function (resul) { return resul[0] === carr.verSimbolo(); });
            if (salido > -1) {
                // ya existe. entonces sumarle 1
                resultados[salido][1] = Number(resultados[salido][1]) + 1;
            }
            else { // sino existe. agregarlo
                resultados.push([carr.verSimbolo(), 1]);
            }
        });
        return resultados;
    };
    //---------------------------------------------------------------------------
    // Metodos propios.----------------------------------------------------------
    Tragamonedas.prototype.reordenar = function (simbolos) {
        var _a;
        for (var i = simbolos.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [simbolos[j], simbolos[i]], simbolos[i] = _a[0], simbolos[j] = _a[1]; // intercambiamos los elementos
        }
        return simbolos;
    };
    return Tragamonedas;
}(JuegoDeCasinoAbstract_1.JuegoDeCasino));
exports.Tragamonedas = Tragamonedas;
//=============================================================================
var Carrete = /** @class */ (function () {
    function Carrete(retraso, velocidad, simbolos) {
        this.simbolos = simbolos;
        this.posicion = 0;
        this.retraso = retraso;
        this.velocidad = velocidad;
    }
    Carrete.prototype.verSimbolo = function (posicionActual) {
        if (posicionActual === void 0) { posicionActual = this.posicion; }
        return this.simbolos[posicionActual];
    };
    Carrete.prototype.getRetraso = function () { return this.retraso; };
    Carrete.prototype.getVelocidad = function () { return this.velocidad; };
    Carrete.prototype.desacelerar = function (puntos) { this.velocidad += puntos; };
    Carrete.prototype.resetearVelocidad = function () { this.velocidad = 0; }; //resetea velocidad.
    Carrete.prototype.girar = function () {
        this.posicion = this.posicionSiguiente();
    };
    Carrete.prototype.posicionSiguiente = function (posicionActual) {
        if (posicionActual === void 0) { posicionActual = this.posicion; }
        return (posicionActual === this.simbolos.length - 1) ? 0 : posicionActual + 1;
    };
    return Carrete;
}());
