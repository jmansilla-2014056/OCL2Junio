import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { instruccion } from "src/clases/interfaces/instruccion";

export default class FOR implements instruccion{
    public id:string;
    public idat:string;
    public condicion:any
    public at:boolean;
    public contenido:Array<any>
    public linea:number;
    public columna:number;

    constructor(id,idat,condicion,at,content,linea,columna){
        this.id = id;
        this.idat = idat;
        this.condicion = condicion;
        this.at = at;
        this.contenido = content;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: entorno, arbol: ast) {
        throw new Error("Method not implemented.");
    }
    
}