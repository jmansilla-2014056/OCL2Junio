import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { instruccion } from "src/clases/interfaces/instruccion";
import variable from "./variable";

export default class order implements instruccion{
    public accion:variable;
    public linea:number;
    public columna:number;

    constructor(accion,linea,columna){
        this.accion = accion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        throw new Error("Method not implemented.");
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }
}