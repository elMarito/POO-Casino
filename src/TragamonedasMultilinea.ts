// import * as readlineSync from "readline-sync"; // formato typscrypt
import { Tragamonedas } from "./tragamonedas";
import { centrar, formatoDinero } from "./utiles";
//-----------------------------------------------------------------------------
export class TragamonedasMultilinea extends Tragamonedas {
  private comodines: [string, string, (x: number) => number][];
  constructor(apuestaMinima: number, apuestaMaxima: number) {
    super(apuestaMinima, apuestaMaxima, 5, ["🍓", "🍒", "🍉", "🍌", "🥝", "🍈", "🍍", "🍐", "🍑"]);
    // "🍊",  "🍇",  "🍎",  "🍋",  "🍏" <-no usados porque son mas angostos en pixelees
    this.nombre = "Tragamonedas (Multilinea) 9 simbolos";

    this.comodines = [
      [this.SIMBOLOS[0], "multiplicas x 2 las repeticiones. Ej. 🍓🍓->🍓🍓🍓🍓", ((x: number) => { return x * 2 })],
      [this.SIMBOLOS[2], "resta 1 a las repeticiones. Ej. 🍓🍓🍓->🍓🍓", ((x: number) => { return x - 1 })],
      [this.SIMBOLOS[3], "suma 1 a las repeticiones. Ej. 🍓🍓🍓->🍓🍓🍓🍓", ((x: number) => { return x + 1 })],
      [this.SIMBOLOS[4], "multiplicas x 3 las repeticiones. Ej. 🍓🍓->🍓🍓🍓🍓🍓🍓", ((x: number) => { return x * 3 })]
    ];
  }
  //---------------------------------------------------------------------------
  public presentarJuego(): void {
    console.log(`=`.repeat(80));
    console.log(centrar(`Ud a elegido el juego.....${this.nombre.toLocaleUpperCase()}....`));  // TO DO cambiar tipografia
    console.log(centrar(this.SIMBOLOS.join("").repeat(this.carretes.length)));
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
    Probabilidades: 2 simbolos iguales: pierde la apuesta.
    Probabilidades: 3 simbolos iguales: gana la apuesta x 3
    Probabilidades: 4 simbolos iguales: gana la apuesta x 4
    Probabilidades: 5 simbolos iguales: gana la apuesta x 7.`); // TO DO  
    console.log(`Comodines x simbolos repetidos`);
    // Ejemplo: `Si se repite: 🍉 suma 1 a las repeticiones`);
    this.comodines.forEach(como =>
      console.log(`Si se repite: ${como[0]} ${como[1]} `)
    )
    console.log(`-`.repeat(80));
    console.log(` Las probabiliddes de ganar son 10.000.000 a 1.`); // TO DO  
    console.log(centrar(` Puede ganar hasta 💲💲💲     ${formatoDinero(this.apuestaMaxima * 3)}    💲💲💲`, 80)); // TODO  
    console.log(`=`.repeat(80)); 1
    console.log(` Uds. Dispone de ${formatoDinero(this.dineroDisponible)} para apostar.`);
    console.log(`-`.repeat(80));
  }
  //---------------------------------------------------------------------------
  private monstrarSimbolos2(proceso: string, girando: string = ` girando...: ${this.emojis.fingerCross} `) {
    process.stdout.write(`\n                  ${this.carretes.map(carr => "[" + carr.verSimbolo(carr.posicionSiguiente()) + "]").join("")} ${proceso}`);
    process.stdout.write(`\n                  ${this.carretes.map(carr => "[" + carr.verSimbolo(carr.posicionSiguiente(carr.posicionSiguiente())) + "]").join("")} ${proceso}`);
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
        this.monstrarSimbolos2(" --->  ")
        // readlineSync.keyInPause();

        this.chequearResultado();
      }
    } while (this.dineroDisponible > this.apuestaMinima);
  }

  //---------------------------------------------------------------------------
  private contarRepetidos2(carretes: string[]): [string, number][] {
    let resultados: [string, number][] = []; //ejemplo [["z", 1], ["b", 44]]

    // Almaceno las opciones que salieron y cuantas veces en otro array.
    carretes.forEach(carr => {
      let salido: number = resultados.findIndex(resul => resul[0] === carr);
      if (salido > -1) {  // ya existe. entonces sumarle 1
        resultados[salido][1] = Number(resultados[salido][1]) + 1;
      } else { // sino existe. agregarlo
        resultados.push([carr, 1]);
      }
    });
    return resultados;
  }
  //---------------------------------------------------------------------------
  protected chequearResultado(): void {
    // creo un solo array con todos los simbolos.
    let simbolosSalidos: string[] = this.carretes.map(carr => carr.verSimbolo()).concat(
      this.carretes.map(carr => carr.verSimbolo(carr.posicionSiguiente())).concat(
        this.carretes.map(carr => carr.verSimbolo(carr.posicionSiguiente(carr.posicionSiguiente()))))
    )
    let resultados: [string, number][] = this.contarRepetidos2(simbolosSalidos);
    resultados = resultados.filter(resul => resul[1] > 1);
    //logica de premios
    resultados = resultados.map(x => {
      if (x[1] === 5) return [x[0], 7]
      else if (x[1] === 2) return [x[0], 1]
      else return x
    })
    resultados = resultados.filter(resul => resul[1] > 1);

    this.addComodines(resultados);

    // calcular dinero ganado/perdido.
    let dineroGanado: number = resultados.reduce((sum, resul) => {
      return (typeof resul[1] === "number") ? sum + (resul[1] * this.dineroApostado) : sum;
    }, 0);

    //si gano dinero: pagar, sino desontar del disponible
    if (dineroGanado > 0) {
      if (dineroGanado > this.dineroApostado) 
      this.pagarApuesta(dineroGanado)
      else console.log(this.emojis.luck, " Pudo ser peor! salvo la apuesta.");
    }
    else {
      this.descontarApuestaPerdida();
    }
  }
  //---------------------------------------------------------------------------
  private addComodines(resultados: [string, number][]): void {
    resultados.forEach(resul => {
      let salido: number = this.comodines.findIndex(como => como[0] === resul[0]);
      if (salido > -1) {        // Si existe. aplicar el comodin
        resul[1] = this.comodines[salido][2](resul[1]);
      }
    });
  }
}