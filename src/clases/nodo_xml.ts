import atr_xml from "./atr_xml"

export default class nodo_xml{
    public id: string
    public atributos: Array<atr_xml>
    public valor: string
    public hijos: Array<nodo_xml>
    constructor(id,atributos,valor,hijos){
        this.id = id
        this.atributos = atributos
        this.valor = valor
        this.hijos = hijos
    }
    printNode(str){
        console.log(str+this.id)
        for (let hijo of this.hijos){
            hijo.printNode(str+"\t")
        }
    }
}