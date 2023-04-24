import { Tragamonedas } from "./tragamonedas";

export class TragamonedasMultilinea extends Tragamonedas {
    protected SIMBOLOS: string[] = ["🍅", "🍆", "🌽", "🌶", "🍄", "🥑", "🥒", "🥔", "🥕"];
    // private linea1: number;

    constructor(apuestaMinima: number, apuestaMaxima: number) {
        super(apuestaMinima, apuestaMaxima, 5);
        // this.rodillos=5;
        this.nombre = "Tragamonedas (Multilinea)";
        // this.nombre = "Tragamonedas (Extendido)";

    }
    public presentarJuego(): void {
        const centrar = (str: string, length: number, char: string = ' ') =>
          str.padStart((str.length + length) / 2, char).padEnd(length, char);
        console.log(`=`.repeat(80));
        console.log(centrar(`Ud a elegido el juego.....${this.nombre.toLocaleUpperCase()}....`, 80));  // TODO cambiar tipografia
        //    console.log(this.SIMBOLOS.join());
        console.log(centrar((["🍎", "🍊", "🍇", "🍓", "🍒", "🍋", "🍉", "🍌"
          , "🥝", "🍈", "🍍", "🍏", "🍐", "🍑", "🍅", "🍆"
          , "🌽", "🌶", "🍄", "🥑", "🥒", "🥔", "🥕"]).join(), 80));
    
        console.log(`-`.repeat(80));
        // se podrian poner las reglas en un TXT.         TODO
        console.log(` Reglas: 
        para poder jugar Ud. debe ingresar un candidad de dinero de la cual dispondra
        para hacer las apuestas. Una vez acreditado el dinero, se le solicitara que
        apueste una parte o todo el dinero del que dispone para accionar el tragamonedas.
        Si gana se le acreditara el monto correspondiente, de lo contrario se le 
        descontara de acuerdo al resultado obtenido. de acuerdo a la siguiente tabla.`);                         // TODO
        console.log(`-`.repeat(80));
        console.log(`depende de la fruta obtienes una yapa`);
        console.log(`Si el simbolo repetido es 🍎 obtienes 200 x cada 🍎`);
        console.log(`Si el simbolo repetido es 🍋 obtienes 100 x cada 🍋`);
        console.log(`Si el simbolo repetido es 🍇 obtienes 300 x cada 🍇`);
        console.log(`Si el simbolo repetido es 🍊 obtienes 200 x cada 🍊`);
        console.log(`Si el simbolo repetido es 🍉 obtienes 100 x cada 🍉`);
        console.log(` Opciones de Apuestas: 
        Probabilidades: 0 simbolos iguales: pierde la apuesta.
        Probabilidades: 2 simbolos iguales: salva la apuesta.
        Probabilidades: 3 simbolos iguales: gana la apuesta x 3
        Probabilidades: 4 simbolos iguales: gana la apuesta x 5
        Probabilidades: 5 simbolos iguales: gana la apuesta x 7.`); // TODO  
        console.log(`-`.repeat(80));
        //    console.log(` Las probabiliddes de ganar son     ${this.getProbabilidades()} a 1.`); // TODO  
        console.log(centrar(` Puede ganar hasta 💲💲💲     ${this.formatoDinero(this.apuestaMaxima * 3)}    💲💲💲`, 80)); // TODO  
        console.log(`=`.repeat(80)); 1
        console.log(` Uds. Dispone de ${this.formatoDinero(this.dineroDisponible)} para apostar.`);
        console.log(`-`.repeat(80));
      }
    //---------------------------------------------------------------------------
    protected chequearResultado(): void {

    }
}