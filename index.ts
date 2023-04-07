
//=============================================================================
import { Casino } from "./casino";
import { Tragamonedas } from "./tragamonedas";
// import { JuegoDeCasino } from "./juegoDeCasino";
// import { Ruleta } from "./ruleta";
// import { BlackJack } from "./blackJack";
//-----------------------------------------------------------------------------
// const blackJack = new Blackjack (10 , 5)
// const ruleta = new Ruleta(20,1)

const casino = new Casino("Real", "algun lugar", "una localidad"
    , [new Tragamonedas(100, 10000)])

// casino.agregarJuego(new Ruleta(1,100,10))
// casino.agregarJuego(new Ruleta(2,1000,5))
// casino.agregarJuego(new BlackJack(1, 100, 10))

// console.log(casino)
console.table(casino)

casino.Jugar()



// const libreria: GestorLibros = new GestorLibros();

// libreria.insertarLibrosDesdeArchivo('../librosDB.txt');
// const readlineSync = require('readline-sync');

// let evento: number = 0, datos: string[];
// do {
//     console.log(`------------------------------------`);
//     evento = Number(readlineSync.question(
//         `Sistema de gestion de libros (que desea hacer): 
//         1:  agregar.
//         2:  consultar.
//         3:  modificar.
//         4:  eliminar.
//         (ENTER): salir
//         : `));
//     if (evento > 0) solitarDatos(evento);
// } while (evento !== 0)

// //-----------------------------------------------------------------------------
// function solitarDatos(evento: number): void {
//     let libroDatos: string[];
//     switch (evento) {
//         case 1: //solicitar datos del libro 
//             libroDatos = solicitarDatosDelLibro(/* evento */);
//             if (libroDatos.length > 0)
//                 libreria.insertar(new Libro(libroDatos[0], libroDatos[1], libroDatos[2], libroDatos[3], libroDatos[4]));
//             break;

//         case 2: //consultar
//             libroDatos = solicitarISBN(evento);
//             if (libroDatos[0] === "")
//                 console.table(libreria.getLibros());
//             else
//                 console.log(libreria.consultar(libroDatos[0]));
//             break;

//         case 3: //modificar         
//             libroDatos = solicitarDatosDelLibro(/* evento */);
//             if (libroDatos.length > 0) {
//                 const libro: Libro = new Libro(libroDatos[0], libroDatos[1], libroDatos[2], libroDatos[3], libroDatos[4]);
//                 libroDatos = solicitarISBN(evento);
//                 libreria.modificar(libroDatos[0], libro);
//             }
//             break;

//         case 4: //eliminar
//             libroDatos = solicitarISBN(evento);
//             libreria.eliminar(libroDatos[0]);
//             break;

//         default: console.log(`ERROR! Opcion incorrecta intente de nuevo.`);
//             break;
//     }
// }
// function solicitarISBN(evento: number): string[] {
//     let datos: string[] = []
//     switch (evento) {
//         case 2://consultar
//             datos.push(readlineSync.question(`Ingrese el Nro ISBN del libro a consultar (ENTER=todos): `));
//             break;
//         case 3://modificar
//             //            datos.push(readlineSync.question(`Ingrese el Nro ISBN del libro nuevo: `));
//             datos.push(readlineSync.question(`Ingrese el Nro ISBN del libro a ser reemplazado: `));
//             break;
//         case 4://eliminar
//             datos.push(readlineSync.question(`Ingrese el Nro ISBN del libro a eliminar: `));

//     }
//     return datos
// }

// function solicitarDatosDelLibro(/* evento: number */): string[] {
//     let datos: string[], confir: string = "";
//     //    let dato: string= "";
//     do {
//         datos = [];
//         console.log(`Complete los siguients datos: (* obligatorios)`);
//         datos.push(readlineSync.question(`* ISBN Nro: `)); //hacerlo obligatorio. TO DO
//         datos.push(readlineSync.question(`* autor: `)); //hacerlo obligatorio. TO DO
//         datos.push(readlineSync.question(`* titulo: `)); //hacerlo obligatorio. TO DO
//         datos.push(readlineSync.question(`* tematica: `)); //hacerlo obligatorio. TO DO
//         datos.push(readlineSync.question(`editorial: `));
//         console.log(`ingreso los siguientes datos:`);
//         console.table(datos);
//         confir = readlineSync.question(`los datos estan correctos? (s/n): `);
//     } while (confir.toUpperCase() === "N")
//     return (confir.toUpperCase() === "S") ? datos : [];    
//}

// solucion alternativa. para traer los datos del archivo
// function importarLibrosDesdeArchivo(archivo:string):string[][] {
//     let texto: string = fs.readFileSync('../librosDB.txt', 'utf8');
//     let registros: string[][] = texto.split('\r\n').map(linea => linea.split('|'));
//     // registros.slice(1, registros.length).forEach(reg => {
//     //   this.insertar(new Libro(reg[0], reg[1], reg[2], reg[3], reg[4]))
//     // })
//     return registros.slice(1, registros.length);
// }