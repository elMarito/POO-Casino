import { Tragamonedas } from "./tragamonedas";

export class TragamonedasClasico extends Tragamonedas {
    private linea1: number;
    constructor(apuestaMinima: number, apuestaMaxima: number) {
        super(apuestaMinima, apuestaMaxima);
        this.nombre = "Tragamonedas (Clasico)";
    }

}