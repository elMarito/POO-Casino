import { JuegoDeCasino } from "./JuegoDeCasinoAbstract";
import readlineSync from 'readline-sync';
//=============================================================================
export class Tragamonedas extends JuegoDeCasino {
  // private carretes: string[];
  protected carretes: Carrete[];
  protected SIMBOLOS: string[] = ["🍎", "🍊", "🍇", "🍓", "🍒", "🍋", "🍉", "🍌"]; //8
  // const SIMBOLOS: string[] =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  // const SIMBOLOS: string[] = ["🍎", "🍊", "🍇", "🍓", "🍒", "🍋"]; // 6
  // const SIMBOLOS: string[] = [ "🥝", "🍈", "🍉", "🍌", "🍍", "🍏", "🍐", "🍑"];    // "coco", "mango
  // const SIMBOLOS: string[] = [ "🍅", "🍆", "🌽", "🌶", "🍄", "🥑", "🥒", "🥔", "🥕"];
  // console.log(SIMBOLOS);
  //---------------------------------------------------------------------------
  constructor(apuestaMinima: number, apuestaMaxima: number, CANTIDAD_CARRETES?: number) {
    super(apuestaMinima, apuestaMaxima);
    this.nombre = "Tragamonedas";

    this.emojis.palanca = "📍"; //agrego simbolo a la lista base de emojis.
    if (CANTIDAD_CARRETES === undefined) CANTIDAD_CARRETES = 3;
    // this.carretes = new Array(CANTIDAD_CARRETES).fill("."); //.map(() => this.generarSimboloAleatorio());
    const RETRASO: number = 8000;
    this.carretes = [];
    for (let i = 0; i < CANTIDAD_CARRETES; i++) {
      // this.carretes.push(new Carrete(i * RETRASO
      this.carretes.push(
        new Carrete(this.getRandomIntInclusive(i * RETRASO, (i + 1) * RETRASO)
          , 0, this.reordenar([...this.SIMBOLOS])))
    }

    // this.carretes = this.carretes.map(() => this.generarSimboloAleatorio());

    // ideas de pago        // TODO
    // let coeficientes = [[1, 0], [2, 2], [3, 3]] // para 3 carretes
    // let coeficientes = [[1, 0], [2, 2], [3, 3], [4, 5], [5, 7]]// para 5 carretes
  }
  //---------------------------------------------------------------------------
  // Metodos de la interfaz.---------------------------------------------------   
  public getNombre(): string { return this.nombre; }
  //---------------------------------------------------------------------------
  // public jugar(): void {
  //   this.presentarJuego();
  //   // this.inicializarJuego();
  //   try {
  //     this.solicitarFondos();
  //     this.iniciarJuego();
  //     // this.chequearResultado();
  //     // this.pagarApuesta();
  //     return;
  //   } catch (error) {      // result = error.message; // error under useUnknownInCatchVariables 
  //     console.clear();
  //     if (error instanceof Error) {
  //       console.log(error.message);
  //     } else if (typeof error === "string") {
  //       console.log(error);
  //     }
  //   }
  //   finally {
  //     console.log("Ud. Recibe: ", this.dineroDisponible);
  //     this.dineroDisponible = 0;
  //   }
  // }
  //---------------------------------------------------------------------------
  public presentarJuego(): void {
    const centrar = (str: string, length: number, char: string = ' ') =>
      str.padStart((str.length + length) / 2, char).padEnd(length, char);
    console.clear();
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
    console.log(` Opciones de Apuestas: 
    Probabilidades: 0 simbolos iguales: pierde la apuesta.
    Probabilidades: 2 simbolos iguales: salva la apuesta.
    Probabilidades: 3 simbolos iguales: gana la apuesta x 3.`); // TODO  
    console.log(`-`.repeat(80));
    //    console.log(` Las probabiliddes de ganar son     ${this.getProbabilidades()} a 1.`); // TODO  
    console.log(centrar(` Puede ganar hasta 💲💲💲     ${this.formatoDinero(this.apuestaMaxima * 3)}    💲💲💲`, 80)); // TODO  
    console.log(`=`.repeat(80)); 1
    console.log(` Uds. Dispone de ${this.formatoDinero(this.dineroDisponible)} para apostar.`);
    console.log(`-`.repeat(80));
  }
  //---------------------------------------------------------------------------
  // private inicializarJuego(): void {
  //   // this.carretes.forEach(carrete => carrete = this.generarSimboloAleatorio())
  //   // this.carretes = [..."A", "B", "A"];
  //   //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //   // console.debug("inicializado: ", this.carretes);

