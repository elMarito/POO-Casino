// import * as ascii_text_generator from 'ascii-text-generator';
const ascii_text_generator = require('ascii-text-generator');
import readlineSync from 'readline-sync';
// import * as readlineSync from "readline-sync"; // formato typscrypt
import { Poker } from "./poker";
import { Ruleta } from "./ruleta";
// import { Tragamonedas } from "./tragamonedas";
import { TragamonedasClasico } from './TragamonedasClasico';
import { TragamonedasMultilinea } from './TragamonedasMultilinea';

// import { JuegoDeCasino } from "./JuegoDeCasinoAbstract";
import { Jugador } from "./jugador";
//-----------------------------------------------------------------------------
export class Casino {
    private nombre: string;
    private direccion: string;
    private localidad: string;
    // private jugador: Jugador;

    // private juegos: JuegoDeCasino[];
    // private juegos: (TragamonedasClasico | TragamonedasMultilinea | Poker | Ruleta)[];
    // private juegos: (TragamonedasClasico | TragamonedasMultilinea | Poker )[];
    private tragamonedasClasico: TragamonedasClasico;
    private tragamonedasMultilinea: TragamonedasMultilinea;
    private poker: Poker;
    private ruleta: Ruleta;

    private fondos: number; //Caja, Ganancias, ?
    //-------------------------------------------------------------------------
    // constructor(nombre: string, direccion: string, localidad: string, juegos?: iJuegoDeCasino[]) {
    // constructor(nombre: string, direccion: string, localidad: string, juegos?: JuegoDeCasino[]) {
    constructor(nombre: string, direccion: string, localidad: string, fondos: number,
        tragamonedasClasico: TragamonedasClasico,
        tragamonedasMultilinea: TragamonedasMultilinea,
        poker: Poker,
        ruleta: Ruleta) {

        this.nombre = nombre
        this.direccion = direccion
        this.localidad = localidad
        this.fondos = fondos;   //Caja, Ganancias, ?
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
    //     // this.fondos += juego.cobrarApuesta()
    //     this.fondos += jugador.pagarApuesta()
    // }
    // public pagarApuesta(jugador: Jugador): void {
    //     this.fondos -= jugador.pagarApuesta()
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
    private chquearFondos(jugador: Jugador): void {
        // if (this.fondos === 0) console.log("Ud. aun no dispone de fondos para jugar. Les seran solicitados al ingresar a un juego.");
        if (jugador.getFondos() === 0) {
            console.log("Ud. aun no dispone de fondos para jugar. Les seran solicitados al ingresar a un juego.");
            console.log("si desea ingresarlos ahora presione si, de lo contrario le seran solicitados al ingresar a un juego.");
            let respuesta = readlineSync.keyInYN("Desea ingresar fondos ahora?");
            if (respuesta) this.solicitarFondos(jugador)
        }
        else console.log(`Ud. disponde de ${jugador.getFondos()} para jugar o cobrar.`);
        // else console.log(`Ud. disponde de $ ${this.fondos} para jugar o cobrar.`);

        //JuegoDeCasino.formatoDinero
    }
    //-------------------------------------------------------------------------
    private solicitarFondos(jugador: Jugador): void {
        let dinero: number = 0;
        console.log(`-`.repeat(80)); // 💲
        //   console.log(this.emojis.error, `Por favor ingrese la candidad de dinero para Jugar : 
        console.log(`Por favor ingrese la candidad de dinero para Jugar : 
           (si la cantidad ingresada no alcanza para el juego elegido, al ingresar se le solicitara mas dinero).
           (ENTER): para cancelar y abandonar el casino.`);
        dinero = Number(readlineSync.question("Fondos: "));
        // if (isNaN(dinero) || dinero <= 0) throw new Error("Operacion cancelada. Ud. abandono el casino.");

        // if (dinero > 0) apuestaEsValida(dinero);
        // si cancela la apuesta o si no dispone de dinero tirar error
        if (!isNaN(dinero) && dinero > 0) jugador.agregarFondos(dinero)
        // this.dineroDisponible = dinero;
    }
    //-------------------------------------------------------------------------
    public recibir(jugador: Jugador): void {
        this.presentarCasino();
        this.chquearFondos(jugador);
        console.clear();
        console.log(`Bienvenido ${jugador.getNombre()}!`);

        let opcionMenu: number = 0; //, datos: string[];
        do {
            // jugador.getFondos()
            // if (this.fondos === 0) console.log("Ud. aun no dispone de fondos para jugar. Les seran solicitados al ingresar a un juego.");
            // else console.log(`Ud. disponde de $ ${this.fondos} para jugar o cobrar.`);
            opcionMenu = this.elegirJuego();
            switch (opcionMenu) {
                case 0: // (ENTER)
                    console.clear();
                    console.log("Adios. Gracias por jugar con nosotros!");
                    break;
                // case 1: { this.tragamonedasClasico.jugar(jugador); break; }
                case 1: this.tragamonedasClasico.jugar(); break;
                case 2: this.tragamonedasMultilinea.jugar(); break;
                case 3: this.poker.jugar(); break;
                case 4: this.ruleta.jugar(); break;
                // case 1: case 2: case 3: case 4: case 5: {
                //     this.juegos[opcionMenu - 1].jugar()
                //     break;
                // }
                default: {
                    console.log(`❗ Opcion incorrecta. vuelva a intentarlo.`);
                    // let beep = require('beepbeep');
                    // beep(3, 500); // Beep!
                    // // beep([1000, 500, 2000])
                    // // 1 second delay...Beep! 0.5 second delay...Beep! 2 second delay...Beep!
                }
            }
            // if (evento > 0 && evento <=6) solitarDatos(evento);
            // if (evento > 0 && evento < 6) this.juegos[evento].jugar()
            // if (evento = 6) console.log(`dinero disponible  ${dinerooooo}`);
        } while (opcionMenu !== 0)
        //mensaje de despedida. fondos
    }
    //-------------------------------------------------------------------------
    private presentarCasino(): void {
        console.clear();
        // let text = "/*\n" + ascii_text_generator(`Bienvenido al casino "ROYALE"`, "2") + "\\n*/";
        console.log(`=`.repeat(80));
        // console.log("Bienvenido al casino.....");
        console.log(ascii_text_generator(`   Bienvenidos a`, "1"));
        console.log(ascii_text_generator(this.nombre.split(" ").join("\\n"), "2"));
        console.log("\n\n", `-`.repeat(80));
        //        console.log(` "Jugar es perju......"`.padEnd(80)); // TODO ver como se centra.        
        console.log("\n..................JUGAR ES PERJUDICIAL PARA LA SALUD...........\n\n");
        // console.log("Juegue con responsabilidad, si tiene problemas con el juego contacte a un profeesional.\n\n");
        // console.log("para comenzar a jugar ingrese su nombre:");
        // console.log("Ingrese el monto de dinero para hacer apuestas. (el monto minimo depende de la apuesta.)");
        // console.log("Si el monto elegido es menor al requerido para el juego elegido  se le pedira que ingrese");
        // console.log("mas dinero.");
        // console.log("dar a elegir el juego");
    }
    //-------------------------------------------------------------------------
    // private crearMenu(): string[] { return this.juegos.map(j => j.getNombre()); }
    //-------------------------------------------------------------------------
    private elegirJuego(): number {
        // 'Tragamonedas (Modalidad Basica)',
        // 'Tragamonedas (Modalidad Extendida)',
        let menu = [
            'Tragamonedas (Modalidad Clasica)',
            'Tragamonedas (Modalidad Multilinea)',
            'Poker',
            'Ruleta']
        // let menu: string[] = this.crearMenu();
        //---------------------------------------------------------------------
        console.log(`-`.repeat(80));
        // if (this.fondos === 0) console.log("Ud. aun no dispone de fondos para jugar. Les seran solicitados al ingresar a un juego.");
        // else console.log(`Ud. disponde de $ ${this.fondos} para jugar o cobrar.`);
        console.log(`Juegos disponibles (ingrese el nro correspondiente): `);
        // const readlineSync = require('readline-sync');
        // let evento: number = readlineSync.keyInSelect(menu, '¿ a cual desea jugar ?') + 1;
        // console.log({ evento });

        // evento = Number(readlineSync.keyIn(
        //     `Juegos disponibles (ingrese el nro correspondiente): 
        //     1:  Tragamonedas (Modalidad Basica).
        //     2:  Tragamonedas (Modalidad Extendida).
        //     3:  Ruleta.
        //     4:  BlackJack.
        //     5:  Dados.
        //     6:  Consultar dinero Disponible.
        //     0:  salir
        //     : `, { limit: '$<0-6>' }));

        // evento = Number(readlineSync.question(
        //     `Juegos disponibles (ingrese el nro correspondiente): 
        //     1:  Tragamonedas (Modalidad Basica).
        //     2:  Tragamonedas (Modalidad Extendida).
        //     3:  Ruleta.
        //     4:  BlackJack.
        //     5:  Dados.
        //     6:  Consultar dinero Disponible.
        //     (ENTER): salir
        //     : `));
        return readlineSync.keyInSelect(menu, '¿ a cual desea jugar ?') + 1;
    }
    //-------------------------------------------------------------------------
}