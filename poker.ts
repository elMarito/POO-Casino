/*enums = Enumerables - Asigna numeros a unas constantes */
enum Palo {
  Picas,
  Diamantes,
  Corazones,
  Treboles,
}

enum RangoCartas {
  Ass = 1,
  Dos,
  Tres,
  Cuatro,
  Cinco,
  Seis,
  Siete,
  Ocho,
  Nueve,
  Diez,
  Jota,
  Reina,
  Rey,
}

/* Tipos*/
export type Carta = {
  palo: Palo;
  rango: RangoCartas;
};


export class Mazo {
  private cartas: Carta[] = [];

 /*El constructor inicializa la propiedad "cartas".*/
  constructor() {
    /* El bucle exterior recorre los cuatro palos*/
    for (let palo = 0; palo < 4; palo++) {
        /* y el bucle interior recorre los 13 rangos de cartas*/
      for (let rango = 1; rango <= 13; rango++) {
        /*Crea un objeto del tipo "Carta" con las propiedades "palo" y "rango" de la clase "Mazo".*/
        this.cartas.push({ palo: palo, rango: rango });
      }
    }
  }

/* Funcion mezclar las cartas de un mazo de manera aleatoria*/
/* Se itera sobre el arreglo de cartas, desde el último elemento y terminando en el índice 1.
En cada iteración, se genera un número aleatorio j entre 0 y el índice actual i utilizando Math.random().
Se intercambia la carta en la posición i con la carta en la posición j.*/
  mezclar() {
    for (let i = this.cartas.length - 1; i > 0; i--) { 
        /*Math.floor() redondea hacia abajo un número decimal y lo convierte en un número entero. 
        y se multiplica por (i + 1) para generar un número aleatorio entre 0 y i.*/
      const j = Math.floor(Math.random() * (i + 1));
      [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
    }
  }
/* la funcion dar devuelve la última carta del arreglo "cartas" 
y elimina esa carta del arreglo utilizando el método pop().*/
  dar() {
    return this.cartas.pop();
  }
}

/* Probamos */

// const mazo = new Mazo();
// mazo.mezclar();

// const mano: Carta[] = [];

// /*Este código se utiliza para crear una mano de juego de 5 cartas, 
// obteniendo las cartas del objeto mazo y agregándolas al arreglo "mano".*/
// for (let i = 0; i < 5; i++) { //Dentro del bucle que itera 5 veces llama al método dar() del objeto mazo.
//   const carta = mazo.dar(); //El valor de retorno de dar() se almacena en la constante carta.
//   if (carta) { //if se asegura de que la constante carta no esta vacío.
//     mano.push(carta); //Si carta tiene un valor definido, se agrega a la mano del jugador utilizando el método push() del arreglo mano.
//   }
// }

//console.log(mano);