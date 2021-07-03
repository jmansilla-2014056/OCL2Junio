import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { expresion } from "src/clases/interfaces/expresion";
import { instruccion } from "src/clases/interfaces/instruccion"
import { InsertarError } from "src/reports/ReportController";
import FOR from "./for";
import LET from "./let";
import nativa from "./nativa";
import Function from "./function";

export default class IF implements instruccion {
    public condicion:any;
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
            let result = this.condicion.getValorX(ent,arbol);
            let res:any = "";
            if (result){
                for (let i = 0; i < this.ifList.length; i++){
                    if(this.ifList[i] instanceof FOR || this.ifList[i] instanceof LET || this.ifList[i] instanceof IF
                        || this.ifList[i] instanceof nativa || this.ifList[i] instanceof Function){
                            res = this.ifList[i].ejecutar(ent,arbol);
                        }else{
                        res = this.ifList[i].getValor(ent,arbol);
                    }
                }
            }else{
                console.log("que putas else ", ent);
                for (let i = 0; i < this.elseList.length; i++){
                    if(this.elseList[i] instanceof FOR || this.elseList[i] instanceof LET || this.elseList[i] instanceof IF
                        || this.elseList[i] instanceof nativa || this.elseList[i] instanceof Function){
                            res = this.elseList[i].ejecutar(ent,arbol);
                        }else{
                            res = this.elseList[i].getValor(ent,arbol);
                    }
                }
            }
            return res.toString();
        }else{
            InsertarError("Semantico","Error, condición no valida","xquery",this.linea,this.columna);
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }
}