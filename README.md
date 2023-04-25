# POO-Final-2do-Cuatrimestre

### paquetes utilizados:
[ascii-text-generator](https://www.npmjs.com/package/ascii-text-generator)

en Node.js :
```shell
npm i readline-sync
npm i @types/node
npm i ascii-text-generator
npm i beepbeep

npm i ts-node // para no crear *.JS

```


### Grupo de Trabajo:
- Alvarez Torriglia Facundo
- Escobar Mariano
- Patronelli Mario
- Reyes Javier

![Imagen de Ejemplo](https://picsum.photos/id/0/5000/3333)

### UML:
#### Diagrama de Clases:
```mermaid
classDiagram

%%Casino "0..n" o-- "1" JuegoDeCasino

%% JuegoDeCasino <|-- Poker: herencia
%% JuegoDeCasino <|-- Ruleta: herencia
Poker "1" --o "1" Casino: composision debil
Ruleta "1" --o "1" Casino: composision debil
TragamonedasClasico "1" --o "1" Casino: composision debil
TragamonedasMultilinea "1" --o "1" Casino: composision debil

JuegoDeCasino<|-- Tragamonedas : hereda
JuegoDeCasino<|-- Poker : hereda
JuegoDeCasino<|-- Ruleta : hereda

Tragamonedas <|-- TragamonedasClasico : hereda
Tragamonedas <|-- TragamonedasMultilinea : hereda
%%--------------------------------------------
class Casino {
    - nombre: string
    - direccion: string
    - localidad: string
    + juego: JuegoDeCasino[]

    + jugar(n: number):void
    + cargarCredito():void
}


    %% presentarJuego(): void
    %% inicializarJuego(): void
    %% solicitarApuesta(): void
    %% iniciarJuego(): void
    %% chequearResultado(): void
    %% pagarApuesta(ganancia:number): void
    %% descontarApuestaPerdida(): void
    %% azar(): void

%%--------------------------------------------
class Tragamonedas {
    <<Super>>
    - carretes: string[]

    + jugar(): void
    + presentarJuego(): void
    + inicializarJuego(): void
    + solicitarApuesta(): void
    + iniciarJuego(): void
    + chequearResultado(): void
    + pagarApuesta(ganancia:number): void
    + descontarApuestaPerdida(): void
}
%%--------------------------------------------
class TragamonedasClasico {
  - simbolosYapa: string[];

  + presentarJuego(): void 
  # chequearResultado(): void
  # yapa(simbolo: string): number
}
%%--------------------------------------------
class TragamonedasMultilinea {
  - comodines: [string, string, number][]

  + presentarJuego(): void
  - monstrarSimbolos2(proceso: string, girando: string)
  + iniciarJuego(): void
  # chequearResultado(): void
  - addComodines(resultados: [string, number][]): number
}
%%--------------------------------------------
class Poker {
    - cartas: string[]

    + jugar():void
    - presentarJuego(): void
    + repartirCartas():void
}
%%--------------------------------------------
class Ruleta {
    - numerosSalidos: number[]
    + iniciarGiro():void
    + detenerGiro():void
}
%%--------------------------------------------
<<Super>> JuegoDeCasino
class JuegoDeCasino {
    - nombre: string
    - apuestaMinima: number
    - apuestaMaxima: number
    - dineroDisponible: number //fondos
    - dineroApostado: number

    + getNombre(): string
    + jugar(): void
    # presentarJuego(): void
    # iniciarJuego(): void
    %% inicializarJuego(): void
    # solicitarFondos(): void
    # solicitarCreditos(): void
    - chequearResultado(): void
    # pagarApuesta(ganancia:number): void
    # descontarApuestaPerdida(): void
    - azar(): void
}
%%--------------------------------------------
class Jugador{
    - nombre: string
    - edad: number
    - fondos: number

    + getNombre(): string
    + getFondos(): number
    + getEdad(): number
    + agregarFondos(dinero: number): void
    + apostar(dinero: number): void
}
```

#### Como ejecutarlo ?
en Node.js:

para ejecutar el programa, primero instalar las dependencias, despues ejecutar:
```shell
git clone https://github.com/elMarito/POO-Casino.git
cd POO-CASINO
npm install
node dist/index.js

```