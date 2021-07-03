import { nodo3d } from "../c3d/nodo3d";
import { expresion } from "../interfaces/expresion";
import { ast } from "./ast";
import { entorno } from "./entorno";
import { tipo } from "./tipo";

export class simbolo implements expresion{
    public id: string
    public valor: any
    public tipo: tipo
    public linea: number
    public columna: number
    public stack: number
    public ambito: string
    constructor(id,valor,tipo,linea,columna,ambito?,stack?){
        this.id = id
        this.valor = valor
        this.tipo = tipo
        this.linea = linea
        this.columna = columna
        this.stack = stack
        this.ambito = ambito
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }
    getTipo(ent: entorno, arbol: ast) {
        return this.tipo
    }
    getValor(ent: entorno, arbol: ast) {
        return this.valor
    }
    getTipoStr(){
        if (this.tipo == tipo.STRING){
            return "STRUCT"
        } else if (this.tipo == tipo.ATRIBUTE){
            return "ATTRIBUTE"
        } else if (this.tipo == tipo.VALOR){
            return "VALOR"
        } else if (this.tipo == tipo.VARIABLE){
            return "VARIABLE"
        }
        return ""
    }
}