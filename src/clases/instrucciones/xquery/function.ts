import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { instruccion } from "src/clases/interfaces/instruccion";

export default class Function implements instruccion{
    public local:string;
    public id:string;
    public parametros:Array<any>;
    public tipe:string;
    public tipo:tipo;
    public contenido:Array<any>;
    public llamada:boolean;
    public linea:number;
    public columna:number;

    constructor(local,id,param,tipe,content,llamada,linea,columna){
        this.local = local;
        this.id = id;
        this.parametros = param;
        this.tipe = tipe;
        this.contenido = content;
        this.llamada = llamada;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        throw new Error("Method not implemented.");
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }

}