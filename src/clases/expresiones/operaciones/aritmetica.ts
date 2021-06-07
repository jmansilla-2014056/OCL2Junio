import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { expresion } from "src/clases/interfaces/expresion";

export default class aritmetica implements expresion {
    public e1: expresion
    //public operador: operador
    public operador:string
    public e2: expresion
    public linea: number
    public columna: number
    public expU: boolean
    public tipo_: tipo
    constructor(e1, operador, e2, linea, columna, expU) {
        this.e1 = e1
        this.operador = operador
        this.e2 = e2
        this.linea = linea
        this.columna = columna
        this.expU = expU
    }
    getTipo(ent: entorno, arbol: ast) {
        return this.tipo_
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
            case "+":
                if (typeof val1 === 'number') {
                    if (typeof val2 === 'number') {
                        this.tipo_ == tipo.DOUBLE
                        return val1 + val2
                    } else if (typeof val2 === 'boolean') {
                        this.tipo_ == tipo.DOUBLE
                        if (val2) {
                            return val1 + 1
                        } else {
                            return val1
                        }
                    } else if (typeof val2 === 'string') {
                        this.tipo_ = tipo.STRING
                        return val1 + val2
                    } else {
                        //Error
                    }
                } else if (typeof val1 === 'boolean') {
                    if (typeof val2 === 'number') {
                        this.tipo_ == tipo.DOUBLE
                        if (val1) {
                            return 1 + val2
                        } else {
                            return val2
                        }
                    } else if (typeof val2 === 'string') {
                        this.tipo_ = tipo.STRING
                        return val1 + val2
                    } else {
                        //Error
                    }
                } else if (typeof val1 === 'string') {
                    if (typeof val2 === 'number') {
                        this.tipo_ = tipo.STRING
                        return val1 + val2
                    } else if (typeof val2 === 'boolean') {
                        this.tipo_ = tipo.STRING
                        return val1 + val2
                    } else if (typeof val2 === 'string') {
                        this.tipo_ = tipo.STRING
                        return val1 + val2
                    } else {
                        //Error
                    }
                } else {
                    //Error
                }
                break;
            case "-":
                if (typeof val1 === 'number') {
                    if (typeof val2 === 'number') {
                        this.tipo_ = tipo.DOUBLE
                        return val1 - val2
                    } else if (typeof val2 === 'boolean') {
                        this.tipo_ = tipo.DOUBLE
                        if (val2) {
                            return val1 - 1
                        } else {
                            return val1
                        }
                    }
                } else if (typeof val1 === 'boolean') {
                    if (typeof val2 === 'number') {
                        this.tipo_ = tipo.DOUBLE
                        if (val1) {
                            return 1 - val2
                        } else {
                            return 0 - val2
                        }
                    }
                } else {
                    //Error
                }
                break;
            case "*":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    this.tipo_ = tipo.DOUBLE
                    return val1 * val2
                } else {
                    //Error
                }
                break;
            case "/":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    this.tipo_ = tipo.DOUBLE
                    return val1 / val2
                } else {
                    //Error
                }
                break;
            case "%":
                if (typeof val1 === 'number' && typeof val2 === 'number') {
                    this.tipo_ = tipo.INT
                    return val1 % val2
                } else {
                    //Error
                }
                break;
            case "UNARIO":
                if (typeof valU === 'number') {
                    this.tipo_ = tipo.DOUBLE
                    return -valU
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