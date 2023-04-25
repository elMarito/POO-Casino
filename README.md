# POO-Final-2do-Cuatrimestre

### Grupo de Trabajo:
- Alvarez Torriglia Facundo
- Escobar Mariano
- Patronelli Mario
- Reyes Javier

### paquetes utilizados:
en Node.js :
```shell
npm i [readline-sync]
npm i [@types/node]
npm i [ascii-text-generator]
```
<!-- 
npm i beepbeep
npm i ts-node // para no crear *.JS
-->
- [readline-sync](https://www.npmjs.com/package/readline-sync)
- [@types/node](https://www.npmjs.com/package/@types/node)
- [ascii-text-generator](https://www.npmjs.com/package/ascii-text-generator)

### Como ejecutarlo ?
en Node.js:
para ejecutar el programa, primero instalar las dependencias, despues ejecutar:
```shell
git clone https://github.com/elMarito/POO-Casino.git
cd POO-CASINO
npm install
node dist/index.js

```

### UML:
#### Diagrama de Clases:

![Imagen de Ejemplo](https://raw.githubusercontent.com/elMarito/POO-Casino/desarrollo/UML.drawio.png)

```mermaid
classDiagram

JuegoDeCasino <|-- Tragamonedas : hereda
JuegoDeCasino <|-- Poker : hereda
JuegoDeCasino <|-- Ruleta : hereda

Poker "1" --* "1" Casino: composición fuerte
Ruleta "1" --* "1" Casino: composición fuerte
TragamonedasClasico "1" --* "1" Casino: composición fuerte
TragamonedasMultilinea "1" --* "1" Casino: composición fuerte

Tragamonedas <|-- TragamonedasClasico : hereda
Tragamonedas <|-- TragamonedasMultilinea : hereda

Tragamonedas *-- Carrete : composición fuerte

class Casino {
    - nombre: string
    - direccion: string
    - localidad: string
    - poker: Poker
    - ruleta: Ruleta
    - tragamonedasClasico: TragamonedasClasico
    - tragamonedasMultilinea: TragamonedasMultilinea
    
    + recibir(): void
    - chequearFondos(): void
    - solicitarFondos(): void
    - presentarCasino(): void
    - elegirJuego(): number
}
%%--------------------------------------------
class Carrete {
- simbolos: string[]
- posicion: number
- velocidad: number

+ verSimbolo(): string
+ getRetraso(): number
+ getVelocidad(): number
+ desacelerar(): number
+ resetearVelocidad(): void
+ girar(): void
}
%%--------------------------------------------
class Tragamonedas {
    <<Super>>
    - carretes: string[]
    - simbolos: string

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
    + presentarJuego(): void
    + solicitarCreditos(): void
    + iniciarJuego(): void
}
%%--------------------------------------------
class Ruleta {
    + presentarJuego(): void
    + solicitarCreditos(): void
    + iniciarJuego(): void
}
%%--------------------------------------------
<<Abstract>> JuegoDeCasino
class JuegoDeCasino {
    - nombre: string
    - apuestaMinima: number
    - apuestaMaxima: number
    - dineroDisponible: number //fondos
    - dineroApostado: number
    
    + getNombre(): string
    + jugar(): void
    # presentarJuego()* void
    # iniciarJuego()* void
    # solicitarFondos(): void
    # solicitarCreditos()* number
    # pagarApuesta(): void
    # descontarApuestaPerdida(): void
    # apuestaEsValida(): boolean
}
%%--------------------------------------------
class Jugador {
    - nombre: string
    - edad: number
    - fondos: number

+ getNombre(): string
    + getFondos(): number
    + getEdad(): number
    + agregarFondos(dinero: number): void
    + apostar(dinero: number): void
}
%%--------------------------------------------
link JuegoDeCasino "https://github.com/elMarito/POO-Casino/blob/main/src/JuegoDeCasinoAbstract.ts" "JuegoDeCasinoAbstract.ts"
link Tragamonedas "https://github.com/elMarito/POO-Casino/blob/main/src/tragamonedas.ts" "tragamonedas.ts"
link Carrete "https://github.com/elMarito/POO-Casino/blob/main/src/tragamonedas.ts" "tragamonedas.ts"
link Poker "https://github.com/elMarito/POO-Casino/blob/main/src/poker.ts" "poker.ts"
link Ruleta "https://github.com/elMarito/POO-Casino/blob/main/src/ruleta.ts" "ruleta.ts"
link Casino "https://github.com/elMarito/POO-Casino/blob/main/src/casino.ts" "casino.ts"
link TragamonedasClasico "https://github.com/elMarito/POO-Casino/blob/main/src/TragamonedasClasico.ts" "TragamonedasClasico.ts"
link TragamonedasMultilinea "https://github.com/elMarito/POO-Casino/blob/main/src/TragamonedasMultilinea.ts" "TragamonedasMultilinea.ts"
link Jugador "https://github.com/elMarito/POO-Casino/blob/main/src/jugador.ts" "jugador.ts"
```

<!--PARA EDITAR MARKDOWN FILES:  https://stackedit.io/app# -->
