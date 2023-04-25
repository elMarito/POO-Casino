"use strict";
exports.__esModule = true;
exports.Casino = void 0;
// import * as ascii_text_generator from 'ascii-text-generator';
var ascii_text_generator = require('ascii-text-generator');
// import readlineSync from 'readline-sync';
var readlineSync = require("readline-sync"); // formato typscrypt
var utiles_1 = require("./utiles");
//-----------------------------------------------------------------------------
var Casino = /** @class */ (function () {
    //-------------------------------------------------------------------------
    // constructor(nombre: string, direccion: string, localidad: string, juegos?: iJuegoDeCasino[]) {
    // constructor(nombre: string, direccion: string, localidad: string, juegos?: JuegoDeCasino[]) {
    function Casino(nombre, direccion, localidad, fondos, tragamonedasClasico, tragamonedasMultilinea, poker, ruleta) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.localidad = localidad;
        this.banca = fondos; //Caja, Ganancias, ?
        this.tragamonedasClasico = tragamonedasClasico;
        this.tragamonedasMultilinea = tragamonedasMultilinea;
        this.poker = poker;
        this.ruleta = ruleta;
        /* this.jugador = [];
        if (juegos !== undefined) this.juegos = juegos
        else {
            this.juegos = [];
            this.juegos.push(new TragamonedasClasico(2, 1000))
            this.juegos.push(new TragamonedasMultilinea(2, 1000))
            this.juegos.push(new Poker())
            this.juegos.push(new Ruleta(2, 1000))
        } */
        // casino.agregarJuego(new BlackJack(1, 100, 10))
    }
    // public recibir(jugador: Jugador):void {
    //     // this.jugador = jugador;
    //     // this.jugador.push(jugador);
    //     this.Jugar(jugador);
    //     // this.jugador.pop();
    //     // this.jugador = undefined;
    // }
    //-------------------------------------------------------------------------
    // public cobrarApuesta(jugador: Jugador, juego: (TragamonedasClasico | TragamonedasMultilinea | Poker)): void {
    //     // this.banca += juego.cobrarApuesta()
    //     this.banca += jugador.pagarApuesta()
    // }
    // public pagarApuesta(jugador: Jugador): void {
    //     this.banca -= jugador.pagarApuesta()
    // }
    //-------------------------------------------------------------------------
    // public getNombre(): string { return this.nombre }
    // public setNombre(pnombre: string): void { this.nombre = pnombre }
    // public getDirecion(): string { return this.direccion }
    // public setDireccion(pdireccion: string): void { this.direccion = pdireccion }
    // public getLocalidad(): string { return this.localidad }
    // public setLocalidad(plocalidad: string): void { this.localidad = plocalidad }
    //-------------------------------------------------------------------------
    // public agregarJuego(juego: iJuegoDeCasino): void { this.juegos.push(juego) }
    // public agregarJuego(juego: JuegoDeCasino): void { this.juegos.push(juego) }
    // public agregarJuego(juego: (TragamonedasClasico | TragamonedasMultilinea | Poker | Ruleta)): void { this.juegos.push(juego) }
    // public agregarJuego(juego: (TragamonedasClasico | TragamonedasMultilinea | Poker )): void { this.juegos.push(juego) }
    //-------------------------------------------------------------------------
    Casino.prototype.chequearFondos = function (jugador) {
        // if (this.fondos === 0) console.log("Ud. aun no dispone de fondos para jugar. Les seran solicitados al ingresar a un juego.");
        console.log(utiles_1.color.cyan);
        if (jugador.getFondos() === 0) {
            console.log("Ud. aun no dispone de fondos para jugar.");
            console.log("Si desea ingresarlos ahora presione si, de lo contrario le seran solicitados al ingresar a un juego.");
            var respuesta = readlineSync.keyInYN("Desea ingresar fondos ahora?");
            if (respuesta)
                this.solicitarFondos(jugador);
        }
        else
            console.log("Ud. disponde de ".concat(jugador.getFondos(), " para jugar o cobrar."));
        // else console.log(`Ud. disponde de $ ${this.fondos} para jugar o cobrar.`);
        //JuegoDeCasino.formatoDinero
    };
    //-------------------------------------------------------------------------
    Casino.prototype.solicitarFondos = function (jugador) {
        var dinero = 0;
        console.log("-".repeat(80)); // 💲
        //   console.log(this.emojis.error, `Por favor ingrese la candidad de dinero para Jugar : 
        console.log("Por favor ingrese la candidad de dinero para Jugar : \n           (si la cantidad ingresada no alcanza para el juego elegido, al ingresar se le solicitara mas dinero).\n           (ENTER): para cancelar y abandonar el casino.");
        dinero = Number(readlineSync.question("Fondos: "));
        // if (isNaN(dinero) || dinero <= 0) throw new Error("Operacion cancelada. Ud. abandono el casino.");
        // if (dinero > 0) apuestaEsValida(dinero);
        // si cancela la apuesta o si no dispone de dinero tirar error
        if (!isNaN(dinero) && dinero > 0)
            jugador.agregarFondos(dinero);
        // this.dineroDisponible = dinero;
    };
    //-------------------------------------------------------------------------
    Casino.prototype.recibir = function (jugador) {
        this.presentarCasino();
        this.chequearFondos(jugador);
        console.log(utiles_1.color.reset);
        console.clear();
        console.log("Bienvenido ".concat(jugador.getNombre(), "!"));
        var opcionMenu = 0;
        do {
            console.log(utiles_1.color.cyan);
            opcionMenu = this.elegirJuego();
            console.log(utiles_1.color.reset);
            switch (opcionMenu) {
                case 0: // (ENTER)
                    console.clear();
                    console.log("Adios. Gracias por jugar con nosotros!");
                    break;
                //WIP: case 1: { this.tragamonedasClasico.jugar(this, jugador); break; }
                case 1:
                    this.tragamonedasClasico.jugar();
                    break;
                case 2:
                    this.tragamonedasMultilinea.jugar();
                    break;
                case 3:
                    this.poker.jugar();
                    break;
                case 4:
                    this.ruleta.jugar();
                    break;
                default: {
                    console.log(utiles_1.color.red);
                    console.log("\u2757 Opcion incorrecta. vuelva a intentarlo.");
                    console.log(utiles_1.color.cyan);
                }
            }
        } while (opcionMenu !== 0);
    };
    //-------------------------------------------------------------------------
    Casino.prototype.presentarCasino = function () {
        console.clear();
        // let text = "/*\n" + ascii_text_generator(`Bienvenido al casino "ROYALE"`, "2") + "\\n*/";
        console.log(utiles_1.color.cyan);
        console.log("=".repeat(80));
        // console.log("Bienvenido al casino.....");
        console.log(ascii_text_generator("   Bienvenidos a", "1"));
        console.log(ascii_text_generator(this.nombre.split(" ").join("\\n"), "2"));
        console.log("\n\n", "-".repeat(80));
        //        console.log(` "Jugar es perju......"`.padEnd(80)); // TODO ver como se centra.        
        console.log(utiles_1.color.redBackGround);
        console.log("\n..................JUGAR ES PERJUDICIAL PARA LA SALUD...........\n\n");
        console.log(utiles_1.color.reset);
        // console.log("Juegue con responsabilidad, si tiene problemas con el juego contacte a un profeesional.\n\n");
        // console.log("para comenzar a jugar ingrese su nombre:");
        // console.log("Ingrese el monto de dinero para hacer apuestas. (el monto minimo depende de la apuesta.)");
        // console.log("Si el monto elegido es menor al requerido para el juego elegido  se le pedira que ingrese");
        // console.log("mas dinero.");
        // console.log("dar a elegir el juego");
    };
    //-------------------------------------------------------------------------
    Casino.prototype.crearMenu = function () {
        return [
            this.tragamonedasClasico.getNombre(),
            this.tragamonedasMultilinea.getNombre(),
            this.poker.getNombre(),
            this.ruleta.getNombre()
        ];
        // return this.juegos.map(j => j.getNombre()); 
    };
    //-------------------------------------------------------------------------
    Casino.prototype.elegirJuego = function () {
        // const menu = [
        //     'Tragamonedas (Modalidad Clasica)',
        //     'Tragamonedas (Modalidad Multilinea)',
        //     'Poker',
        //     'Ruleta']
        var menu = this.crearMenu();
        //---------------------------------------------------------------------
        console.log("-".repeat(80));
        console.log("Juegos disponibles (ingrese el nro correspondiente): ");
        return readlineSync.keyInSelect(menu, 'A cual desea jugar ?') + 1;
    };
    return Casino;
}());
exports.Casino = Casino;
