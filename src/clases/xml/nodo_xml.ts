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
    constructor(id,atributos,valor,hijos,linea,columna){
        this.id = id
        this.atributos = atributos
        this.valor = valor
        this.hijos = hijos
        this.linea = linea
        this.columna = columna
    }
    printNode(str){
        console.log(str+this.id)
        for (let hijo of this.hijos){
            hijo.printNode(str+"\t")
        }
    }
}