//import readlineSync from 'readline-sync';
import * as readlineSync from "readline-sync"; // formato typscrypt
import { iJuegoDeCasino } from "./iJuegoDeCasino";
// import { JuegoDeCasino } from "./iJuegoDeCasino";
// import { Blackjack } from "./blackJack";
// import { Ruleta } from "./ruleta";
import { Tragamonedas } from "./tragamonedas";
//-----------------------------------------------------------------------------
export class Casino {
    private nombre: string;
    private direccion: string;
    private localidad: string;
    private juegos: iJuegoDeCasino[];
    //-------------------------------------------------------------------------
    constructor(nombre: string, direccion: string, localidad: string, juegos: iJuegoDeCasino[]) {
        this.nombre = nombre
        this.direccion = direccion
        this.localidad = localidad
        this.juegos = [new Tragamonedas(2, 1000)]; //juegos;

        // casino.agregarJuego(new BlackJack(1, 100, 10))
    }
    //-------------------------------------------------------------------------
    // public getNombre(): string { return this.nombre }
    // public setNombre(pnombre: string): void { this.nombre = pnombre }
    // public getDirecion(): string { return this.direccion }
    // public setDireccion(pdireccion: string): void { this.direccion = pdireccion }
    // public getLocalidad(): string { return this.localidad }
    // public setLocalidad(plocalidad: string): void { this.localidad = plocalidad }
    //-------------------------------------------------------------------------
    public agregarJuego(juego: iJuegoDeCasino): void { this.juegos.push(juego) }
    public Jugar(/* juego: JuegoDeCasino */): void {
        console.log(`=`.repeat(80));
        console.log("Bienvenido al casino.....");
        console.log(`-`.repeat(80));
//        console.log(` "Jugar es perju......"`.padEnd(80)); // TODO ver como se centra.
        console.log("JUGAR ES PERJUDICIAL PARA LA SALUD...........");
        // console.log("para comenzar a jugar ingrese su nombre:");
        // console.log("Ingrese el monto de dinero para hacer apuestas. (el monto minimo depende de la apuesta.)");
        // console.log("Si el monto elegido es menor al requerido para el juego elegido  se le pedira que ingrese");
        // console.log("mas dinero.");
        // console.log("dar a elegir el juego");
        // console.log("const ReadlineSync = require('readline-sync');");

        let evento: number = 0, datos: string[];
        do {
            console.log(`-`.repeat(80));
            evento = Number(readlineSync.question(
                `Juegos disponibles (ingrese el nro correspondiente): 
                1:  Tragamonedas (Modalidad Basica).
                2:  Tragamonedas (Modalidad Extendida).
                3:  Ruleta.
                4:  BlackJack.
                5:  Dados.
                6:  Consultar dinero Disponible.
                (ENTER): salir
                : `));
            switch (evento) {
                case 0: // (ENTER)
                    break;
                case 1: case 2: case 3: case 4: case 5:
                    console.clear();
                    this.juegos[evento-1].jugar()
                    break;
                // case 6:
                //     console.log(`dinero disponible  ${this.dineroDisponible}`);
                default:
                    console.log(`Opcion incorrcta. vuelva a intentarlo.`);
                // break;
            }
            // if (evento > 0 && evento <=6) solitarDatos(evento);
            // if (evento > 0 && evento < 6) this.juegos[evento].jugar()
            // if (evento = 6) console.log(`dinero disponible  ${dinerooooo}`);
        } while (evento !== 0)
    }
}