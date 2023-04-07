export interface iJuegoDeCasino {
    apuestaMinima: number;
    dineroDisponible: number;
    dineroApostado: number;
    // jugador: string;
    jugar(): void;
    presentarJuego(): void;
    // inicializarJuego(): void;
    // solicitarApuesta(): void;
    // iniciarJuego(): void;
    // chequearResultado(): void;
    // pagarApuesta(ganancia:number): void;
    // descontarApuestaPerdida(): void;
    // azar(): void;
}