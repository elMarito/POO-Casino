"use strict";
exports.__esModule = true;
exports.Jugador = void 0;
var Jugador = /** @class */ (function () {
    function Jugador(nombre, edad, fondos) {
        if (fondos === void 0) { fondos = 0; }
        this.nombre = nombre;
        this.edad = edad;
        this.fondos = fondos;
    }
    Jugador.prototype.getNombre = function () { return this.nombre; };
    Jugador.prototype.getFondos = function () { return this.fondos; };
    Jugador.prototype.getEdad = function () { return this.edad; };
    Jugador.prototype.agregarFondos = function (dinero) { this.fondos += dinero; };
    // public cobrar(dinero: number): void { this.fondos += dinero }
    Jugador.prototype.apostar = function (dinero) { this.fondos -= dinero; };
    return Jugador;
}());
exports.Jugador = Jugador;
