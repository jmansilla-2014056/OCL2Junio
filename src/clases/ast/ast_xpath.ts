import select from "../expresiones/select";
import { ast } from "./ast";
import { entorno } from "./entorno";

export default class ast_xpath {
    public lista_select: Array<select>
    constructor(lista_select){
        this.lista_select = lista_select
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
        return entorno_result
    }
}