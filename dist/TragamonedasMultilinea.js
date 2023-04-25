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
exports.TragamonedasMultilinea = void 0;
// import * as readlineSync from "readline-sync"; // formato typscrypt
var tragamonedas_1 = require("./tragamonedas");
var utiles_1 = require("./utiles");
//-----------------------------------------------------------------------------
var TragamonedasMultilinea = /** @class */ (function (_super) {
    __extends(TragamonedasMultilinea, _super);
    function TragamonedasMultilinea(apuestaMinima, apuestaMaxima) {
        var _this = _super.call(this, apuestaMinima, apuestaMaxima, 5, ["🍓", "🍒", "🍉", "🍌", "🥝", "🍈", "🍍", "🍐", "🍑"]) || this;
        // "🍊",  "🍇",  "🍎",  "🍋",  "🍏" <-no usados porque son mas angostos en pixelees
        _this.nombre = "Tragamonedas (Multilinea) 9 simbolos";
        _this.comodines = [
            [_this.SIMBOLOS[0], "multiplicas x 2 las repeticiones. Ej. 🍓🍓->🍓🍓🍓🍓", (function (x) { return x * 2; })],
            [_this.SIMBOLOS[2], "resta 1 a las repeticiones. Ej. 🍓🍓🍓->🍓🍓", (function (x) { return x - 1; })],
            [_this.SIMBOLOS[3], "suma 1 a las repeticiones. Ej. 🍓🍓🍓->🍓🍓🍓🍓", (function (x) { return x + 1; })],
            [_this.SIMBOLOS[4], "multiplicas x 3 las repeticiones. Ej. 🍓🍓->🍓🍓🍓🍓🍓🍓", (function (x) { return x * 3; })]
        ];
        return _this;
    }
    //---------------------------------------------------------------------------
    TragamonedasMultilinea.prototype.presentarJuego = function () {
        console.log("=".repeat(80));
        console.log((0, utiles_1.centrar)("Ud a elegido el juego.....".concat(this.nombre.toLocaleUpperCase(), "...."))); // TO DO cambiar tipografia
        console.log((0, utiles_1.centrar)(this.SIMBOLOS.join("").repeat(this.carretes.length)));
        console.log("-".repeat(80));
        // se podrian poner las reglas en un TXT.         TO DO
        console.log(" Reglas: \n        para poder jugar Ud. debe ingresar un candidad de dinero de la cual dispondra\n        para hacer las apuestas. Una vez acreditado el dinero, se le solicitara que\n        apueste una parte o todo el dinero del que dispone para accionar el tragamonedas.\n        Si gana se le acreditara el monto correspondiente, de lo contrario se le \n        descontara de acuerdo al resultado obtenido. de acuerdo a la siguiente tabla."); // TODO
        console.log("-".repeat(80));
        console.log(" Opciones de Apuestas: \n    Probabilidades: 2 simbolos iguales: pierde la apuesta.\n    Probabilidades: 3 simbolos iguales: gana la apuesta x 3\n    Probabilidades: 4 simbolos iguales: gana la apuesta x 4\n    Probabilidades: 5 simbolos iguales: gana la apuesta x 7."); // TO DO  
        console.log("Comodines x simbolos repetidos");
        // Ejemplo: `Si se repite: 🍉 suma 1 a las repeticiones`);
        this.comodines.forEach(function (como) {
            return console.log("Si se repite: ".concat(como[0], " ").concat(como[1], " "));
        });
        console.log("-".repeat(80));
        console.log(" Las probabiliddes de ganar son 5 a 1."); // TO DO  
        console.log((0, utiles_1.centrar)(" Puede ganar hasta \uD83D\uDCB2\uD83D\uDCB2\uD83D\uDCB2     ".concat((0, utiles_1.formatoDinero)(this.apuestaMaxima * 3), "    \uD83D\uDCB2\uD83D\uDCB2\uD83D\uDCB2"), 80)); // TODO  
        console.log("=".repeat(80));
        1;
        console.log(" Uds. Dispone de ".concat((0, utiles_1.formatoDinero)(this.dineroDisponible), " para apostar."));
        console.log("-".repeat(80));
    };
    //---------------------------------------------------------------------------
    TragamonedasMultilinea.prototype.monstrarSimbolos2 = function (proceso, girando) {
        if (girando === void 0) { girando = " girando...: ".concat(this.emojis.fingerCross, " "); }
        process.stdout.write("\n                  ".concat(this.carretes.map(function (carr) { return "[" + carr.verSimbolo(carr.posicionSiguiente()) + "]"; }).join(""), " ").concat(proceso));
        process.stdout.write("\n                  ".concat(this.carretes.map(function (carr) { return "[" + carr.verSimbolo(carr.posicionSiguiente(carr.posicionSiguiente())) + "]"; }).join(""), " ").concat(proceso));
    };
    //---------------------------------------------------------------------------
    TragamonedasMultilinea.prototype.iniciarJuego = function () {
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
                this.monstrarSimbolos2(" --->  ");
                // readlineSync.keyInPause();
                this.chequearResultado();
            }
        } while (this.dineroDisponible > this.apuestaMinima);
    };
    //---------------------------------------------------------------------------
    TragamonedasMultilinea.prototype.contarRepetidos2 = function (carretes) {
        var resultados = []; //ejemplo [["z", 1], ["b", 44]]
        // Almaceno las opciones que salieron y cuantas veces en otro array.
        carretes.forEach(function (carr) {
            var salido = resultados.findIndex(function (resul) { return resul[0] === carr; });
            if (salido > -1) { // ya existe. entonces sumarle 1
                resultados[salido][1] = Number(resultados[salido][1]) + 1;
            }
            else { // sino existe. agregarlo
                resultados.push([carr, 1]);
            }
        });
        return resultados;
    };
    //---------------------------------------------------------------------------
    TragamonedasMultilinea.prototype.chequearResultado = function () {
        var _this = this;
        // creo un solo array con todos los simbolos.
        var simbolosSalidos = this.carretes.map(function (carr) { return carr.verSimbolo(); }).concat(this.carretes.map(function (carr) { return carr.verSimbolo(carr.posicionSiguiente()); }).concat(this.carretes.map(function (carr) { return carr.verSimbolo(carr.posicionSiguiente(carr.posicionSiguiente())); })));
        var resultados = this.contarRepetidos2(simbolosSalidos);
        resultados = resultados.filter(function (resul) { return resul[1] > 1; });
        //logica de premios
        resultados = resultados.map(function (x) {
            if (x[1] === 5)
                return [x[0], 7];
            else if (x[1] === 2)
                return [x[0], 1];
            else
                return x;
        });
        resultados = resultados.filter(function (resul) { return resul[1] > 1; });
        this.addComodines(resultados);
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
    TragamonedasMultilinea.prototype.addComodines = function (resultados) {
        var _this = this;
        resultados.forEach(function (resul) {
            var salido = _this.comodines.findIndex(function (como) { return como[0] === resul[0]; });
            if (salido > -1) { // Si existe. aplicar el comodin
                resul[1] = _this.comodines[salido][2](resul[1]);
            }
        });
    };
    return TragamonedasMultilinea;
}(tragamonedas_1.Tragamonedas));
exports.TragamonedasMultilinea = TragamonedasMultilinea;
