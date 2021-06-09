import select from "../expresiones/select";
import { ast } from "./ast";
import { entorno } from "./entorno";

export default class ast_xpath {
    public lista_select: Array<select>
    public str_result: string
    constructor(lista_select){
        this.lista_select = lista_select
        this.str_result = ""
    }
    ejecutar (ent: entorno, arbol: ast){
        let entorno_result
        if (this.lista_select.length == 1){
            entorno_result = this.lista_select[0].getValor(ent,arbol)
        } else {
            entorno_result = ent
            for (let slc of this.lista_select){
                entorno_result = slc.getValor(entorno_result,arbol)
            }
        }
        console.log("MATCHES")
        console.log(entorno_result)
        for (let slc of entorno_result){
            this.getResult(slc,"")
        }
        return this.str_result
    }
    getResult(ent: entorno,str: string){
        if (ent.tabla["n_etiquetas"].valor == 1){
            this.str_result += str+"<"+ent.tabla["id"].valor
            this.getParams(ent)
            this.str_result += "/>\n"
        } else {
            this.str_result += str+"<"+ent.tabla["id"].valor
            this.getParams(ent)
            this.str_result += ">\n"
            this.getNodes(ent,str)
            this.getNodeVal(ent,str)
            this.str_result += str+"</"+ent.tabla["id"].valor+">\n"
        }
        //
    }
    getParams(ent: entorno){
        for (let key in ent.tabla){
            let atr = ent.tabla[key]
            if (key.startsWith("atr")){
                this.str_result += ` ${atr.id}="${atr.valor}"`
            }
        }
    }
    getNodes(ent: entorno,str: string){
        for (let key in ent.tabla){
            let hijo = ent.tabla[key]
            if (key.startsWith("hijo")){
                this.getResult(hijo.valor,str+"\t")
            }
        }
    }
    getNodeVal(ent: entorno,str: string){
        let val = ent.tabla["valor"]
        if (val != null){
            this.str_result += str+"\t"+val.valor+"\n"
        }
    }
}