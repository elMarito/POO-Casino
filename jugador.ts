import { JuegoDeCasino } from "./JuegoDeCasinoAbstract";

export class Jugador {
    private nombre: string;
    private edad: number;
    private fondos: number
    constructor(nombre: string, edad: number, fondos: number) {
        this.nombre = nombre;
        this.edad = edad;
        this.fondos = fondos;
    }
    public getNombre(): string { return this.nombre }
    public getFondos(): number { return this.fondos }

    public getEdad(): number { return this.edad }
    public esMayorDeEdad(): boolean { return this.edad >= 18 }
    public agregarFondos(dinero: number): void { this.fondos += dinero }    
    
    // public jugar(juego:JuegoDeCasino): void { juego.jugar(this) }
    // public jugar(juego:JuegoDeCasino): void { juego.jugar() }

    public apostar(dinero: number): void { this.fondos -= dinero }
    // public pagarApuesta(dinero: number): void { this.fondos -= dinero }
    public cobrar(dinero: number): void { this.fondos += dinero }
}