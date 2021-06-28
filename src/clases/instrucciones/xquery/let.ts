import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion";
import Return from "./return";

export default class LET implements instruccion{
    public identificador:expresion;
    public asignacion: any;
    public return: Return;
    public linea: number;
    public columna: number;

    constructor(id,asig,linea,columna){
        this.identificador = id;
        this.asignacion = asig;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(ent: entorno, arbol: ast) {
        throw new Error("Method not implemented.");
    }

}