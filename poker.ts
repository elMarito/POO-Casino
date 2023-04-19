import { JuegoDeCasino } from "./JuegoDeCasinoAbstract";

export class Poker extends JuegoDeCasino {
  protected creditos:number
  constructor(apuestaMinima: number, apuestaMaxima: number, pcreditos:number) {
    super(apuestaMinima, apuestaMaxima);
    this.creditos = pcreditos;
  }
  
  //---------------------------------------------------------------------------
  public presentarJuego(): void {
    console.log(`=`.repeat(80));
    console.log(`Usted a elegido el juego Poker de la Casa, "Mi casa mis reglas"`);
    console.log(`-`.repeat(80));
    console.log(` 1- El jugador y la banca reciben cartas.
    2- No hay empates.
    3- Si el jugador gana aumenta su dinero y si pierde se le resta.                         
    4- Probabilidades: 0.7 la Banca y 0.5 el jugador`);  
    console.log(`-`.repeat(80));
    console.log(` Uds. Dispone de $ ${this.dineroDisponible.toLocaleString()} para apostar.`);
    console.log(`=`.repeat(80));
  }
  public solicitarCreditos(): number {
    const creditosSolicitados = 50; // Se solicitan 50 créditos
    if (this.creditos >= creditosSolicitados) {
      this.creditos -= creditosSolicitados; // Se restan los créditos solicitados del total
    } else {
      console.log("No tienes suficientes créditos para iniciar el juego."); // Se muestra un mensaje si no hay suficientes créditos
      return 0; // Se devuelve 0 si no hay suficientes créditos
    }
    const creditosGenerados = Math.floor(Math.random() * (this.creditos + 1 - this.apuestaMinima)) + this.apuestaMinima;
    return creditosGenerados;
  }
  
 //---------------------------------------------------------------------------
 public iniciarJuego(): void {
  console.log("Repartiendo cartas...");

  // Generamos un número aleatorio entre 0 y 1 para determinar quién ganó
  const ganador = Math.floor(Math.random() * 2);
  if (ganador === 0) {
    console.log("¡El jugador 1 ganó!");
  } else {
    console.log("¡La banca ganó!");
  }
}
}


let jugador = new Poker (50,100, 5000); 
console.log(jugador.presentarJuego());
console.log(jugador.solicitarCreditos());
console.log(jugador.iniciarJuego());