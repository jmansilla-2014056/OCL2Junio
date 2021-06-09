import { tipo } from "src/clases/ast/tipo";
import { ast } from "../../ast/ast";
import { entorno } from "../../ast/entorno";
import { expresion } from "../../interfaces/expresion";
import select from "../select";

export default class last implements expresion{
    public linea: number
    public columna: number
    constructor(linea,columna){
        this.linea = linea
        this.columna = columna
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.STRUCT
    }
    getValor(ent: entorno, arbol: ast) {
        if (ent instanceof Array){
            return ent.length
        } else {
            return 0
        }
    }

}