import { ast } from "../ast/ast";
import { entorno } from "../ast/entorno";
import { simbolo } from "../ast/simbolo";
import { tipo } from "../ast/tipo";
import { nodo3d } from "../c3d/nodo3d";
import { expresion } from "../interfaces/expresion";

export default class select implements expresion {
    public tipe: string
    public id: string
    public atr: boolean
    public linea: number
    public columna: number
    public matches: Array<entorno>
    constructor(tipe, id, atr, linea, columna) {
        this.tipe = tipe
        this.id = id
        this.atr = atr
        this.linea = linea
        this.columna = columna
        this.matches = new Array<entorno>()
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.STRUCT
    }
    getValor(ent: entorno, arbol: ast) {
        if (this.tipe == "//" && this.id != "*" && this.atr == false) {
            this.lookAllNodes(ent, arbol)
        } else if (this.tipe == "/" && this.id != "*" && this.atr == false) {
            this.lookAtPath(ent, arbol)
        } else if (this.tipe == "//" && this.id != null && this.atr == true) {
            this.lookAllParams(ent, arbol)
        } else if (this.tipe == "/" && this.id != null && this.atr == true) {
            this.lookParamsAtPath(ent, arbol)
        } else if (this.tipe == "//" && this.id == "*" && this.atr == false) {
            this.lookAllUnknown(ent, arbol)
        } else if (this.tipe == "/" && this.id == "*" && this.atr == false) {
            this.lookAtUnkown(ent, arbol)
        } else if (this.tipe == "//" && this.id == null && this.atr == true) {
            this.lookAllUnknownP(ent, arbol)
        } else if (this.tipe == "/" && this.id == null && this.atr == true) {
            this.lookAtUnknownP(ent, arbol)
        } else {
            console.log("NO MATCH")
        }
        return this.matches
    }
    lookAllNodes(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
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
        } else {
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
    lookAtPath(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
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
        } else {
            let simbol: simbolo = ent.tabla["id"]
            if (simbol.valor == this.id) {
                //Encontrar valor
                this.matches.push(ent)
            }
        }
    }
    lookAllParams(ent, arbol: ast) {
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
    lookAllUnknown(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    let hijo: simbolo = n_ent.tabla[key]
                    if (key.startsWith("hijo")) {
                        this.matches.push(hijo.valor)
                        this.lookAllUnknown(hijo.valor, arbol)
                    }
                }
            }
        } else {
            for (let key in ent.tabla) {
                let hijo: simbolo = ent.tabla[key]
                if (key.startsWith("hijo")) {
                    this.matches.push(hijo.valor)
                    this.lookAllUnknown(hijo.valor, arbol)
                }
            }
        }
    }
    lookAtUnkown(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    let hijo: simbolo = n_ent.tabla[key]
                    if (key.startsWith("hijo")) {
                        this.matches.push(hijo.valor)
                    }
                }
            }
        } else {
            for (let key in ent.tabla) {
                let hijo: simbolo = ent.tabla[key]
                if (key.startsWith("hijo")) {
                    this.matches.push(hijo.valor)
                }
            }
        }
    }
    lookAllUnknownP(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    let hijo: simbolo = n_ent.tabla[key]
                    if (key.startsWith("atr")) {
                        this.matches.push(n_ent)
                    } else if (key.startsWith("hijo")) {
                        this.lookAllUnknownP(hijo.valor, arbol)
                    }
                }
            }
        } else {
            for (let key in ent.tabla) {
                let hijo: simbolo = ent.tabla[key]
                if (key.startsWith("atr")) {
                    this.matches.push(ent)
                } else if (key.startsWith("hijo")) {
                    this.lookAllUnknownP(hijo.valor, arbol)
                }
            }
        }
    }
    lookAtUnknownP(ent, arbol: ast) {
        if (ent instanceof Array) {
            for (let n_ent of ent) {
                for (let key in n_ent.tabla) {
                    if (key.startsWith("atr")) {
                        this.matches.push(n_ent)
                    }
                }
            }
        } else {
            for (let key in ent.tabla) {
                if (key.startsWith("atr")) {
                    this.matches.push(ent)
                }
            }
        }
    }
    traducir(ent: Array<entorno>, c3d: nodo3d) {
        c3d.main += `\t/* inicia select */\n`
        //posiciones parametros tipe
        let ret = { "id": c3d.generateTemp(), "val": c3d.s + c3d.last_stack }
        c3d.main += `\tt${ret.id} = S + ${c3d.last_stack};\t\t//posicion return\n`

        let pos = { "id": c3d.generateTemp(), "val": ret.val + 1 }
        c3d.main += `\tt${pos.id} = t${ret.id} + 1;\t\t//El ultimo stack disponible\n`
        //ini cadena
        c3d.main += `\t// se añade la cadena ${this.id}\n`
        let ini = { "id": c3d.generateTemp(), "val": c3d.h }
        c3d.main += `\tt${ini.id} = H;\n`
        for (let i = 0; i < this.id.length; i++) {//se guarda caracter por caracter
            c3d.heap[c3d.h] = this.id.charCodeAt(i)
            c3d.main += `\theap[(int)H] = ${this.id.charCodeAt(i)};\t\t//se agrega el caracter H[${c3d.h}] ${this.id.charAt(i)}\n`
            c3d.h += 1
            c3d.main += `\tH = H + 1;\n`
        }
        c3d.heap[c3d.h] = -1//se guarda el fin de la cadena
        c3d.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${c3d.h}] -1\n`
        c3d.h += 1
        c3d.main += `\tH = H + 1;\n`
        //se guarda la referencia al heap en el stack
        c3d.stack[pos.val] = ini.val
        c3d.main += `\tstack[(int)t${pos.id}] = t${ini.id};\t\t//se guarda la referencia al heap en el stack\n`
        c3d.temp[ini.id] = ini.val
        c3d.temp[pos.id] = pos.val
        c3d.temp[ret.id] = ret.val
        //end cadena
        //c3d.addStr(this.id, pos.val)
        c3d.stack[ret.val] = c3d.h
        c3d.main += `\tstack[(int)t${ret.id}] = H;\t\t//posicion del retorno\n`
        //traduccion select
        if (this.atr == false) {//     /nombre | /*
            this.lookNodes3D(ent, c3d, pos.id)
        } else if (this.atr == true) {//     /@atr | /@*
            this.lookParams3D(ent, c3d)
        } else {
            console.log("NO MATCH")
        }
        c3d.heap[c3d.h] = -1
        c3d.h += 1
        c3d.main += `\theap[(int)H] = -1;\t\t//fin del select\n`
        c3d.main += `\tH = H + 1;\t\t//siguiente espacio en heap\n`
        c3d.last_stack += 3
        c3d.main += `\t/* fin select */\n`
        c3d.t_res = ret.id
    }
    lookNodes3D(ent: Array<entorno>, c3d: nodo3d, pos_param: number) {
        for (let n_ent of ent) {
            c3d.main += `\t/* ini look nodes */\n`
            let simbol: simbolo = n_ent.tabla["id"]
            let pos = { "id": pos_param, "val": c3d.temp[pos_param] }
            //la siguiente posicion disponible id xml
            //pos.val = pos.val + 1
            pos.val += 1
            c3d.main += `\tt${pos.id} = t${pos.id} + 1;\t\t//La siguiente posicion id xml\n`
            //se guarda la posicion (heap) del id
            c3d.stack[pos.val] = simbol.stack + 1
            c3d.main += `\tstack[(int)t${pos.id}] = ${simbol.stack} + 1;\t\t//guarda stack del id xml\n`
            c3d.temp[pos.id] = pos.val
            //se cambia de entorno
            c3d.s = c3d.s + c3d.last_stack
            c3d.main += `\tS = S + ${c3d.last_stack};\t\t//Establece posicion return\n`
            //llamada()
            c3d.main += `\tmatchId();\n`
            c3d.s = c3d.s - c3d.last_stack
            c3d.main += `\tS = S - ${c3d.last_stack};\t\t//Establece posicion return\n`
            c3d.main += `\t/* fin look nodes */\n`
            if (this.tipe == "/") {
                if (this.id == "*") {
                    //HIJOS
                    console.log("ALL")
                    /*for (let key in n_ent.tabla) {
                        if (key.startsWith("hijo")) {
                            console.log("MANDA HIJO")
                            let hijo = n_ent.tabla[key]
                            this.traducir([hijo.valor], c3d)
                        }
                    }*/
                    /*c3d.heap[c3d.h] = simbol.stack + 1
                    c3d.h += 1*/
                } else if (simbol.valor == this.id) {
                    //SE GUARDA EL VALOR
                    /*c3d.heap[c3d.h] = c3d.stack[simbol.stack+1]
                    console.log(c3d.heap[c3d.h])*/
                    c3d.heap[c3d.h] = simbol.stack
                    console.log("MATCH " + c3d.heap[c3d.h])
                    c3d.h += 1
                }
            }
            if (this.tipe == "//") {
                console.log("ALL")
                /*for (let key in n_ent.tabla) {
                    if (key.startsWith("hijo")) {
                        console.log("MANDA HIJO")
                        let hijo = n_ent.tabla[key]
                        this.traducir([hijo.valor], c3d)
                    }
                }*/
            }
        }
    }
    lookParams3D(ent, c3d: nodo3d) {
        c3d.main += `\t/* look params */\n`
    }

}