import { Tragamonedas } from "./tragamonedas";
import { centrar, formatoDinero } from "./utiles";
//---------------------------------------------------------------------------
export class TragamonedasClasico extends Tragamonedas {
  private simbolosYapa: string[];

  constructor(apuestaMinima: number, apuestaMaxima: number) {
    super(apuestaMinima, apuestaMaxima, undefined, ["🍅", "🍆", "🌽", "🍄", "🥑", "🥔"]);
    this.nombre = "Tragamonedas (Clasico) 6 simbolos";

    this.simbolosYapa = [this.SIMBOLOS[0], this.SIMBOLOS[2], this.SIMBOLOS[4]];
  }// "🥒", "🥕", "🌶" <- eliminados porque son mas angostos.
  //---------------------------------------------------------------------------
  public presentarJuego(): void {
    console.log(`=`.repeat(80));
    console.log(centrar(`Ud a elegido el juego.....${this.nombre.toLocaleUpperCase()}....`));  // TO DO cambiar tipografia
    console.log(centrar(this.SIMBOLOS.join().repeat(this.carretes.length)));
    console.log(`-`.repeat(80));
    //  poner las reglas en un TXT.         TO DO
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
        Probabilidades: 3 simbolos iguales: gana la apuesta x 3.`); // TO DO  
    console.log(` Yapa: 
        Si el simbolo repetido triple es ${this.simbolosYapa[0]} gana $ 100.
        Si el simbolo repetido triple es ${this.simbolosYapa[1]} gana $ 200.
        Si el simbolo repetido triple es ${this.simbolosYapa[2]} gana $ 300.`); // TO DO  
    console.log(`-`.repeat(80));
    //    console.log(` Las probabiliddes de ganar son     ${this.getProbabilidades()} a 1.`); // TO DO  
    console.log(centrar(` Puede ganar hasta 💲💲💲     ${formatoDinero(this.apuestaMaxima * 3)}    💲💲💲`, 80)); // TODO  
    console.log(`=`.repeat(80)); 1
    console.log(` Uds. Dispone de ${formatoDinero(this.dineroDisponible)} para apostar.`);
    console.log(`-`.repeat(80));
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  // metodo sobreescrito
  protected chequearResultado(): void {
    // //quitar duplicados de un array
    // const unique = new Set(this.carretes.map(carr => carr.verSimbolo()))
    // switch (unique.size) {
    //   case 1: /* gano */        break;
    //   case 2: /* salvo */        break;
    //   case 3: /* perdio */        break;
    // }

    // let resultados: (string | number)[][] = []; //[["z", 1], ["b", 44]]
    let resultados: [string, number][] = []; //[["z", 1], ["b", 44]]
    // Almaceno las opciones que salieron y cuantas veces en otro array.
    this.carretes.forEach(carr => {
      let salido: number = resultados.findIndex(resul => resul[0] === carr.verSimbolo());
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // let salido: number = resultados.findIndex(resul => resul[0] === carr);
      if (salido > -1) {
        // ya existe. entonces sumarle 1
        resultados[salido][1] = Number(resultados[salido][1]) + 1;
      } else { // sino existe. agregarlo
        resultados.push([carr.verSimbolo(), 1])
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // resultados.push([carr, 1])
      }
    })
    //  console.log({resultados}, `--- antes`);
    //logica de premios
    resultados = resultados.map(x => {
      if (x[1] === 1) return [x[0], 0]
      else if (x[1] === 2) return [x[0], 1]
      else return x
    })
    // console.log({resultados}, `--- despues`);
    // calcular dinero ganado/perdido.
    let dineroGanado: number = resultados.reduce((sum, resul) => {
      return (typeof resul[1] === "number") ? sum + (resul[1] * this.dineroApostado) : sum;
    }, 0);
    //si gano dinero: pagar, sino desontar del disponible
    if (dineroGanado > 0) {
      if (dineroGanado > this.dineroApostado) {
        const yapaDinero: number = this.yapa(resultados[0][0]);
        dineroGanado += yapaDinero;
        this.pagarApuesta(dineroGanado);
        if (yapaDinero > 0) console.log("y con yapa! ", resultados[0][0], yapaDinero);
      }
      else console.log(this.emojis.luck, " Pudo ser peor! salvo la apuesta.");
      // this.dineroDisponible += dineroGanado;
    }
    else {
      this.descontarApuestaPerdida();
      // this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
    }
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  private yapa(simbolo: string): number {
    switch (simbolo) {
      case this.simbolosYapa[0]: return 100
      case this.simbolosYapa[1]: return 200
      case this.simbolosYapa[2]: return 300
      default: return 0
    }
  }
}