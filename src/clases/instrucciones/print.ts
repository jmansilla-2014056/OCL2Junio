import { ast } from "../ast/ast";
import { entorno } from "../ast/entorno";
import { nodo3d } from "../c3d/nodo3d";
import { expresion } from "../interfaces/expresion";
import { instruccion } from "../interfaces/instruccion";

export default class print implements instruccion{
    public exp: expresion
    public linea: number
    public columna: number
    constructor(exp,linea,columna){
        this.exp = exp
        this.linea = linea
        this.columna = columna
    }
    ejecutar(ent: entorno, arbol: ast) {
        ent.appEnd(this.exp.getValor(ent,arbol))
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }
}