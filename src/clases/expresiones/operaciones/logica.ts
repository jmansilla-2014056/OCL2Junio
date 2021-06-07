import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { expresion } from "src/clases/interfaces/expresion";

export default class logica implements expresion {
    public e1: expresion
    public operador: string
    public e2: expresion
    public linea: number
    public columna: number
    public expU: boolean
    constructor(e1, operador, e2, linea, columna, expU) {
        this.e1 = e1
        this.operador = operador
        this.e2 = e2
        this.linea = linea
        this.columna = columna
        this.expU = expU
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.BOOL
    }
    getValor(ent: entorno, arbol: ast) {
        let val1
        let val2
        let valU
        if (this.expU) {
            valU = this.e1.getValor(ent, arbol)
        } else {
            val1 = this.e1.getValor(ent, arbol)
            val2 = this.e2.getValor(ent, arbol)
        }
        switch (this.operador) {
            case "||":
                if (typeof val1 === 'boolean' && typeof val2 === 'boolean') {
                    if (val1 || val2) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    //Error
                }
                break;
            case "&&":
                if (typeof val1 === 'boolean' && typeof val2 === 'boolean') {
                    if (val1 && val2) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    //Error
                }
                break;
            case "!":
                if (typeof valU === 'boolean') {
                    return !valU
                } else {
                    //Error
                }
                break;
            default:
                break;
        }
        return null
    }
}