import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { expresion } from "src/clases/interfaces/expresion";
import select from "../select";

export default class predicate implements expresion{
    public slc: select
    public exp: expresion
    public linea: number
    public columna: number
    public matches: Array<entorno>
    constructor(slc,exp,linea,columna){
        this.slc = slc
        this.exp = exp
        this.linea = linea
        this.columna = columna
        this.matches = new Array<entorno>()
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.STRUCT
    }
    getValor(ent: entorno, arbol: ast) {
        let entornos
        entornos = this.slc.getValor(ent,arbol)
        let val = this.exp.getValor(entornos, arbol)
        if (val instanceof Array){
            for (let i of val){
                this.matches.push(entornos[i])
            }
        } else {
            this.matches.push(entornos[val-1])
        }
        return this.matches
    }

}