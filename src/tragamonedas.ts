import { JuegoDeCasino } from "./JuegoDeCasinoAbstract";
import * as readlineSync from "readline-sync"; // formato typscrypt
// import { Jugador } from "./jugador";
import { centrar, formatoDinero, getRandomIntInclusive } from "./utiles";
//=============================================================================
export class Tragamonedas extends JuegoDeCasino {
  protected carretes: Carrete[];
  protected SIMBOLOS: string[];
  //---------------------------------------------------------------------------
  constructor(apuestaMinima: number, apuestaMaxima: number
    , cantidadCarretesDefault3: number = 3
    , simbolosDefault8frutas: string[] = ["🥝", "🍈", "🍉", "🍌", "🍍", "🍏", "🍐", "🍑"]) {
    super(apuestaMinima, apuestaMaxima);
    this.nombre = "Tragamonedas";
    this.SIMBOLOS = simbolosDefault8frutas
    this.emojis.palanca = "📍"; //agrego simbolo a la lista base de emojis.

    const RETRASO: number = 4000;
    this.carretes = [];
    for (let i = 0; i < cantidadCarretesDefault3; i++) {
      this.carretes.push(
        new Carrete(getRandomIntInclusive(i * RETRASO, (i + 1) * RETRASO)
          , 0, this.reordenar([...this.SIMBOLOS]))
      )
    }
  }
  //---------------------------------------------------------------------------
  public getNombre(): string { return this.nombre; }
  //---------------------------------------------------------------------------
  public presentarJuego(): void {
    console.log(`=`.repeat(80));
    console.log(centrar(`Ud a elegido el juego.....${this.nombre.toLocaleUpperCase()}....`));  // TO DO cambiar tipografia
    console.log(centrar(this.SIMBOLOS.join()));
    console.log(`-`.repeat(80));
    // se podrian poner las reglas en un TXT.         TO DO
    console.log(` Reglas: 
    para poder jugar Ud. debe ingresar un candidad de dinero de la cual dispondra
    para hacer las apuestas. Una vez acreditado el dinero, se le solicitara que
    apueste una parte o todo el dinero del que dispone para accionar el tragamonedas.
    Si gana se le acreditara el monto correspondiente, de lo contrario se le 
    descontara de acuerdo al resultado obtenido. de acuerdo a la siguiente tabla.`);                         // TODO
    console.log(`-`.repeat(80));
    console.log(` Opciones de Apuestas: 
    Probabilidades: 0 simbolos iguales: pierde la apuesta.
    Probabilidades: 2 simbolos iguales: salva la apuesta.
    Probabilidades: 3 simbolos iguales: gana la apuesta x 3.`);
    console.log(`-`.repeat(80));
    //    console.log(` Las probabiliddes de ganar son     ${this.getProbabilidades()} a 1.`); // TO DO  
    console.log(centrar(` Puede ganar hasta 💲💲💲     ${formatoDinero(this.apuestaMaxima * 3)}    💲💲💲`)); // TODO  
    console.log(`=`.repeat(80)); 1
  }
  //---------------------------------------------------------------------------
  public iniciarJuego(): void {
    let dinero: number = 0;
    do {
      console.log(`-`.repeat(80));
      this.monstrarSimbolos(this.emojis.palanca + "\n", "                ");
      dinero = this.solicitarCreditos();
      if (dinero === 0)  throw new Error(`Operacion cancelada. Ud. abandono el Juego.`);
      if (this.apuestaEsValida(dinero, this.dineroDisponible)) {
        this.dineroApostado = dinero;
        this.accionarPalanca();
        this.chequearResultado();
      }
    } while (this.dineroDisponible > this.apuestaMinima);
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  public solicitarCreditos(): number {
    console.log(`-`.repeat(80));
    console.log(`Ud. dispone de ${this.emojis.money}`, this.dineroDisponible, `para apostar.`);
    console.log(`Ingrese la cantidad destinada a este giro.
    Al presionar (ENTER) se accionara ${this.emojis.palanca} el tragamonedas.
    (si no ingresa un monto al presionar (ENTER) abandonara el juego.)`);
    const dinero: number = Number(readlineSync.question("Apuesta: "));
    return isNaN(dinero) ? 0 : dinero;
  }
  //---------------------------------------------------------------------------
  public monstrarSimbolos(proceso: string, girando: string = ` girando...: ${this.emojis.fingerCross} `) {
    process.stdout.write(`\r${girando}  ${this.carretes.map(
      carr => "[" + carr.verSimbolo() + "]").join("")} ${proceso}`);
  }
  //---------------------------------------------------------------------------
  protected accionarPalanca(): void {
    // Resetear Carretes
    this.carretes.forEach(carrete => carrete.resetearVelocidad());
    // girando....
    let proceso: { [key: string]: string } = { "-": "/", "/": "|", "|": `\\`, "\\": "-" };
    let procesando: string = proceso["-"];


    const VELOCIDAD_INICIAL: number = 100000;
    let velocidad: number = 0;
    for (let index = 0; index < VELOCIDAD_INICIAL; index++) {
      this.carretes.forEach((rod, i) => {
        if (index === (rod.getRetraso() + rod.getVelocidad())) { rod.girar(); rod.desacelerar(index + 1); }
      })
      procesando = proceso[procesando];
      if (index === velocidad + 1) {
        velocidad = velocidad + index;
      }
      this.monstrarSimbolos(procesando + ` `.repeat(40));
    }
    this.monstrarSimbolos(" --->  ");
  }
  //---------------------------------------------------------------------------
  protected chequearResultado(): void {
    let resultados: [string, number][] = this.contarRepetidos(this.carretes);
    //logica de premios
    resultados = resultados.map(x => {
      if (x[1] === 1) return [x[0], 0]
      else if (x[1] === 2) return [x[0], 1]
      else return x
    })
    // calcular dinero ganado/perdido.
    let dineroGanado: number = resultados.reduce((sum, resul) => {
      return (typeof resul[1] === "number") ? sum + (resul[1] * this.dineroApostado) : sum;
    }, 0);
    //si gano dinero: pagar, sino desontar del disponible
    if (dineroGanado > 0) {
      if (dineroGanado > this.dineroApostado) this.pagarApuesta(dineroGanado)
      else console.log(this.emojis.luck, " Pudo ser peor! salvo la apuesta.");
    }
    else {
      this.descontarApuestaPerdida();
    }
  }
  //---------------------------------------------------------------------------
  public contarRepetidos(carretes: Carrete[]): [string, number][] {
    let resultados: [string, number][] = []; //ejemplo [["z", 1], ["b", 44]]

    // Almaceno las opciones que salieron y cuantas veces en otro array.
    carretes.forEach(carr => {
      let salido: number = resultados.findIndex(resul => resul[0] === carr.verSimbolo());
      if (salido > -1) {
        // ya existe. entonces sumarle 1
        resultados[salido][1] = Number(resultados[salido][1]) + 1;
      } else { // sino existe. agregarlo
        resultados.push([carr.verSimbolo(), 1]);
      }
    });
    return resultados;
  }
  //---------------------------------------------------------------------------
  // Metodos propios.----------------------------------------------------------
  private reordenar(simbolos: string[]): string[] {
    for (let i = simbolos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [simbolos[i], simbolos[j]] = [simbolos[j], simbolos[i]]; // intercambiamos los elementos
    }
    return simbolos;
  }
}
//=============================================================================
class Carrete {
  private simbolos: string[];
  private posicion: number;
  private retraso: number;
  private velocidad: number;  // velocidad == lapso == coeficiente:number;
  constructor(retraso: number, velocidad: number, simbolos: string[]) {
    this.simbolos = simbolos;
    this.posicion = 0;
    this.retraso = retraso;
    this.velocidad = velocidad;
  }
  public verSimbolo(posicionActual: number = this.posicion): string { return this.simbolos[posicionActual] }
  public getRetraso(): number { return this.retraso }
  public getVelocidad(): number { return this.velocidad }
  public desacelerar(puntos: number): void { this.velocidad += puntos }
  public resetearVelocidad(): void { this.velocidad = 0 } //resetea velocidad.
  public girar(): void {
    this.posicion = this.posicionSiguiente();
  }
  public posicionSiguiente(posicionActual: number = this.posicion): number {
    return (posicionActual === this.simbolos.length - 1) ? 0 : posicionActual + 1;
  }
}