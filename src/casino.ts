// import * as ascii_text_generator from 'ascii-text-generator'; // esta no funciona.
const ascii_text_generator = require('ascii-text-generator');
import * as readlineSync from "readline-sync"; // formato typscrypt
import { Poker } from "./poker";
import { Ruleta } from "./ruleta";
import { TragamonedasClasico } from './TragamonedasClasico';
import { TragamonedasMultilinea } from './TragamonedasMultilinea';
import { Jugador } from "./jugador";
import { color } from './utiles';
//-----------------------------------------------------------------------------
export class Casino {
  private nombre: string;
  private direccion: string;
  private localidad: string;
  private tragamonedasClasico: TragamonedasClasico;
  private tragamonedasMultilinea: TragamonedasMultilinea;
  private poker: Poker;
  private ruleta: Ruleta;
  private banca: number; //Caja, Ganancias, ?
  //-------------------------------------------------------------------------
  constructor(nombre: string, direccion: string, localidad: string, fondos: number,
    tragamonedasClasico: TragamonedasClasico,
    tragamonedasMultilinea: TragamonedasMultilinea,
    poker: Poker,
    ruleta: Ruleta) {

    this.nombre = nombre
    this.direccion = direccion
    this.localidad = localidad
    this.banca = fondos;   //Caja, Ganancias, ?
    this.tragamonedasClasico = tragamonedasClasico;
    this.tragamonedasMultilinea = tragamonedasMultilinea;
    this.poker = poker;
    this.ruleta = ruleta;
  }
  //-------------------------------------------------------------------------
  // public cobrarApuesta(dineroApuesta: number): void {
  //     // this.banca += juego.cobrarApuesta()
  //     this.banca += dineroApuesta
  // }
  // public pagarApuesta(dineroApuesta: number, jugador: Jugador): void {
  //     this.banca -= jugador.cobrarApuesta(dineroApuesta);
  // }
  //-------------------------------------------------------------------------
  private chequearFondos(jugador: Jugador): void {
    console.log(color.cyan);
    if (jugador.getFondos() === 0) {
      console.log("Ud. aun no dispone de fondos para jugar.");
      console.log("Si desea ingresarlos ahora presione si, de lo contrario le seran solicitados al ingresar a un juego.");
      let respuesta = readlineSync.keyInYN("Desea ingresar fondos ahora?");
      if (respuesta) this.solicitarFondos(jugador)
    }
    else console.log(`Ud. disponde de ${jugador.getFondos()} para jugar o cobrar.`);
  }
  //-------------------------------------------------------------------------
  private solicitarFondos(jugador: Jugador): void {
    let dinero: number = 0;
    console.log(`-`.repeat(80));
    console.log(`Por favor ingrese la candidad de dinero para Jugar : 
           (si la cantidad ingresada no alcanza para el juego elegido, al ingresar se le solicitara mas dinero).
           (ENTER): para cancelar y abandonar el casino.`);
    dinero = Number(readlineSync.question("Fondos: "));
    if (!isNaN(dinero) && dinero > 0) jugador.agregarFondos(dinero)
  }
  //-------------------------------------------------------------------------
  public recibir(jugador: Jugador): void {
    this.presentarCasino();
    this.chequearFondos(jugador);
    console.log(color.reset);
    console.clear();
    console.log(`Bienvenido ${jugador.getNombre()}!`);

    let opcionMenu: number = 0;
    do {
      console.log(color.cyan);
      opcionMenu = this.elegirJuego();
      console.log(color.reset);
      switch (opcionMenu) {
        case 0: // (ENTER)
          console.clear();
          console.log("Adios. Gracias por jugar con nosotros!");
          break;
        //WIP: case 1: { this.tragamonedasClasico.jugar(this, jugador); break; }
        case 1: this.tragamonedasClasico.jugar(); break;
        case 2: this.tragamonedasMultilinea.jugar(); break;
        case 3: this.poker.jugar(); break;
        case 4: this.ruleta.jugar(); break;

        default: {
          console.log(color.red);
          console.log(`❗ Opcion incorrecta. vuelva a intentarlo.`);
          console.log(color.cyan);
        }
      }

    } while (opcionMenu !== 0)
  }
  //-------------------------------------------------------------------------
  private presentarCasino(): void {
    console.clear();
    console.log(color.cyan);
    console.log(`=`.repeat(80));
    console.log(ascii_text_generator(`   Bienvenidos a`, "1"));
    console.log(ascii_text_generator(this.nombre.split(" ").join("\\n"), "2"));
    console.log("\n\n", `-`.repeat(80));
    console.log(color.redBackGround);
    console.log("\n..................JUGAR ES PERJUDICIAL PARA LA SALUD...........\n\n");
    //        console.log(` "Jugar es perju......"`.padEnd(80)); // TODO ver como se centra.        
    // console.log("Juegue con responsabilidad, si tiene problemas con el juego contacte a un profeesional.\n\n");
    console.log(color.reset);
  }
  //-------------------------------------------------------------------------
  private crearMenu(): string[] {
    return [
      this.tragamonedasClasico.getNombre(),
      this.tragamonedasMultilinea.getNombre(),
      this.poker.getNombre(),
      this.ruleta.getNombre()]
  }
  //-------------------------------------------------------------------------
  private elegirJuego(): number {
    // const menu = [
    //     'Tragamonedas (Modalidad Clasica)',
    //     'Tragamonedas (Modalidad Multilinea)',
    //     'Poker',
    //     'Ruleta']
    const menu: string[] = this.crearMenu();
    //---------------------------------------------------------------------
    console.log(`-`.repeat(80));
    console.log(`Juegos disponibles (ingrese el nro correspondiente): `);

    return readlineSync.keyInSelect(menu, 'A cual desea jugar ?') + 1;
  }
  //-------------------------------------------------------------------------
}