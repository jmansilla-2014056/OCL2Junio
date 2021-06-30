import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { expresion } from "src/clases/interfaces/expresion";

export default class position implements expresion{
    public linea: number
    public columna: number
    constructor(linea,columna){
        this.linea = linea
        this.columna = columna
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.INT
    }
    getValor(ent: entorno, arbol: ast) {
        if (ent instanceof Array){
            return [ent.length]
        } else {
            return [1]
        }
    }

}