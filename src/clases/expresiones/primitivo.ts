import { ast } from "../ast/ast";
import { entorno } from "../ast/entorno";
import { simbolo } from "../ast/simbolo";
import { tipo } from "../ast/tipo";
import { nodo3d } from "../c3d/nodo3d";
import { expresion } from "../interfaces/expresion";

export default class primitivo implements expresion {
    public primitivo: any
    public linea: number
    public columna: number
    public tipe: tipo
    constructor(primitivo, linea, columna) {
        this.primitivo = primitivo
        this.linea = linea
        this.columna = columna
        this.Tipo()
    }
    getTipo(ent: entorno, arbol: ast) {
        let valor = this.getValor(ent, arbol)
        if (typeof valor === 'number') {
            if (valor % 1 == 0) {
                this.tipe = tipo.INT
                return tipo.INT
            }
            this.tipe = tipo.DOUBLE
            return tipo.DOUBLE
        } else if (typeof valor === 'string') {
            this.tipe = tipo.STRING
            return tipo.STRING
        } else if (typeof valor === 'boolean') {
            this.tipe = tipo.BOOL
            return tipo.BOOL
        }
        return null
    }
    Tipo() {
        let valor = this.primitivo
        if (typeof valor === 'number') {
            if (valor % 1 == 0) {
                this.tipe = tipo.INT
            }
            this.tipe = tipo.DOUBLE
        } else if (typeof valor === 'string') {
            this.tipe = tipo.STRING
        } else if (typeof valor === 'boolean') {
            this.tipe = tipo.BOOL
        }
    }
    getValor(ent: entorno, arbol: ast) {
        return this.primitivo
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        if (this.tipe == tipo.INT || this.tipe == tipo.DOUBLE) {
            //posiciones y parametros
            let ret = { "id": c3d.generateTemp(), "val": c3d.s + c3d.last_stack }
            c3d.main += `\tt${ret.id} = S + ${c3d.last_stack};\t\t//posicion de retorno\n`
            let pos_select = { "id": c3d.generateTemp(), "val": ret.val + 1 }
            c3d.main += `\tt${pos_select.id} = S + ${ret.id} + 1;\t\t//posicion de slc\n`
            let pos_index = { "id": c3d.generateTemp(), "val": ret.val + 2 }
            c3d.main += `\tt${pos_index.id} = S + ${ret.id} + 2;\t\t//posicion de num\n`
            //guarda valores
            c3d.stack[ret.val] = c3d.h
            c3d.main += `\tstack[(int)t${ret.id}] = H;\n`
            c3d.stack[pos_select.val] = c3d.t_res
            c3d.main += `\tstack[(int)t${pos_select.id}] = ${c3d.t_res};\n`
            c3d.stack[pos_index.val] = this.primitivo
            c3d.main += `\tstack[(int)t${pos_index.id}] = ${this.primitivo} - 1;\n`
            //cambio de entorno
            c3d.s = c3d.s + c3d.last_stack
            c3d.main += `\tS = S + ${c3d.last_stack};\n`
            c3d.s = c3d.s - c3d.last_stack
            let n_ent: entorno = ent[0]
            let simbol: simbolo = n_ent.tabla["id"]
            c3d.heap[c3d.h] = simbol.stack
            c3d.h += 1
            c3d.main += `\texpInt();\n`
            c3d.main += `\tS = S - ${c3d.last_stack};\n`
            c3d.main += `\t;\n`
            //actualizacion retorno
            c3d.t_res = ret.id
            c3d.heap[c3d.h] = -1
            c3d.h += 1
        }
    }
}