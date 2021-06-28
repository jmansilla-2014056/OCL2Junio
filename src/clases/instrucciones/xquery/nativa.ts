import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { instruccion } from "src/clases/interfaces/instruccion";

export default class nativa implements instruccion{
    public id:string;
    public accion:any;
    public linea:number;
    public columna:number;

    constructor (id,accion,linea,columna){
        this.id = id;
        this.accion = accion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        throw new Error("Method not implemented.");
    }
}