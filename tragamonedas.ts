
import readlineSync from 'readline-sync';
import { iJuegoDeCasino } from "./iJuegoDeCasino";
import { log } from 'console';

//=============================================================================
export class Tragamonedas implements iJuegoDeCasino /* extends JuegoDeCasino */ {
  apuestaMinima: number;
  apuestaMaxima: number;
  dineroDisponible: number;
  dineroApostado: number;
  // private carrete1: string;
  // private carrete2: string;
  // private carrete3: string;
  private carretes: string[];
  //---------------------------------------------------------------------------
  constructor(apuestaMinima: number, apuestaMaxima: number) {
    // this.carrete1 = "";
    // this.carrete2 = "";
    // this.carrete3 = "";
    this.carretes = new Array(3).fill(".").map(() => this.generarSimboloAleatorio());
    // this.carretes = this.carretes.map(() => this.generarSimboloAleatorio());
    // console.log("length: ",this.carretes.length);
    // console.log("inicializado: ",this.carretes);
    this.apuestaMinima = apuestaMinima;
    this.apuestaMaxima = apuestaMaxima;
    this.dineroDisponible = 0;
    this.dineroApostado = 0;
    // ideas de pago        // TODO
    // let coeficientes = [[1, 0], [2, 2], [3, 3]] // para 3 rodillos
    // let coeficientes = [[1, 0], [2, 2], [3, 3], [4, 5], [5, 7]]// para 5 rodillos
  }
  //---------------------------------------------------------------------------
  // Metodos de la interfaz.---------------------------------------------------  
  public jugar(): void {
    this.presentarJuego();
    this.inicializarJuego();
    try {
      this.solicitarApuesta();
      this.iniciarJuego();
      // this.chequearResultado();
      // this.pagarApuesta();
      return;
    } catch (error) {
      console.log(error);
    }
  }
  //---------------------------------------------------------------------------
  public presentarJuego(): void {
    console.log(`=`.repeat(80));
    console.log(`          Ud a elegido el juego..........`);  // TODO cambiar tipografia
    console.log(`-`.repeat(80));
    console.log(` Reglas: `);                         // TODO
    console.log(` Opciones de Apuestas: `); // TODO
    console.log(` Probabilidades: 0 simbolos iguales: pierde la apuesta.`); // TODO  
    console.log(` Probabilidades: 2 simbolos iguales: salva la apuesta.`); // TODO  
    console.log(` Probabilidades: 3 simbolos iguales: gana la apuesta x 3.`); // TODO  
    console.log(` Puede ganar hasta $$$$$$$$$$$     $ ${this.apuestaMaxima * 3}    $$$$$$$$$$$`); // TODO  
    console.log(`-`.repeat(80));
    console.log(` Uds. Dispone de $ ${this.dineroDisponible.toLocaleString()} para apostar.`);
    console.log(`=`.repeat(80));
  }
  //---------------------------------------------------------------------------
  private inicializarJuego(): void {
     this.carretes.forEach(carrete => carrete = this.generarSimboloAleatorio())
    this.carretes =  [..."A", "B", "A"];
    console.log("inicializado: ",this.carretes);
  }
  //---------------------------------------------------------------------------
  private solicitarApuesta(): void {
    let dinero: number = 0; //, datos: string[];
    do {
      console.log(`-`.repeat(80));
      dinero = Number(readlineSync.question(
        `Por favor ingrese la candidad de dinero para Jugar : 
        (Apuesta minima: ${this.apuestaMinima}, Maxima: ${this.apuestaMaxima}).
        (ENTER): para cancelar y abandonar el juego.
        : `));
      if (dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
      // if (dinero > 0) apuestaEsValida(dinero);
    } while (!this.apuestaEsValida(dinero));
    // si cancela la apuesta o si no dispone de dinero tirar error
    this.dineroDisponible = dinero;
  }
  //---------------------------------------------------------------------------
  private iniciarJuego(): void {
    // this.carrete1 = this.generarSimboloAleatorio();
    // this.carrete2 = this.generarSimboloAleatorio();
    // this.carrete3 = this.generarSimboloAleatorio();
    // console.log(`[${this.carrete1}] [${this.carrete2}] [${this.carrete3}]`); 

    let continuar: boolean = true; //, datos: string[];
    let dinero: number = 0; //, datos: string[];
    do {

      console.log(`-`.repeat(80));
      dinero = Number(readlineSync.question(
        `Ud. dispone de $ ${this.dineroDisponible} para apostar. 
        Ingrese la cantidad destinada a este giro.
        Al presionar (ENTER) se accionara el tragamonedas.
        (si no ingresa un monto al presionar (ENTER) abandonara el juego.)
        : `));
      if (dinero === 0) /* continuar = false; */ throw new Error("Operacion cancelada. Ud. abandono el Juego.");
      if (this.apuestaEsValida(dinero, this.dineroDisponible)) {
        this.carretes.forEach(carrete => carrete = this.generarSimboloAleatorio());
        console.table(this.carretes);
        
        console.log("resultado:    ", this.carretes.map(carrete => `[${carrete}]`).join(" "));
        this.dineroApostado = dinero;
        this.chequearResultado();
      }
      // if (dinero > 0) apuestaEsValida(dinero, min, max);
    } while (continuar);
    //solicitar creditos de la apuesta
    // verificar resultado
    // mensaje: 1 QUE SUERTE! ud a ganado $ 99999999.
    // mensaje: 2 Mala Suerte!. Volver a intentarlo ?
  }
  //---------------------------------------------------------------------------
  private chequearResultado(): void {
    let resultados: (string | number)[][] = []; //[["z", 1], ["b", 44]]
    // Almaceno las opciones que salieron y cuantas veces en otro array.
    this.carretes.forEach(carr => {
      let salido: number = resultados.findIndex(resul => resul[0] = carr);
      if (salido !== undefined) {
        // ya existe. entonces sumarle 1
        resultados[salido][1] = Number(resultados[salido][1]) + 1;
      } else { // sino existe. agregarlo
        resultados.push([carr, 1])
      }
    })

    let dineroGanado: number = resultados.reduce((sum, resul) => {
      return (typeof resul[1] === "number") ? sum + (resul[1] * this.dineroApostado) : sum;
    }, 0);
    //si gano dinero: pagar, sino desontar del disponible
    if (dineroGanado > 0) {
      this.pagarApuesta(dineroGanado);
      // this.dineroDisponible += dineroGanado;
    }
    else {
      this.descontarApuestaPerdida();
      // this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
    }

    // if (this.carrete1 === this.carrete2 && this.carrete2 === this.carrete3) {
    //   console.log("¡Ganaste!");
    // } else {
    //   console.log("Lo siento, inténtalo de nuevo.");
    // }
  }
  //---------------------------------------------------------------------------
  private pagarApuesta(ganancia: number): void {
    console.log(`¡FELICIDADES! Ganaste $ ${ganancia}`);
    this.dineroDisponible += ganancia;
  }
  //---------------------------------------------------------------------------
  private descontarApuestaPerdida(): void {
    console.log("Lo siento pero perdiste, inténtalo de nuevo.");
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
  private generarSimboloAleatorio(): string {
    const simbolos = ["A", "B", "C", "D", "E"];
    const indice = Math.floor(Math.random() * simbolos.length);
    // console.log({indice});    
    return simbolos[indice];
  }
  //---------------------------------------------------------------------------
  // Metodos propios.----------------------------------------------------------
  private apuestaEsValida(dinero: number, max?: number): boolean {
    if (max === undefined) max = this.apuestaMaxima;
    if (dinero >= this.apuestaMinima && dinero <= max) return true;
    // throw new Error("Operacion cancelada. Ud. abandono el Juego.");
    console.log(`!`.repeat(80));
    console.error("ERROR! Apuesta invalida! la apuesta ingresada esta fuera de los limintes.");
    console.log(`!`.repeat(80));
    return false;
  }
}

function formatoDinero(dinero: number): string {
  const nf = new Intl.NumberFormat("es-AR", {
    style: "currency", currency: "$ ",
    maximumFractionDigits: 2
  });
  return nf.format(dinero);
}
// const miTragamonedas = new Tragamonedas();
// miTragamonedas.jugar();