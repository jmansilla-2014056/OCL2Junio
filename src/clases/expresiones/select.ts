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
            }
        }
        return this.matches
    }
    lookAllNodes(ent: entorno, arbol: ast) {
        let simbol = ent.tabla["id"].id
        if (simbol == this.id) {
            //Encontrar valor
            console.log("Match en la entrada")
        } else {
            for (let key in ent.tabla) {
                if (key.startsWith("hijo")) {
                    let hijo = ent.tabla[key]
                    if (hijo.id == this.id) {
                        //Match obtener valor
                        this.getNodeVal(hijo.valor, arbol)
                    } else {
                        //Look all
                        this.lookAllNodes(ent, arbol)
                    }
                }
            }
        }
    }
    getNodeVal(ent: entorno, arbol: ast) {
        if (ent.tabla["valor"] == null){
            this.matches.push(ent)
        }
    }

}