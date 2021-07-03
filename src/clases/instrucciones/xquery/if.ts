import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion"
import { InsertarError } from "src/reports/ReportController";

export default class IF implements instruccion {
    public condicion:expresion;
    public ifList:Array<any>;
    public elseList:Array<any>;
    public linea:number;
    public columna:number;

    constructor(condicion,ifList,elseList,linea,columna){
        this.condicion = condicion;
        this.ifList = ifList;
        this.elseList = elseList;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        if (this.condicion.getTipo(ent,arbol) === tipo.BOOL){
            let result = this.condicion.getValor(ent,arbol);
            if (result !== null){
                for (let i = 0; i < this.ifList.length; i++){
                    console.log(this.ifList[i]);
                }
            }else{
                for (let i = 0; i < this.elseList.length; i++){
                    console.log(this.elseList);
                }
            }
        }else{
            InsertarError("Semantico","Error, condición no valida","xquery",this.linea,this.columna);
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }
}