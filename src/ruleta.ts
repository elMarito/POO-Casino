import * as readlineSync from "readline-sync"; // formato typscrypt

import { JuegoDeCasino } from "./JuegoDeCasinoAbstract";

export class Ruleta extends JuegoDeCasino {

    public constructor(){
        super(100,5000)
        this.nombre="Ruleta";}

        public presentarJuego(): void {
            console.log(`=`.repeat(80));
            console.log(`Usted a elegido el juego Ruleta, "Mi casa mis reglas"`);
            console.log(`-`.repeat(80));
            console.log(`Puede elegir un numero de 0 a 36 o un color entre el rojo y negro 
            hasta que la casa haga girar la bola.
             
             Si el jugador gana aumenta su dinero y si pierde se le resta.                         
             Sus probabilidades de ganar son 1 en 36`);  
            console.log(`-`.repeat(80));
            console.log(` Uds. Dispone de $ ${this.dineroDisponible.toLocaleString()} para apostar.`);
            console.log(`=`.repeat(80));
        }
            
            public solicitarCreditos(): number {
                if (this.dineroDisponible < this.apuestaMinima) {
                  console.log("No tienes suficientes créditos para iniciar el juego."); // Se muestra un mensaje si no hay suficientes créditos
                  return 0; // Se devuelve 0 si no hay suficientes créditos
                }
                let respuesta = readlineSync.keyInYNStrict("Quiere que la ruleta gire?");
                if (respuesta)
                return this.apuestaMinima;
                else throw new Error(`Usted Salio del juego.`);}

                public iniciarJuego(): void {
                    let dinero:number = 0;
                    do{
                      console.log(`-`.repeat(80));
                      dinero = this.solicitarCreditos();
                      if (dinero === 0) /* continuar = false; */ throw new Error(`Operacion cancelada. Fondos insuficientes.`);
                      this.dineroApostado = dinero; // Se solicitan 100 créditos
                      console.log("Girando ruleta...");
                      // Generamos un número aleatorio entre 0 y 36 para determinar quién ganó
                      const ganador = Math.floor(Math.random() * 2);
                      if (ganador === 0) {
        console.log("¡Felicidades usted ganó!");
        let dineroGanado:number = this.dineroApostado * 2
        this.pagarApuesta(dineroGanado)
      } else {
        this.descontarApuestaPerdida();
        console.log("¡Lo siento usted perdió!");
      }
      console.log(` Uds. Dispone de $ ${this.dineroDisponible.toLocaleString()} para apostar.`);
    }
    while (this.dineroDisponible >= this.apuestaMinima)
}
              };


          
    
