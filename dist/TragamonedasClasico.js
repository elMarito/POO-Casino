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
exports.TragamonedasClasico = void 0;
var tragamonedas_1 = require("./tragamonedas");
var utiles_1 = require("./utiles");
//---------------------------------------------------------------------------
var TragamonedasClasico = /** @class */ (function (_super) {
    __extends(TragamonedasClasico, _super);
    function TragamonedasClasico(apuestaMinima, apuestaMaxima) {
        var _this = _super.call(this, apuestaMinima, apuestaMaxima, undefined, ["🍅", "🍆", "🌽", "🍄", "🥑", "🥔"]) || this;
        _this.nombre = "Tragamonedas (Clasico) 6 simbolos";
        _this.simbolosYapa = [_this.SIMBOLOS[0], _this.SIMBOLOS[2], _this.SIMBOLOS[4]];
        return _this;
    } // "🥒", "🥕", "🌶" <- eliminados porque son mas angostos.
    //---------------------------------------------------------------------------
    TragamonedasClasico.prototype.presentarJuego = function () {
        console.log("=".repeat(80));
        console.log((0, utiles_1.centrar)("Ud a elegido el juego.....".concat(this.nombre.toLocaleUpperCase(), "...."))); // TO DO cambiar tipografia
        console.log((0, utiles_1.centrar)(this.SIMBOLOS.join().repeat(this.carretes.length)));
        console.log("-".repeat(80));
        //  poner las reglas en un TXT.         TO DO
        console.log(" Reglas: \n        para poder jugar Ud. debe ingresar un candidad de dinero de la cual dispondra\n        para hacer las apuestas. Una vez acreditado el dinero, se le solicitara que\n        apueste una parte o todo el dinero del que dispone para accionar el tragamonedas.\n        Si gana se le acreditara el monto correspondiente, de lo contrario se le \n        descontara de acuerdo al resultado obtenido. de acuerdo a la siguiente tabla."); // TODO
        console.log("-".repeat(80));
        console.log(" Opciones de Apuestas: \n        Probabilidades: 0 simbolos iguales: pierde la apuesta.\n        Probabilidades: 2 simbolos iguales: salva la apuesta.\n        Probabilidades: 3 simbolos iguales: gana la apuesta x 3."); // TO DO  
        console.log(" Yapa: \n        Si el simbolo repetido triple es ".concat(this.simbolosYapa[0], " gana $ 100.\n        Si el simbolo repetido triple es ").concat(this.simbolosYapa[1], " gana $ 200.\n        Si el simbolo repetido triple es ").concat(this.simbolosYapa[2], " gana $ 300.")); // TO DO  
        console.log("-".repeat(80));
        //    console.log(` Las probabiliddes de ganar son     ${this.getProbabilidades()} a 1.`); // TO DO  
        console.log((0, utiles_1.centrar)(" Puede ganar hasta \uD83D\uDCB2\uD83D\uDCB2\uD83D\uDCB2     ".concat((0, utiles_1.formatoDinero)(this.apuestaMaxima * 3), "    \uD83D\uDCB2\uD83D\uDCB2\uD83D\uDCB2"), 80)); // TODO  
        console.log("=".repeat(80));
        1;
        console.log(" Uds. Dispone de ".concat((0, utiles_1.formatoDinero)(this.dineroDisponible), " para apostar."));
        console.log("-".repeat(80));
    };
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    // metodo sobreescrito
    TragamonedasClasico.prototype.chequearResultado = function () {
        // //quitar duplicados de un array
        // const unique = new Set(this.carretes.map(carr => carr.verSimbolo()))
        // switch (unique.size) {
        //   case 1: /* gano */        break;
        //   case 2: /* salvo */        break;
        //   case 3: /* perdio */        break;
        // }
        var _this = this;
        // let resultados: (string | number)[][] = []; //[["z", 1], ["b", 44]]
        var resultados = []; //[["z", 1], ["b", 44]]
        // Almaceno las opciones que salieron y cuantas veces en otro array.
        this.carretes.forEach(function (carr) {
            var salido = resultados.findIndex(function (resul) { return resul[0] === carr.verSimbolo(); });
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // let salido: number = resultados.findIndex(resul => resul[0] === carr);
            if (salido > -1) {
                // ya existe. entonces sumarle 1
                resultados[salido][1] = Number(resultados[salido][1]) + 1;
            }
            else { // sino existe. agregarlo
                resultados.push([carr.verSimbolo(), 1]);
                //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                // resultados.push([carr, 1])
            }
        });
        //  console.log({resultados}, `--- antes`);
        //logica de premios
        resultados = resultados.map(function (x) {
            if (x[1] === 1)
                return [x[0], 0];
            else if (x[1] === 2)
                return [x[0], 1];
            else
                return x;
        });
        // console.log({resultados}, `--- despues`);
        // calcular dinero ganado/perdido.
        var dineroGanado = resultados.reduce(function (sum, resul) {
            return (typeof resul[1] === "number") ? sum + (resul[1] * _this.dineroApostado) : sum;
        }, 0);
        //si gano dinero: pagar, sino desontar del disponible
        if (dineroGanado > 0) {
            if (dineroGanado > this.dineroApostado) {
                var yapaDinero = this.yapa(resultados[0][0]);
                dineroGanado += yapaDinero;
                this.pagarApuesta(dineroGanado);
                if (yapaDinero > 0)
                    console.log("y con yapa! ", resultados[0][0], yapaDinero);
            }
            else
                console.log(this.emojis.luck, " Pudo ser peor! salvo la apuesta.");
            // this.dineroDisponible += dineroGanado;
        }
        else {
            this.descontarApuestaPerdida();
            // this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
        }
    };
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    TragamonedasClasico.prototype.yapa = function (simbolo) {
        switch (simbolo) {
            case this.simbolosYapa[0]: return 100;
            case this.simbolosYapa[1]: return 200;
            case this.simbolosYapa[2]: return 300;
            default: return 0;
        }
    };
    return TragamonedasClasico;
}(tragamonedas_1.Tragamonedas));
exports.TragamonedasClasico = TragamonedasClasico;
