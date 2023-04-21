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

}