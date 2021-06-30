import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { expresion } from "src/clases/interfaces/expresion";

export default class variable implements expresion{
    public id:string;
    public xpath:Array<any>;
    public linea:number;
    public columna: number;
    public valor: any = null;

    constructor(id,xpath,linea,columna){
        this.id = id;
        this.xpath = xpath;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }
    getTipo(ent: entorno, arbol: ast) {
        throw new Error("Method not implemented.");
    }
    getValor(ent: entorno, arbol: ast) {
        throw new Error("Method not implemented.");
    }
}