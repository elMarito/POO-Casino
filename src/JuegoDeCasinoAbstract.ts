import { formatoDinero,centrar } from './utiles';
import * as readlineSync from "readline-sync"; // formato typscrypt
import { Jugador } from "./jugador";
//=============================================================================
export abstract class JuegoDeCasino {
  protected nombre: string;
  protected apuestaMinima: number;
  protected apuestaMaxima: number;
  protected dineroDisponible: number; //esto deberia estar en el jugador
  protected dineroApostado: number;
  protected emojis: { [key: string]: string }; // esto no va aca. pasarlo a utiles
  //---------------------------------------------------------------------------
  constructor(apuestaMinima: number, apuestaMaxima: number) {
    this.nombre = "";
    this.apuestaMinima = apuestaMinima;
    this.apuestaMaxima = apuestaMaxima;
    this.dineroDisponible = 0;//esto deberia estar en el jugador Fondos
    this.dineroApostado = 0;
    this.emojis = {
      happy: "😁", sad: "😢", fingerCross: "🤞", luck: "🍀", money: "💲",
      chears: "🥂", award: "🏆", error: "❗", question: "❓", warn: "🔔"
    } //🎲♠♣♥♦🎴💎
  }
  //---------------------------------------------------------------------------
  public getNombre(): string { return this.nombre; }
  //---------------------------------------------------------------------------
  // public jugar(casino:Casino, jugador:Jugador): void {
  public jugar(): void {
    console.clear();
    this.presentarJuego(); //jugador:Jugador
    try {
      this.solicitarFondos(); //jugador:Jugador
      console.clear();
      this.iniciarJuego(); //jugador:Jugador
      return;
    } catch (error) {      // result = error.message; // error under useUnknownInCatchVariables 
      console.clear();
      if (error instanceof Error) {
        console.log(error.message);
      } else if (typeof error === "string") {
        console.log(error);
      }
      // en caso de error reintegrar la apuesta.
      // if (this.dineroApostado > 0) this.jugador.cobrar(this.dineroApostado);
    }
    finally {
      // console.log("Ud. Recibe: $", jugador.getFondos());
      console.log("Ud. Recibe: $", this.dineroDisponible);
      this.dineroDisponible = 0;
    }
  }
  //---------------------------------------------------------------------------
  protected abstract presentarJuego(): void; //################################
  protected abstract iniciarJuego(): void; //##################################
  //---------------------------------------------------------------------------
  // protected solicitarFondos(jugador: Jugador): void {
  // if (jugador.getFondos() > this.apuestaMinima) return
  protected solicitarFondos(): void {
    let dinero: number = 0;
    do {
      console.log(`-`.repeat(80));
      console.log(this.emojis.error, `Por favor ingrese la candidad de dinero para Jugar : 
       (Apuesta minima: ${formatoDinero(this.apuestaMinima)}, Maxima: ${formatoDinero(this.apuestaMaxima)}).
       (ENTER): para cancelar y abandonar el juego.`);
      dinero = Number(readlineSync.question("Fondos: "));
      if (isNaN(dinero) || dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
    } while (!this.apuestaEsValida(dinero));
    this.dineroDisponible = dinero;
    // this.dineroDisponible = jugador.agregarFondos(dinero)
    // jugador.agregarFondos(dinero)
  }
  //---------------------------------------------------------------------------
  protected abstract solicitarCreditos(): number; //###########################
  // protected abstract chequearResultado(): void ; //############################
  //---------------------------------------------------------------------------
  // protected pagarApuesta(ganancia: number, jugador: Jugador): void {
  protected pagarApuesta(ganancia: number): void {
    console.log(this.emojis.happy, this.emojis.award, ` ¡FELICIDADES! Ganaste 🥂 `, this.emojis.money, ganancia, this.emojis.money);
    this.dineroDisponible += ganancia;
    // casino.pagarApuesta(ganancia);
    // jugador.cobrarApuesta(ganancia);
  }
  //---------------------------------------------------------------------------
  // protected descontarApuestaPerdida(jugador: Jugador): void {
  protected descontarApuestaPerdida(): void {
    console.log(this.emojis.sad, " Lo siento pero perdiste, inténtalo de nuevo.");
    this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
    // casino.cobrarApuesta(this.dineroApostado);
    // this.dineroApostado=0;
  }
  //---------------------------------------------------------------------------
  protected apuestaEsValida(dinero: number, max?: number): boolean {
    if (max === undefined)
      max = this.apuestaMaxima;
    if (dinero >= this.apuestaMinima && dinero <= max)
      return true;

    console.error(this.emojis.error, "ERROR! Apuesta invalida! la apuesta ingresada esta fuera de los limites.");
    return false;
  }
}