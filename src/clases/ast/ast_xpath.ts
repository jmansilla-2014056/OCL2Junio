import { instruccion } from "../interfaces/instruccion";
import { ast } from "./ast";
import { entorno } from "./entorno";

export default class ast_xpath implements instruccion{
    public lista_instrucciones: Array<instruccion>
    constructor(lista_instrucciones){
        this.lista_instrucciones = lista_instrucciones
    }
    ejecutar(ent: entorno, arbol: ast) {
        for (let instruccion of this.lista_instrucciones){
            instruccion.ejecutar(ent,arbol)
        }
    }
}