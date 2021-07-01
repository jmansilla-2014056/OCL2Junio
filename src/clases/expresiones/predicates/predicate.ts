import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { expresion } from "src/clases/interfaces/expresion";
import select from "../select";

export default class predicate implements expresion {
    public slc: select
    public exp: expresion
    public linea: number
    public columna: number
    public matches: Array<entorno>
    public val
    public entornos
    constructor(slc, exp, linea, columna) {
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
        this.entornos = this.slc.getValor(ent, arbol)
        this.val = this.exp.getValor(this.entornos, arbol)
        if (this.val instanceof Array) {
            if (typeof this.val[0] === 'number') {
                for (let i of this.val) {
                    this.matches.push(this.entornos[i - 1])
                }
            } else if (this.val[0] instanceof entorno) {
                for (let i of this.val) {
                    this.matches.push(i)
                }
            }
        } else {
            if (typeof this.val === 'number') {
                this.matches.push(this.entornos[this.val - 1])
            } else if (this.val instanceof entorno) {
                this.matches.push(this.val)
            }
        }
        return this.matches
    }
    traducir(ent: Array<entorno>, c3d: nodo3d) {
        c3d.main += `\t/* ini predicate */\n`
        this.slc.traducir(this.slc.matches, c3d)
        c3d.main += `\t/* ini exp */\n`
        console.log("EXP")
        console.log(this.exp)
        let t = this.exp.traducir(this.entornos, c3d)
        if (typeof t === 'number') {
            this.num(ent, t, c3d)
        }
        c3d.main += `\t/* fin exp */\n`
        c3d.main += `\t/* fin predicate */\n`
    }
    num(ent: Array<entorno>, t: number, c3d: nodo3d) {
        //posiciones y parametros
        let num = { "id": t, "val": c3d.temp[t] }
        let ret = { "id": c3d.generateTemp(), "val": c3d.s + c3d.last_stack }
        c3d.main += `\tt${ret.id} = S + ${c3d.last_stack};\t\t//posicion de retorno\n`
        let pos_select = { "id": c3d.generateTemp(), "val": ret.val + 1 }
        c3d.main += `\tt${pos_select.id} = t${ret.id} + 1;\t\t//posicion de slc\n`
        let pos_index = { "id": c3d.generateTemp(), "val": ret.val + 2 }
        c3d.main += `\tt${pos_index.id} = t${ret.id} + 2;\t\t//posicion de num\n`
        //guarda valores
        c3d.stack[ret.val] = c3d.h
        c3d.main += `\tstack[(int)t${ret.id}] = H;\n`
        c3d.stack[pos_select.val] = c3d.t_res
        c3d.main += `\tstack[(int)t${pos_select.id}] = ${c3d.t_res};\n`
        c3d.stack[pos_index.val] = num.val
        c3d.main += `\tstack[(int)t${pos_index.id}] = t${num.id} - 1;\n`
        //cambio de entorno
        c3d.s = c3d.s + c3d.last_stack
        c3d.main += `\tS = S + ${c3d.last_stack};\n`
        let n_ent: entorno = ent[0]
        let simbol: simbolo = n_ent.tabla["id"]
        c3d.heap[c3d.h] = simbol.stack
        c3d.h += 1
        c3d.main += `\texpInt();\n`
        c3d.s = c3d.s - c3d.last_stack
        c3d.main += `\tS = S - ${c3d.last_stack};\n`
        //actualizacion retorno
        c3d.t_res = ret.id
        c3d.heap[c3d.h] = -1
        c3d.h += 1
        c3d.last_stack += 3
    }

}