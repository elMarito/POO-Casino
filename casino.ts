//import readlineSync from 'readline-sync';
import * as readlineSync from "readline-sync"; // formato typscrypt
import { iJuegoDeCasino } from "./iJuegoDeCasino";
// import { JuegoDeCasino } from "./iJuegoDeCasino";
// import { Blackjack } from "./blackJack";
// import { Ruleta } from "./ruleta";
// import { Dados } from "./dados";
import { Tragamonedas } from "./tragamonedas";
import { JuegoDeCasino } from "./JuegoDeCasinoAbstract";
import { Jugador } from "./jugador";
//-----------------------------------------------------------------------------
export class Casino {
    private nombre: string;
    private direccion: string;
    private localidad: string;
    private jugadores: Jugador[];
    // private juegos: iJuegoDeCasino[];
    private juegos: Tragamonedas[];
    // private juegos: {Tragamonedas | Tragamonedas | Poker | Ruleta}[];

    // private tragaMonedasClasico: Tragamonedas; //TragamonedasBasico
    // private tragaMonedasExtendido: Tragamonedas; //TragamonedasExtendido
    // private poker: Poker;
    // private ruleta: Ruleta;
    // private fondos: number;
    //-------------------------------------------------------------------------
    // constructor(nombre: string, direccion: string, localidad: string, juegos?: iJuegoDeCasino[]) {
    // constructor(nombre: string, direccion: string, localidad: string, juegos?: JuegoDeCasino[]) {
    constructor(nombre: string, direccion: string, localidad: string, juegos?: Tragamonedas[]) {
        this.nombre = nombre
        this.direccion = direccion
        this.localidad = localidad
        this.jugadores=[];
        if (juegos !== undefined) this.juegos = juegos
        else {
            this.juegos = [];
            // this.juegos = [new Tragamonedas(2, 1000)]; //juegos;
            this.juegos.push(new Tragamonedas(2, 1000))
            // this.juegos.push(new Tragamonedas(2, 1000))
            // this.juegos.push(new Ruleta(2, 1000))
            // this.juegos.push(new BlackJack(2, 1000))
            // this.juegos.push(new Dados(2, 1000))
        }
        // this.tragaMonedasClasico=tragaMonedasClasico;
        // this.tragaMonedasExtendido=tragaMonedasExtendido;
        // this.poker=poker;
        // this.ruleta=ruleta;

        // this.fondos = 0;
        // casino.agregarJuego(new BlackJack(1, 100, 10))
    }
    public ingresar(jugador: Jugador) {
        this.jugadores.push(jugador);
        this.Jugar(jugador);
        // this.jugador = jugador;
    }
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
    public agregarJuego(juego: Tragamonedas): void { this.juegos.push(juego) }
    //-------------------------------------------------------------------------
    public Jugar(jugador: Jugador /*, juego: JuegoDeCasino */): void {
        this.presentarCasino();
        console.log(`Bienvenido ${jugador.getNombre()}!`);

        let opcionMenu: number = 0; //, datos: string[];
        do {
            // if (this.fondos === 0) console.log("Ud. aun no dispone de fondos para jugar. Les seran solicitados al ingresar a un juego.");
            // else console.log(`Ud. disponde de $ ${this.fondos} para jugar o cobrar.`);
            opcionMenu = this.elegirJuego();
            switch (opcionMenu) {
                case 0: // (ENTER)
                    console.clear();
                    console.log("Adios. Gracias por jugar con nosotros!");
                    break;
                case 1: case 2: case 3: case 4: case 5: {
                    console.clear();
                    this.juegos[opcionMenu - 1].jugar()
                    break;
                }
                // case 6:
                //  {   console.log(`dinero disponible  ${this.dineroDisponible}`); }
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
    }
    //-------------------------------------------------------------------------
    private presentarCasino(): void {
        const ascii_text_generator = require('ascii-text-generator');
        console.clear();
        // let text = "/*\n" + ascii_text_generator(`Bienvenido al casino "ROYALE"`, "2") + "\\n*/";
        console.log(`=`.repeat(80));
        // console.log("Bienvenido al casino.....");
        console.log(ascii_text_generator(`      Bienvenidos a`, "1"));
        console.log(ascii_text_generator(this.nombre, "2"));
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
    private crearMenu(): string[] { return this.juegos.map(j => j.getNombre()); }
    //-------------------------------------------------------------------------
    private elegirJuego(): number {
        // let menu = ['Tragamonedas (Modalidad Basica)'
        // , 'Tragamonedas (Modalidad Extendida)'
        // , 'Ruleta', 'BlackJack', 'Dados']
        let menu: string[] = this.crearMenu();
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