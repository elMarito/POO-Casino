// import { iJuegoDeCasino } from "./iJuegoDeCasino";
import readlineSync from 'readline-sync';
import { Jugador } from "./jugador";
//=============================================================================
export abstract class JuegoDeCasino /* implements iJuegoDeCasino */ {
  protected nombre: string;
  protected apuestaMinima: number;
  protected apuestaMaxima: number;
  protected dineroDisponible: number; //esto deberia estar en el jugador
  protected dineroApostado: number;
  protected emojis: { [key: string]: string };/*  = {
    happy: "😁", sad: "😢", fingerCross: "🤞", luck: "🍀", money: "💲",
    chears: "🥂", award: "🏆", error: "❗", question: "❓", warn: "🔔"
  } //🎲♠♣♥♦🎴💎 */
  //---------------------------------------------------------------------------
  constructor(apuestaMinima: number, apuestaMaxima: number) {
    this.nombre = "";
    this.apuestaMinima = apuestaMinima;
    this.apuestaMaxima = apuestaMaxima;
    this.dineroDisponible = 0;//esto deberia estar en el jugador
    this.dineroApostado = 0;
    this.emojis = {
      happy: "😁", sad: "😢", fingerCross: "🤞", luck: "🍀", money: "💲",
      chears: "🥂", award: "🏆", error: "❗", question: "❓", warn: "🔔"
    } //🎲♠♣♥♦🎴💎
  }
  //---------------------------------------------------------------------------
  // Metodos de la interfaz.---------------------------------------------------   
  public getNombre(): string { return this.nombre; }
  // public getApuestaMinima(): number { return this.apuestaMinima; }
  // public getApuestaMaxima(): number { return this.apuestaMaxima; }
  // public getDineroDisponible(): number { return this.dineroDisponible; }
  // public getDineroApostado(): number { return this.dineroApostado; }
  //---------------------------------------------------------------------------
  // public jugar(jugador:Jugador): void {
  public jugar(): void {
    console.clear();
    this.presentarJuego(); //jugador:Jugador
    // this.inicializarJuego();
    try {
      this.solicitarFondos(); //jugador:Jugador
      this.iniciarJuego(); //jugador:Jugador
      // this.chequearResultado();
      // this.pagarApuesta();
      return;
    } catch (error) {      // result = error.message; // error under useUnknownInCatchVariables 
      console.clear();
      if (error instanceof Error) {
        console.log(error.message);
      } else if (typeof error === "string") {
        console.log(error);
      }
    }
    finally {
      console.log("Ud. Recibe: $", this.dineroDisponible);
      this.dineroDisponible = 0;
    }
  }
  //---------------------------------------------------------------------------
  protected abstract presentarJuego(): void; //################################
  protected abstract iniciarJuego(): void; //##################################
  //---------------------------------------------------------------------------
  // protected solicitarFondos(jugador: Jugador): void {
  protected solicitarFondos(): void {
    // if (jugador.getFondos() > this.apuestaMinima) return

    let dinero: number = 0;
    do {
      console.log(`-`.repeat(80)); // 💲
      console.log(this.emojis.error, `Por favor ingrese la candidad de dinero para Jugar : 
       (Apuesta minima: ${this.formatoDinero(this.apuestaMinima)}, Maxima: ${this.formatoDinero(this.apuestaMaxima)}).
       (ENTER): para cancelar y abandonar el juego.`);
      dinero = Number(readlineSync.question("Fondos: "));
      if (isNaN(dinero) || dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
      // if (dinero > 0) apuestaEsValida(dinero);
    } while (!this.apuestaEsValida(dinero));
    // si cancela la apuesta o si no dispone de dinero tirar error
    this.dineroDisponible = dinero;
    // jugador.agregarFondos(dinero)
  }
  //---------------------------------------------------------------------------
  protected abstract solicitarCreditos(): number; //###########################
  // protected abstract chequearResultado(): void ; //############################
  //---------------------------------------------------------------------------
  protected pagarApuesta(ganancia: number): void {
    console.log(this.emojis.happy, this.emojis.award, ` ¡FELICIDADES! Ganaste 🥂 `, this.emojis.money, ganancia, this.emojis.money);
    this.dineroDisponible += ganancia;
  }
  protected descontarApuestaPerdida(): void {
    console.log(this.emojis.sad, " Lo siento pero perdiste, inténtalo de nuevo.");
    // mensaje: 2 Mala Suerte!. Volver a intentarlo ?
    this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
    // console.log(`-`.repeat(80));
    // let dinero = Number(readlineSync.question(
    //   `Ud. dispone de $ ${this.dineroDisponible} para apostar. 
    //   Ingrese la cantidad destinada a este giro.
    //   Al presionar (ENTER) se accionara el tragamonedas.
    //   (si no ingresa un monto al presionar (ENTER) abandonara el juego.)
    //   : `));
    // if (dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
  }
  //---------------------------------------------------------------------------
  // Metodos propios.----------------------------------------------------------
  protected apuestaEsValida(dinero: number, max?: number): boolean {
    if (max === undefined) max = this.apuestaMaxima;
    if (dinero >= this.apuestaMinima && dinero <= max) return true;
    // throw new Error("Operacion cancelada. Ud. abandono el Juego.");
    // console.log(this.emojis.error.repeat(40));
    console.error(this.emojis.error, "ERROR! Apuesta invalida! la apuesta ingresada esta fuera de los limites.");
    // console.log(this.emojis.error.repeat(40));
    //    console.log(`!`.repeat(80));
    return false;
  }
  //---------------------------------------------------------------------------
  // Metodos auxiliares.-------------------------------------------------------
  // public name(str: string, length: number, char: string = ' '):string {
  //   return str.padStart((str.length + length) / 2, char).padEnd(length, char);
  // }
  public centrar = (str: string, length: number, char: string = ' ') =>
    str.padStart((str.length + length) / 2, char).padEnd(length, char);
  //---------------------------------------------------------------------------
  public formatoDinero(dinero: number): string {        // 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲  
    return this.emojis.money + " " + new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(dinero);
    // return this.emojis.money +" "+ new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency', maximumFractionDigits: 2 }).format(dinero);
    //  return new Intl.NumberFormat("es-AR", { currency: "$", style: "currency", maximumFractionDigits: 2 }).format(dinero);
  }
  //---------------------------------------------------------------------------
  public getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    // max = Math.floor(max);
    return Math.floor(Math.random() * (Math.floor(max) - min + 1) + min);
  }
  //---------------------------------------------------------------------------
  // private getIcon(x:emojis):string{
  //     return this.emojis
  // }
}
//-----------------------------------------------------------------------------