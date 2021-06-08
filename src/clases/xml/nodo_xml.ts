import { entorno } from "../ast/entorno"
import { entornoXml } from "../ast/entornoXml"
import atr_xml from "./atr_xml"

export default class nodo_xml{
    public id: string
    public atributos: Array<atr_xml>
    public valor: string
    public hijos: Array<nodo_xml>
    public entorno: entorno
    public linea: number
    public columna: number
    public id2: string
    constructor(id,atributos,valor,hijos,linea,columna,id2){
        this.id = id
        this.atributos = atributos
        this.valor = valor
        this.hijos = hijos
        this.linea = linea
        this.columna = columna
        this.id2 = id2
    }
    printNode(str){
        console.log(str+this.id)
        for (let hijo of this.hijos){
            hijo.printNode(str+"\t")
        }
    }
}