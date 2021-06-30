import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { expresion } from "src/clases/interfaces/expresion";
import select from "../select";

export default class predicate implements expresion{
    public slc: select
    public exp: expresion
    public linea: number
    public columna: number
    public matches: Array<entorno>
    public val
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
        this.val = this.exp.getValor(entornos, arbol)
        if (this.val instanceof Array){
            if (typeof this.val[0] === 'number'){
                for (let i of this.val){
                    this.matches.push(entornos[i-1])
                }
            } else if (this.val[0] instanceof entorno){
                for (let i of this.val){
                    this.matches.push(i)
                }
            }
        } else {
            if (typeof this.val === 'number'){
                this.matches.push(entornos[this.val-1])
            } else if (this.val instanceof entorno){
                this.matches.push(this.val)
            }
        }
        return this.matches
    }
    traducir(ent: Array<entorno>, c3d: nodo3d){
        c3d.main += `\t/* ini predicate */\n`
        this.slc.traducir(this.slc.matches, c3d)
        c3d.main += `\t/* ini exp */\n`
        console.log("EXP")
        console.log(this.exp)
        this.exp.traducir(this.matches,c3d)
        c3d.main += `\t/* fin exp */\n`
        c3d.main += `\t/* fin predicate */\n`
    }

}