import { keyframes } from "@angular/animations";
import { ast } from "../ast/ast";
import { entorno } from "../ast/entorno";
import { simbolo } from "../ast/simbolo";
import { tipo } from "../ast/tipo";
import { expresion } from "../interfaces/expresion";
import nodo_xml from "../xml/nodo_xml";

export default class select implements expresion {
    public tipe: string
    public id: string
    public atr: boolean
    public linea: number
    public columna: number
    public matches: Array<entorno>
    public ini: boolean
    constructor(tipe, id, atr, linea, columna, ini) {
        this.tipe = tipe
        this.id = id
        this.atr = atr
        this.linea = linea
        this.columna = columna
        this.matches = new Array<entorno>()
        this.ini = ini
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.STRUCT
    }
    getValor(ent: entorno, arbol: ast) {
        if (this.ini) {
            if (this.tipe == "//" && this.atr == false) {
                this.lookAllNodes(ent.tabla["xml"].valor, arbol)
            } else if (this.tipe == "/" && this.atr == false) {
                this.lookAtPath(ent.tabla["xml"].valor, arbol)
            } else if (this.tipe == "//" && this.atr == true) {
                this.lookAllParams(ent.tabla["xml"].valor, arbol)
            }
        } else {
            if (this.tipe == "//" && this.atr == false) {
                this.lookAllNodes(ent, arbol)
            } else if (this.tipe == "/" && this.atr == false) {
                this.lookAtPath(ent, arbol)
            } else if (this.tipe == "//" && this.atr == true) {
                this.lookAllParams(ent, arbol)
            } else if (this.tipe == "/" && this.atr == true) {
                this.lookParamsAtPath(ent, arbol)
            }
        }
        return this.matches
    }
    lookAllNodes(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                if (n_ent.tabla["valor"] == null) {
                    let simbol: simbolo = n_ent.tabla["id"]
                    if (simbol.valor == this.id) {
                        //Encontrar valor
                        this.matches.push(n_ent)
                        for (let key in n_ent.tabla) {
                            if (key.startsWith("hijo")) {
                                let hijo = n_ent.tabla[key]
                                this.lookAllNodes(hijo.valor, arbol)
                            }
                        }
                    } else {
                        for (let key in n_ent.tabla) {
                            if (key.startsWith("hijo")) {
                                let hijo = n_ent.tabla[key]
                                this.lookAllNodes(hijo.valor, arbol)
                            }
                        }
                    }
                }
            }
        } else {
            if (ent.tabla["valor"] == null) {
                let simbol: simbolo = ent.tabla["id"]
                if (simbol.valor == this.id) {
                    //Encontrar valor
                    this.matches.push(ent)
                    for (let key in ent.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = ent.tabla[key]
                            this.lookAllNodes(hijo.valor, arbol)
                        }
                    }
                } else {
                    for (let key in ent.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo = ent.tabla[key]
                            this.lookAllNodes(hijo.valor, arbol)
                        }
                    }
                }
            }
        }
    }
    lookAtPath(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                if (n_ent.tabla["valor"] == null) {
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("hijo")) {
                            let hijo: simbolo = n_ent.tabla[key]
                            if (hijo.id == this.id) {
                                //Encontrar valor
                                this.matches.push(hijo.valor)
                            }
                        }
                    }
                }
            }
        } else {
            if (ent.tabla["valor"] == null) {
                let simbol: simbolo = ent.tabla["id"]
                if (simbol.valor == this.id) {
                    //Encontrar valor
                    this.matches.push(ent)
                }
            }
        }
    }
    lookAllParams(ent, arbol: ast) {
        if (this.ini) {
            for (let key in ent.tabla) {
                if (key.startsWith("atr")) {
                    let atr: simbolo = ent.tabla[key]
                    if (atr.id == this.id) {
                        this.matches.push(ent)
                    }
                } else if (key.startsWith("hijo")) {
                    let hijo = ent.tabla[key]
                    this.lookAllParams(hijo.valor, arbol)
                }
            }
        } else {
            if (ent instanceof Array) {
                for (let n_ent of ent) {
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("atr")) {
                            let atr: simbolo = n_ent.tabla[key]
                            if (atr.id == this.id) {
                                this.matches.push(n_ent)
                            }
                        } else if (key.startsWith("hijo")) {
                            let hijo = n_ent.tabla[key]
                            this.lookAllParams(hijo.valor, arbol)
                        }
                    }
                }
            } else {
                for (let key in ent.tabla) {
                    if (key.startsWith("atr")) {
                        let atr: simbolo = ent.tabla[key]
                        if (atr.id == this.id) {
                            this.matches.push(ent)
                        }
                    } else if (key.startsWith("hijo")) {
                        let hijo = ent.tabla[key]
                        this.lookAllParams(hijo.valor, arbol)
                    }
                }
            }
        }
    }
    lookParamsAtPath(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("atr")) {
                        let atr: simbolo = n_ent.tabla[key]
                        if (atr.id == this.id) {
                            this.matches.push(n_ent)
                        }
                    }
                }
            }
        } else {
            for (let key in ent.tabla) {
                if (key.startsWith("atr")) {
                    let atr: simbolo = ent.tabla[key]
                    if (atr.id == this.id) {
                        this.matches.push(ent)
                    }
                }
            }
        }
    }

}