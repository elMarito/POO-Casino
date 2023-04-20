import * as readlineSync from "readline-sync"; // formato typscrypt
import { JuegoDeCasino } from "./JuegoDeCasinoAbstract";

export class Poker extends JuegoDeCasino {
  constructor() {
    super(50, 50000);
    this.nombre = "Poker";
  }
  //---------------------------------------------------------------------------
  public presentarJuego(): void {
    console.clear();
    console.log(`=`.repeat(80));
    console.log(`Usted a elegido el juego Poker de la Casa, "Mi casa mis reglas"`);
    console.log(`-`.repeat(80));
    console.log(` 1- El jugador y la banca reciben cartas.
    2- No hay empates.
    3- Si el jugador gana aumenta su dinero y si pierde se le resta.                         
    4- Probabilidades: 0.7 la Banca y 0.5 el jugador
    (El valor de apuesta en cada mano es $ ${this.apuestaMinima})`);
    console.log(`-`.repeat(80));
    console.log(` Uds. Dispone de $ ${this.dineroDisponible.toLocaleString()} para apostar.`);
    console.log(`=`.repeat(80));
  }
  //---------------------------------------------------------------------------
  public solicitarCreditos(): number {
    if (this.dineroDisponible < this.apuestaMinima) {
      console.log("No tienes suficientes créditos para iniciar el juego."); // Se muestra un mensaje si no hay suficientes créditos
      return 0; // Se devuelve 0 si no hay suficientes créditos
    }
    let respuesta = readlineSync.keyInYNStrict(
      `Valor unico de apuesta $ ${this.apuestaMinima}. Quiere jugar una Mano`);
    if (respuesta)
      return this.apuestaMinima;
    else
      throw new Error(`Usted Salio del juego.`);
  }
  //---------------------------------------------------------------------------
  public iniciarJuego(): void {
    let dinero: number = 0;
    do {
      console.log(`-`.repeat(80));
      dinero = this.solicitarCreditos();
      if (dinero === 0) /* continuar = false; */ throw new Error(`Operacion cancelada. Fondos insuficientes.`);
      this.dineroApostado = dinero; 
      console.log("Repartiendo cartas...");
      // Generamos un número aleatorio entre 0 y 1 para determinar quién ganó
      const ganador = Math.floor(Math.random() * 2);
      if (ganador === 0) {
        console.log("¡El jugador 1 ganó!");
        let dineroGanado: number = this.dineroApostado * 2
        this.pagarApuesta(dineroGanado)
      } else {
        this.descontarApuestaPerdida();
        console.log("¡La banca ganó!");
      }
      console.log(` Uds. Dispone de $ ${this.dineroDisponible.toLocaleString()} para apostar.`);
    } while (this.dineroDisponible >= this.apuestaMinima)
  }
}
