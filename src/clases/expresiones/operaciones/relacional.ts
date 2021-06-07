import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { expresion } from "src/clases/interfaces/expresion";

export default class relacional implements expresion {
    public e1: expresion
    public operador: string
    public e2: expresion
    public linea: number
    public columna: number
    constructor(e1, operador, e2, linea, columna) {
        this.e1 = e1
        this.operador = operador
        this.e2 = e2
        this.linea = linea
        this.columna = columna
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.BOOL
    }
    getValor(ent: entorno, arbol: ast) {
        let val1 = this.e1.getValor(ent, arbol)
        let val2 = this.e2.getValor(ent, arbol)
        switch (this.operador) {
            case "<":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    if (val1 < val2) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    //Error
                }
                break;
            case ">":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    if (val1 > val2) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    //Error
                }
                break;
            case "<=":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    if (val1 <= val2) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    //Error
                }
                break;
            case ">=":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    if (val1 >= val2) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    //Error
                }
                break;
            case "==":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    if (val1 == val2) {
                        return true
                    } else {
                        return false
                    }
                } else if (typeof val1 === 'string' && typeof val2 === 'string') {
                    if (val1 == val2) {
                        return true
                    } else {
                        return false
                    }
                } else if (typeof val1 === 'boolean' && typeof val2 === 'boolean') {
                    if (val1 == val2) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    //Error
                }
                break;
            case "!=":
                if (typeof val1 === 'number' && typeof val2 === 'number'){
                    if (val1 != val2){
                        return true
                    } else {
                        return false
                    }
                } else if (typeof val1 === 'string' && typeof val2 === 'string'){
                    if (val1 != val2){
                        return true
                    } else {
                        return false
                    }
                } else if (typeof val1 === 'boolean' && typeof val2 === 'boolean'){
                    if (val1 != val2){
                        return true
                    } else {
                        return false
                    }
                } else {
                    //Error
                }
                break
            default:
                break;
        }
        return null
    }

}