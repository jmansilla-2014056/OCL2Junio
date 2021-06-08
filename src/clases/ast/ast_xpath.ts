import select from "../expresiones/select";
import { ast } from "./ast";
import { entorno } from "./entorno";

export default class ast_xpath {
    public lista_select: Array<select>
    constructor(lista_select){
        this.lista_select = lista_select
    }
    ejecutar (ent: entorno, arbol: ast){
        let result
        for (let slc of this.lista_select){
            result = slc.getValor(ent,arbol)
        }
        return result
    }
}