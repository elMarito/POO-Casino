"use strict";
exports.__esModule = true;
exports.Jugador = void 0;
var Jugador = /** @class */ (function () {
    function Jugador(nombre, edad, fondos) {
        this.nombre = nombre;
        this.edad = edad;
        this.fondos = fondos;
    }
    Jugador.prototype.getNombre = function () { return this.nombre; };
    Jugador.prototype.getFondos = function () { return this.fondos; };
    Jugador.prototype.getEdad = function () { return this.edad; };
    Jugador.prototype.esMayorDeEdad = function () { return this.edad >= 18; };
    Jugador.prototype.agregarFondos = function (dinero) { this.fondos += dinero; };
    // public jugar(juego): void { juego.jugar() }
    Jugador.prototype.apostar = function (dinero) { this.fondos -= dinero; };
    // public pagar(dinero: number): void { this.fondos -= dinero }
    Jugador.prototype.cobrar = function (dinero) { this.fondos += dinero; };
    return Jugador;
}());
exports.Jugador = Jugador;
