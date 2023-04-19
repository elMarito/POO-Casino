import readlineSync from 'readline-sync'
import { iJuegoDeCasino } from "./iJuegoDeCasino";
export class Ruleta implements iJuegoDeCasino {

  private numeros: number[];
  private colores: string[];
  private resultado: number;
  nombre: string;
  apuestaMinima: number;
  apuestaMaxima: number;
  dineroDisponible: number;
  dineroApostado: number;

  constructor(resultado:number,nombre:string,apuestaMinima: number, apuestaMaxima: number, dineroDisponible:number, dineroApostado:number) {
    this.numeros = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    this.colores = ["verde", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "negro", "rojo", "negro", "negro", "rojo", "negro", "rojo", "rojo", "negro", "rojo", "negro", "negro", "rojo", "negro", "rojo", "negro", "negro", "rojo", "negro", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro"];
    this.resultado = 0;
    this.nombre = "Ruleta";
    this.apuestaMinima = apuestaMinima;
    this.apuestaMaxima = apuestaMaxima;
    this.dineroDisponible = 0;
    this.dineroApostado = 0;
  }

  jugar(): void {
    this.presentarJuego();
    this.inicializarJuego();
    try {
      this.solicitarApuesta();
      this.iniciarJuego();
      // this.chequearResultado();
      // this.pagarApuesta();
      return;
    } catch (error) {      // result = error.message; // error under useUnknownInCatchVariables 
      if (error instanceof Error) {
        console.clear();
        console.log(error.message);
      } else if (typeof error === "string") {
        console.log(error);
      }
    }

  }
  iniciarJuego() {

  }
  inicializarJuego() {
    console.log("inicializando juego")
  }

  public presentarJuego(): void {
    console.log(`=`.repeat(80));
    console.log(`          Ud a elegido el juego.....${this.nombre.toLocaleUpperCase()}....`); console.log(`-`.repeat(80));
    console.log(` Reglas: 
      para poder jugar Ud. debe ingresar......................... de acuerdo a la siguiente tabla.`);
    console.log(` Opciones de Apuestas: 
      Probabilidades: ...........................
     
      Probabilidades: ...........................`);
    console.log(` Puede ganar hasta $$$$$$$$$$$     ${(this.apuestaMaxima * 3)}    $$$$$$$$$$$`); // TODO  
    console.log(`-`.repeat(80)); 1
    console.log(` Uds. Dispone de $(this.dineroDisponible)} para apostar.`);
    console.log(`=`.repeat(80));
  }
  private solicitarApuesta(): void {
    let dinero: number = 0; //, datos: string[];
    do {
      console.log(`-`.repeat(80));
      dinero = Number(readlineSync.question(
        `Por favor ingrese la candidad de dinero para Jugar :
        (Apuesta minima: ${(this.apuestaMinima)}, Maxima: ${(this.apuestaMaxima)}).
        (ENTER): para cancelar y abandonar el juego.
        : `));
      if (dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
      // if (dinero > 0) apuestaEsValida(dinero);
    } while (!this.apuestaEsValida(dinero));
    // si cancela la apuesta o si no dispone de dinero tirar error
    this.dineroDisponible = dinero;
  }
  private apuestaEsValida(dinero: number, max?: number): boolean {
    if (max === undefined) max = this.apuestaMaxima;
    if (dinero >= this.apuestaMinima && dinero <= max) return true;
    // throw new Error("Operacion cancelada. Ud. abandono el Juego.");
    console.log(`!`.repeat(80));
    console.error("ERROR! Apuesta invalida! la apuesta ingresada esta fuera de los limites.");
    console.log(`!`.repeat(80));
    return false;
  }
  girar(): void {
    this.resultado = this.numeros[Math.floor(Math.random() * this.numeros.length)];
  }

  obtenerResultado(): string {
    let color = "";
    if (this.resultado === 0) {
      color = this.colores[0];
    } else if (this.colores[this.resultado] === "negro") {
      color = "negro";
    } else {
      color = "rojo";
    }
    return `${this.resultado} (${color})`;
  }
}

