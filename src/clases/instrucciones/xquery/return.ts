import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { instruccion } from "src/clases/interfaces/instruccion";

export default class Return implements instruccion{
    public retu:Array<any>;
    public linea:number;
    public columna:number;

    constructor(ret,linea,columna){
        this.retu = ret;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: entorno, arbol: ast) {
        throw new Error("Method not implemented.");
    }

}