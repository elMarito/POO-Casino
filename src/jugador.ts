export class Jugador {
    private nombre: string;
    private edad: number;
    private fondos: number
    constructor(nombre: string, edad: number, fondos: number = 0) {
        this.nombre = nombre;
        this.edad = edad;
        this.fondos = fondos;
    }
    public getNombre(): string { return this.nombre }
    public getFondos(): number { return this.fondos }
    public getEdad(): number { return this.edad }
    public agregarFondos(dinero: number): void { this.fondos += dinero }
    // public cobrar(dinero: number): void { this.fondos += dinero }
    public apostar(dinero: number): void { this.fondos -= dinero }
}