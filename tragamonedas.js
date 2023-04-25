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
var readline_sync_1 = require("readline-sync");
//=============================================================================
var Tragamonedas = /** @class */ (function (_super) {
    __extends(Tragamonedas, _super);
    // const SIMBOLOS: string[] =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    // const SIMBOLOS: string[] = ["🍎", "🍊", "🍇", "🍓", "🍒", "🍋"]; // 6
    // const SIMBOLOS: string[] = [ "🥝", "🍈", "🍉", "🍌", "🍍", "🍏", "🍐", "🍑"];    // "coco", "mango
    // const SIMBOLOS: string[] = [ "🍅", "🍆", "🌽", "🌶", "🍄", "🥑", "🥒", "🥔", "🥕"];
    // console.log(SIMBOLOS);
    //---------------------------------------------------------------------------
    function Tragamonedas(apuestaMinima, apuestaMaxima) {
        var _this = _super.call(this, apuestaMinima, apuestaMaxima) || this;
        // private emojis = {
        //   happy: "😁", sad: "😢", fingerCross: "🤞", luck: "🍀", palanca: "📍",
        //   chears: "🥂", award: "🏆", money: "💲", error: "❗", warn: "🔔",
        // }
        _this.SIMBOLOS = ["🍎", "🍊", "🍇", "🍓", "🍒", "🍋", "🍉", "🍌"]; //8
        _this.nombre = "Tragamonedas (Tradicional)";
        // this.apuestaMinima = apuestaMinima;
        // this.apuestaMaxima = apuestaMaxima;
        // this.dineroDisponible = 0;
        // this.dineroApostado = 0;
        _this.emojis.palanca = "📍"; //agrego simbolo a la lista base de emojis.
        var CANTIDAD_CARRETES = 3;
        // this.carretes = new Array(CANTIDAD_CARRETES).fill("."); //.map(() => this.generarSimboloAleatorio());
        var RETRASO = 8000;
        _this.carretes = [];
        for (var i = 0; i < CANTIDAD_CARRETES; i++) {
            // this.carretes.push(new Carrete(i * RETRASO
            _this.carretes.push(new Carrete(_this.getRandomIntInclusive(i * RETRASO, (i + 1) * RETRASO), 0, _this.reordenar(__spreadArray([], _this.SIMBOLOS, true))));
        }
        return _this;
        // this.carretes = this.carretes.map(() => this.generarSimboloAleatorio());
        // ideas de pago        // TODO
        // let coeficientes = [[1, 0], [2, 2], [3, 3]] // para 3 carretes
        // let coeficientes = [[1, 0], [2, 2], [3, 3], [4, 5], [5, 7]]// para 5 carretes
    }
    //---------------------------------------------------------------------------
    // Metodos de la interfaz.---------------------------------------------------   
    Tragamonedas.prototype.getNombre = function () { return this.nombre; };
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.jugar = function () {
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
    Tragamonedas.prototype.presentarJuego = function () {
        var centrar = function (str, length, char) {
            if (char === void 0) { char = ' '; }
            return str.padStart((str.length + length) / 2, char).padEnd(length, char);
        };
        console.clear();
        console.log("=".repeat(80));
        console.log(centrar("Ud a elegido el juego.....".concat(this.nombre.toLocaleUpperCase(), "...."), 80)); // TODO cambiar tipografia
        //    console.log(this.SIMBOLOS.join());
        console.log(centrar((["🍎", "🍊", "🍇", "🍓", "🍒", "🍋", "🍉", "🍌",
            "🥝", "🍈", "🍍", "🍏", "🍐", "🍑", "🍅", "🍆",
            "🌽", "🌶", "🍄", "🥑", "🥒", "🥔", "🥕"]).join(), 80));
        console.log("-".repeat(80));
        // se podrian poner las reglas en un TXT.         TODO
        console.log(" Reglas: \n    para poder jugar Ud. debe ingresar un candidad de dinero de la cual dispondra\n    para hacer las apuestas. Una vez acreditado el dinero, se le solicitara que\n    apueste una parte o todo el dinero del que dispone para accionar el tragamonedas.\n    Si gana se le acreditara el monto correspondiente, de lo contrario se le \n    descontara de acuerdo al resultado obtenido. de acuerdo a la siguiente tabla."); // TODO
        console.log("-".repeat(80));
        console.log(" Opciones de Apuestas: \n    Probabilidades: 0 simbolos iguales: pierde la apuesta.\n    Probabilidades: 2 simbolos iguales: salva la apuesta.\n    Probabilidades: 3 simbolos iguales: gana la apuesta x 3."); // TODO  
        console.log("-".repeat(80));
        //    console.log(` Las probabiliddes de ganar son     ${this.getProbabilidades()} a 1.`); // TODO  
        console.log(centrar(" Puede ganar hasta \uD83D\uDCB2\uD83D\uDCB2\uD83D\uDCB2     ".concat(this.formatoDinero(this.apuestaMaxima * 3), "    \uD83D\uDCB2\uD83D\uDCB2\uD83D\uDCB2"), 80)); // TODO  
        console.log("=".repeat(80));
        1;
        console.log(" Uds. Dispone de ".concat(this.formatoDinero(this.dineroDisponible), " para apostar."));
        console.log("-".repeat(80));
    };
    //---------------------------------------------------------------------------
    // private inicializarJuego(): void {
    //   // this.carretes.forEach(carrete => carrete = this.generarSimboloAleatorio())
    //   // this.carretes = [..."A", "B", "A"];
    //   //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //   // console.debug("inicializado: ", this.carretes);
    //   // this.monstrarSimbolos(" x");
    //   // this.carretes.forEach(car => console.log(car.verSimbolo()));
    //   // console.log()
    // }
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    // private solicitarFondos(): void {
    //   let dinero: number = 0;
    //   do {
    //     console.log(`-`.repeat(80)); // 💲
    //     console.log(`❗ Por favor ingrese la candidad de dinero para Jugar : 
    //     (Apuesta minima: ${this.formatoDinero(this.apuestaMinima)}, Maxima: ${this.formatoDinero(this.apuestaMaxima)}).
    //     (ENTER): para cancelar y abandonar el juego.`);
    //     dinero = Number(readlineSync.question("Fondos: "));
    //     if (dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
    //     // if (dinero > 0) apuestaEsValida(dinero);
    //   } while (!this.apuestaEsValida(dinero));
    //   // si cancela la apuesta o si no dispone de dinero tirar error
    //   this.dineroDisponible = dinero;
    // }
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    // la puse public porque esta protected en JuegoDeCasino sino seria private
    Tragamonedas.prototype.iniciarJuego = function () {
        // let continuar: boolean = true;
        var dinero = 0;
        do {
            // console.clear();
            console.log("-".repeat(80));
            this.monstrarSimbolos(this.emojis.palanca + "\n", "                ");
            dinero = this.solicitarCreditos(); //this.emojis.warn===🔔
            if (dinero === 0) /* continuar = false; */
                throw new Error("Operacion cancelada. Ud. abandono el Juego.");
            if (this.apuestaEsValida(dinero, this.dineroDisponible)) {
                this.dineroApostado = dinero;
                this.accionarPalanca();
                this.chequearResultado();
            }
        } while (this.dineroDisponible > this.apuestaMinima);
        // if (dinero > 0) apuestaEsValida(dinero, min, max);
        // } while (continuar);
        // mensaje: 1 QUE SUERTE!🏆 ud a ganado 💲 $ 99999999.
        // mensaje: 2 Mala Suerte!. Volver a intentarlo ?
    };
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.solicitarCreditos = function () {
        console.log("-".repeat(80));
        console.log("Ud. dispone de ".concat(this.formatoDinero(this.dineroDisponible), " para apostar. \n    Ingrese la cantidad destinada a este giro.\n    Al presionar (ENTER) se accionara ").concat(this.emojis.palanca, " el tragamonedas.\n    (si no ingresa un monto al presionar (ENTER) abandonara el juego.)"));
        var dinero = Number(readline_sync_1["default"].question("Apuesta: "));
        // TODO               verificar si pone letras
        return dinero;
    };
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.monstrarSimbolos = function (proceso, girando) {
        // console.table(this.carretes);
        // console.log("********* resultado:    ", this.carretes.map(carrete => `[${carrete}]`).join(" "));
        // console.log("********* resultado:    ", this.carretes.map(carr => `[${carr.verSimbolo()}]`).join(" "));
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // process.stdout.write(`\r girando...: 🤞  ${this.carretes.map(carr => carr.verSimbolo()).join(" ")} ${proceso}`);
        // this.emojis.fingerCross 🤞
        if (girando === void 0) { girando = " girando...: ".concat(this.emojis.fingerCross, " "); }
        process.stdout.write("\r".concat(girando, "  ").concat(this.carretes.map(function (carr) { return "[" + carr.verSimbolo() + "]"; }).join(""), " ").concat(proceso));
        // process.stdout.write(`\r girando...: 🤞  ${this.carretes.forEach(carr => { return ("[" + carr.verSimbolo() + "]") })} ${proceso}`);
    };
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.accionarPalanca = function () {
        // let fibo: { n1: number, n2: number } = { n1: 1, n2: 1 };
        // const next = (fibo: { n1: number, n2: number }) => {
        //   let sum: number = fibo.n1 + fibo.n2;
        //   fibo.n1 = fibo.n2;
        //   return fibo.n2 = sum;
        // };
        // let presets: string[][] = [
        //   ["🍎", "🍋", "🍎"],
        //   ["🍊", "🍎", "🍎"],
        //   ["🍇", "🍋", "🍋"],
        //   ["🍓", "🍎", "🍎"],
        //   ["🍒", "🍎", "🍎"],
        //   ["🍋", "🍌", "🍇"],
        //   ["🍉", "🍎", "🍎"],
        //   ["🍌", "🍌", "🍌"]]
        // Resetear Carretes
        this.carretes.forEach(function (carrete) { return carrete.resetearVelocidad(); });
        // this.carretes.forEach(carrete =>{carrete.setVelocidadInicial(0)})
        // girando....
        var proceso = { "-": "/", "/": "|", "|": "\\", "\\": "-" };
        var pp = proceso["-"];
        // let proceso: { [key: string]: string } = { "(  ": " _ ", " _ ": "  )", "  )": " ¯ ", " ¯ ": "(  " };
        // let pp: string = proceso[ "(  "];
        var VELOCIDAD_INICIAL = 100000;
        // for (let index = VELOCIDAD_INICIAL; index >= 0; index--) {//<-para girar alreves
        // let temporal:string;
        var velocidad = 0;
        var _loop_1 = function (index) {
            // temporal=index.toString().padStart(6)+" -> ";
            this_1.carretes.forEach(function (rod, i) {
                if (index === (rod.getRetraso() + rod.getVelocidad())) {
                    rod.girar();
                    rod.desacelerar(index + 1);
                }
                // if (index === (rod.getRetraso() + rod.getVelocidad())) { rod.girar(); rod.desacelerar(next(fibo)); }
                // if (index === rod.getVelocidad()) rod.desacelerar(10)
                // process.stdout.write(`\r 1:[ ${rod.verSimbolo()} ${rod.getRetraso()} ${rod.getVelocidad()} ]---`);
                // temporal += (`${i.toString().padStart(4)}:[ ${rod.verSimbolo()} ${rod.getRetraso()} ${rod.getVelocidad().toString().padStart(6)} ]---`);
            });
            if (index === velocidad + 1) {
                pp = proceso[pp];
                velocidad = velocidad + index;
            }
            // process.stdout.write(`\r ${temporal} ---`);
            this_1.monstrarSimbolos(pp); // this.monstrarSimbolos(index.toString());
        };
        var this_1 = this;
        for (var index = 0; index < VELOCIDAD_INICIAL; index++) {
            _loop_1(index);
        }
        this.monstrarSimbolos(" --->  ");
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // this.carretes.forEach(carrete => carrete = this.generarSimboloAleatorio());
    };
    //---------------------------------------------------------------------------
    Tragamonedas.prototype.chequearResultado = function () {
        // //quitar duplicados de un array
        // const unique = new Set(this.carretes.map(carr => carr.verSimbolo()))
        // switch (unique.size) {
        //   case 1: /* gano */        break;
        //   case 2: /* salvo */        break;
        //   case 3: /* perdio */        break;
        // }
        var _this = this;
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
            if (dineroGanado > this.dineroApostado)
                this.pagarApuesta(dineroGanado);
            else
                console.log(this.emojis.luck, " Pudo ser peor! salvo la apuesta.");
            // this.dineroDisponible += dineroGanado; //🍀
        }
        else {
            this.descontarApuestaPerdida();
            // this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
        }
    };
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    // private pagarApuesta(ganancia: number): void {
    //   console.log(this.emojis.happy, this.emojis.award, ` ¡FELICIDADES! Ganaste 🥂 💲 ${ganancia} `, this.emojis.money);
    //   this.dineroDisponible += ganancia;
    // }
    // private descontarApuestaPerdida(): void {
    //   console.log(this.emojis.sad, " Lo siento pero perdiste, inténtalo de nuevo.");
    //   // mensaje: 2 Mala Suerte!. Volver a intentarlo ?
    //   this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
    //   // console.log(`-`.repeat(80));
    //   // let dinero = Number(readlineSync.question(
    //   //   `Ud. dispone de $ ${this.dineroDisponible} para apostar. 
    //   //   Ingrese la cantidad destinada a este giro.
    //   //   Al presionar (ENTER) se accionara el tragamonedas.
    //   //   (si no ingresa un monto al presionar (ENTER) abandonara el juego.)
    //   //   : `));
    //   // if (dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
    // }
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    // borrar?
    Tragamonedas.prototype.generarSimboloAleatorio = function () {
        // const simbolos = ["A", "B", "C", "D", "E"];
        var simbolos = ["🍎", "🍊", "🍇", "🍓", "🍒", "🍋"];
        //     [ "🥝", "coco", "🍈", "🍉", "🍌", "🍍", "mango", "🍏", "🍐", "🍑"
        //     , "🍅", "🍆", "🌽", "🌶", "🍄", "🥑", "🥒", "🥬", "🥦", "🥔", "🧄", "🧅", "🥕"
        //----------------------------------------------------------------------------- 
        var indice = Math.floor(Math.random() * simbolos.length);
        // console.log({indice});    
        return simbolos[indice];
    };
    //---------------------------------------------------------------------------
    // Metodos propios.----------------------------------------------------------
    // private apuestaEsValida(dinero: number, max?: number): boolean {
    //   if (max === undefined) max = this.apuestaMaxima;
    //   if (dinero >= this.apuestaMinima && dinero <= max) return true;
    //   // throw new Error("Operacion cancelada. Ud. abandono el Juego.");
    //   console.log(this.emojis.error.repeat(80));
    //   console.error(this.emojis.error, "ERROR! Apuesta invalida! la apuesta ingresada esta fuera de los limites.");
    //   console.log(`!`.repeat(80));
    //   return false;
    // }
    //---------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
var Carrete = /** @class */ (function () {
    function Carrete(retraso, velocidad, simbolos) {
        this.simbolos = simbolos;
        this.posicion = 0; //random Math.random()*simbolos.lenght
        this.retraso = retraso;
        this.velocidad = velocidad; //0
    }
    Carrete.prototype.verSimbolo = function () { return this.simbolos[this.posicion]; };
    Carrete.prototype.getRetraso = function () { return this.retraso; };
    Carrete.prototype.getVelocidad = function () { return this.velocidad; };
    Carrete.prototype.desacelerar = function (puntos) { this.velocidad += puntos; };
    Carrete.prototype.resetearVelocidad = function () { this.velocidad = 0; /* this.VELOCIDAD_INICIAL */ }; //resetea velocidad.
    // public setGetVelocidad(velocidad: number): number { return this.velocidad = velocidad }
    Carrete.prototype.girar = function ( /* velocidad: number */) {
        // let pos: number = velocidad % this.simbolos.length;
        this.posicion = (this.posicion === this.simbolos.length - 1) ? 0 : this.posicion + 1;
    };
    return Carrete;
}());