  //   // this.monstrarSimbolos(" x");
  //   // this.carretes.forEach(car => console.log(car.verSimbolo()));
  //   // console.log()
  // }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  // private solicitarFondos(): void {
  //   let dinero: number = 0;
  //   do {
  //     console.log(`-`.repeat(80)); // 💲
  //     console.log(`❗ Por favor ingrese la candidad de dinero para Jugar : 
  //     (Apuesta minima: ${this.formatoDinero(this.apuestaMinima)}, Maxima: ${this.formatoDinero(this.apuestaMaxima)}).
  //     (ENTER): para cancelar y abandonar el juego.`);
  //     dinero = Number(readlineSync.question("Fondos: "));
  //     if (dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
  //     // if (dinero > 0) apuestaEsValida(dinero);
  //   } while (!this.apuestaEsValida(dinero));
  //   // si cancela la apuesta o si no dispone de dinero tirar error
  //   this.dineroDisponible = dinero;
  // }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  // la puse public porque esta protected en JuegoDeCasino sino seria private
  public iniciarJuego(): void {
    // let continuar: boolean = true;
    let dinero: number = 0;
    do {
      // console.clear();
      console.log(`-`.repeat(80));
      this.monstrarSimbolos(this.emojis.palanca + "\n", "                ");
      dinero = this.solicitarCreditos();//this.emojis.warn===🔔
      if (dinero === 0) /* continuar = false; */ throw new Error(`Operacion cancelada. Ud. abandono el Juego.`);
      if (this.apuestaEsValida(dinero, this.dineroDisponible)) {
        this.dineroApostado = dinero;
        this.accionarPalanca();
        this.chequearResultado();
      }
    } while (this.dineroDisponible > this.apuestaMinima);
    // if (dinero > 0) apuestaEsValida(dinero, min, max);
    // } while (continuar);
    // mensaje: 1 QUE SUERTE!🏆 ud a ganado 💲 $ 99999999.
    // mensaje: 2 Mala Suerte!. Volver a intentarlo ?
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  public solicitarCreditos(): number {
    console.log(`-`.repeat(80));
    console.log(`Ud. dispone de ${this.formatoDinero(this.dineroDisponible)} para apostar. 
    Ingrese la cantidad destinada a este giro.
    Al presionar (ENTER) se accionara ${this.emojis.palanca} el tragamonedas.
    (si no ingresa un monto al presionar (ENTER) abandonara el juego.)`);
    const dinero: number = Number(readlineSync.question("Apuesta: "));
    // TODO               verificar si pone letras

    return dinero;
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  private monstrarSimbolos(proceso: string, girando: string = ` girando...: ${this.emojis.fingerCross} `) {
    // console.table(this.carretes);
    // console.log("********* resultado:    ", this.carretes.map(carrete => `[${carrete}]`).join(" "));
    // console.log("********* resultado:    ", this.carretes.map(carr => `[${carr.verSimbolo()}]`).join(" "));
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // process.stdout.write(`\r girando...: 🤞  ${this.carretes.map(carr => carr.verSimbolo()).join(" ")} ${proceso}`);
    // this.emojis.fingerCross 🤞

    process.stdout.write(`\r${girando}  ${this.carretes.map(carr => "[" + carr.verSimbolo() + "]").join("")} ${proceso}`);
    // process.stdout.write(`\r girando...: 🤞  ${this.carretes.forEach(carr => { return ("[" + carr.verSimbolo() + "]") })} ${proceso}`);
  }
  //---------------------------------------------------------------------------
  private accionarPalanca(): void {
    // let fibo: { n1: number, n2: number } = { n1: 1, n2: 1 };
    // const next = (fibo: { n1: number, n2: number }) => {
    //   let sum: number = fibo.n1 + fibo.n2;
    //   fibo.n1 = fibo.n2;
    //   return fibo.n2 = sum;
    // };
    // let presets: string[][] = [
    //   ["🍎", "🍋", "🍎"],
    //   ["🍊", "🍎", "🍎"],
    //   ["🍇", "🍋", "🍋"],
    //   ["🍓", "🍎", "🍎"],
    //   ["🍒", "🍎", "🍎"],
    //   ["🍋", "🍌", "🍇"],
    //   ["🍉", "🍎", "🍎"],
    //   ["🍌", "🍌", "🍌"]]
    // Resetear Carretes
    this.carretes.forEach(carrete => carrete.resetearVelocidad());
    // this.carretes.forEach(carrete =>{carrete.setVelocidadInicial(0)})
    // girando....
    let proceso: { [key: string]: string } = { "-": "/", "/": "|", "|": `\\`, "\\": "-" };
    let pp: string = proceso["-"];
    // let proceso: { [key: string]: string } = { "(  ": " _ ", " _ ": "  )", "  )": " ¯ ", " ¯ ": "(  " };
    // let pp: string = proceso[ "(  "];

    const VELOCIDAD_INICIAL: number = 100000;
    // for (let index = VELOCIDAD_INICIAL; index >= 0; index--) {//<-para girar alreves
    // let temporal:string;
    let velocidad: number = 0;
    for (let index = 0; index < VELOCIDAD_INICIAL; index++) {
      // temporal=index.toString().padStart(6)+" -> ";
      this.carretes.forEach((rod, i) => {
        if (index === (rod.getRetraso() + rod.getVelocidad())) { rod.girar(); rod.desacelerar(index + 1); }
        // if (index === (rod.getRetraso() + rod.getVelocidad())) { rod.girar(); rod.desacelerar(next(fibo)); }
        // if (index === rod.getVelocidad()) rod.desacelerar(10)
        // process.stdout.write(`\r 1:[ ${rod.verSimbolo()} ${rod.getRetraso()} ${rod.getVelocidad()} ]---`);
        // temporal += (`${i.toString().padStart(4)}:[ ${rod.verSimbolo()} ${rod.getRetraso()} ${rod.getVelocidad().toString().padStart(6)} ]---`);
      })
      if (index === velocidad + 1) {
        pp = proceso[pp];
        velocidad = velocidad + index;
      }
      // process.stdout.write(`\r ${temporal} ---`);
      this.monstrarSimbolos(pp);      // this.monstrarSimbolos(index.toString());
    }
    this.monstrarSimbolos(" --->  ");
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // this.carretes.forEach(carrete => carrete = this.generarSimboloAleatorio());
  }
  //---------------------------------------------------------------------------
  private chequearResultado(): void {
    // //quitar duplicados de un array
    // const unique = new Set(this.carretes.map(carr => carr.verSimbolo()))
    // switch (unique.size) {
    //   case 1: /* gano */        break;
    //   case 2: /* salvo */        break;
    //   case 3: /* perdio */        break;
    // }

    let resultados: (string | number)[][] = []; //[["z", 1], ["b", 44]]
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
      if (dineroGanado > this.dineroApostado) this.pagarApuesta(dineroGanado)
      else console.log(this.emojis.luck, " Pudo ser peor! salvo la apuesta.");
      // this.dineroDisponible += dineroGanado; //🍀
    }
    else {
      this.descontarApuestaPerdida();
      // this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
    }
  }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  // private pagarApuesta(ganancia: number): void {
  //   console.log(this.emojis.happy, this.emojis.award, ` ¡FELICIDADES! Ganaste 🥂 💲 ${ganancia} `, this.emojis.money);
  //   this.dineroDisponible += ganancia;
  // }
  // private descontarApuestaPerdida(): void {
  //   console.log(this.emojis.sad, " Lo siento pero perdiste, inténtalo de nuevo.");
  //   // mensaje: 2 Mala Suerte!. Volver a intentarlo ?
  //   this.dineroDisponible = this.dineroDisponible - this.dineroApostado;
  //   // console.log(`-`.repeat(80));
  //   // let dinero = Number(readlineSync.question(
  //   //   `Ud. dispone de $ ${this.dineroDisponible} para apostar. 
  //   //   Ingrese la cantidad destinada a este giro.
  //   //   Al presionar (ENTER) se accionara el tragamonedas.
  //   //   (si no ingresa un monto al presionar (ENTER) abandonara el juego.)
  //   //   : `));
  //   // if (dinero === 0) throw new Error("Operacion cancelada. Ud. abandono el Juego.");
  // }
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  // borrar?
  private generarSimboloAleatorio(): string {

    // const simbolos = ["A", "B", "C", "D", "E"];
    const simbolos = ["🍎", "🍊", "🍇", "🍓", "🍒", "🍋"];
    //     [ "🥝", "coco", "🍈", "🍉", "🍌", "🍍", "mango", "🍏", "🍐", "🍑"
    //     , "🍅", "🍆", "🌽", "🌶", "🍄", "🥑", "🥒", "🥬", "🥦", "🥔", "🧄", "🧅", "🥕"
    //----------------------------------------------------------------------------- 
    const indice = Math.floor(Math.random() * simbolos.length);
    // console.log({indice});    
    return simbolos[indice];
  }
  //---------------------------------------------------------------------------
  // Metodos propios.----------------------------------------------------------
  // private apuestaEsValida(dinero: number, max?: number): boolean {
  //   if (max === undefined) max = this.apuestaMaxima;
  //   if (dinero >= this.apuestaMinima && dinero <= max) return true;
  //   // throw new Error("Operacion cancelada. Ud. abandono el Juego.");
  //   console.log(this.emojis.error.repeat(80));
  //   console.error(this.emojis.error, "ERROR! Apuesta invalida! la apuesta ingresada esta fuera de los limites.");
  //   console.log(`!`.repeat(80));
  //   return false;
  // }
  //---------------------------------------------------------------------------
  private reordenar(simbolos: string[]): string[] {
    for (let i = simbolos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [simbolos[i], simbolos[j]] = [simbolos[j], simbolos[i]]; // intercambiamos los elementos
    }
    return simbolos;
  }
  // //---------------------------------------------------------------------------
  // private formatoDinero(dinero: number): string {
  //   // 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲  this.emojis.money
  //   return this.emojis.money + " " + new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(dinero);
  //   // return this.emojis.money +" "+ new Intl.NumberFormat('es-AR', { currency: 'ARS', style: 'currency', maximumFractionDigits: 2 }).format(dinero);
  //   //  return new Intl.NumberFormat("es-AR", { currency: "$", style: "currency", maximumFractionDigits: 2 }).format(dinero);
  // }
  // private getRandomIntInclusive(min: number, max: number) {
  //   min = Math.ceil(min);
  //   // max = Math.floor(max);
  //   return Math.floor(Math.random() * (Math.floor(max) - min + 1) + min);
  // }
}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
class Carrete {
  // private const VELOCIDAD_INICIAL: number = 200000;
  private simbolos: string[];
  private posicion: number;
  private retraso: number;
  private velocidad: number;  // lapso:number, coeficiente:number;
  constructor(retraso: number, velocidad: number, simbolos: string[]) {
    this.simbolos = simbolos;
    this.posicion = 0;//random Math.random()*simbolos.lenght
    this.retraso = retraso;
    this.velocidad = velocidad; //0
  }
  public verSimbolo(): string { return this.simbolos[this.posicion] }
  public getRetraso(): number { return this.retraso }
  public getVelocidad(): number { return this.velocidad }
  public desacelerar(puntos: number): void { this.velocidad += puntos }
  public resetearVelocidad(): void { this.velocidad = 0;/* this.VELOCIDAD_INICIAL */ } //resetea velocidad.
  // public setGetVelocidad(velocidad: number): number { return this.velocidad = velocidad }
  public girar(/* velocidad: number */): void {
    // let pos: number = velocidad % this.simbolos.length;
    this.posicion = (this.posicion === this.simbolos.length - 1) ? 0 : this.posicion + 1;
  }
}