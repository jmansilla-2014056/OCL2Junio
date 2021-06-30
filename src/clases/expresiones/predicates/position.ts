import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { expresion } from "src/clases/interfaces/expresion";

export default class position implements expresion{
    public linea: number
    public columna: number
    public val: number
    constructor(linea,columna){
        this.linea = linea
        this.columna = columna
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.INT
    }
    getValor(ent: entorno, arbol: ast) {
        if (ent instanceof Array){
            this.val = ent.length
            return [ent.length]
        } else {
            this.val = 1
            return [1]
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        //
    }

}