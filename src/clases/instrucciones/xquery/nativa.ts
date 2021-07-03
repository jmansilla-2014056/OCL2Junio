import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import variable from "./variable";

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
        let result:any = "";

        if(this.id.toLowerCase() === "upper-case"){
            if(!(this.accion[0] instanceof variable)){
                let str = this.accion[0].getValor(ent,arbol);
                result = str.toUpperCase();
                return result;
            }else{
                //xpath
            }
        }else if(this.id.toLowerCase() === "lower-case"){
            if(!(this.accion[0] instanceof variable)){
                let str = this.accion[0].getValor(ent,arbol);
                result = str.toLowerCase();
                return result;
            }else{
                //xpath
            }
        }else if(this.id.toLowerCase() === "tostring"){
            if(!(this.accion[0] instanceof variable)){
                let str = this.accion[0].getValor(ent,arbol);
                result = str.toString();
                return result;
            }else{
                //xpath
            }
        }else if(this.id.toLowerCase() === "number"){
            if(!(this.accion[0] instanceof variable)){
                let str = this.accion[0].getValor(ent,arbol);
                try {
                    result = Number(str);
                    return result
                } catch (error) {
                    InsertarError("Semantico",`Error, el dato ${str} no se puede convertir a number`,"xquery",this.accion[0].linea,this.accion[0].columna);
                }
            }else{
                //xpath
            }
        }else if(this.id.toLowerCase() === "substring"){
            if(!(this.accion[0] instanceof variable)){
                let str = this.accion[0].getValor(ent,arbol);
                result = str.substring(Number(this.accion[1].getValor(ent,arbol)),Number(this.accion[2].getValor(ent,arbol)));
                return result;
            }else{
                //xpath
            }

        }else if(this.id.toLowerCase() === "data"){

        }else{
            InsertarError("Semantico",`Error, la funcion nativa ${this.id} no existe`,"xquery",this.linea,this.columna);
            return result;
        }
    }
    traducir(ent: entorno[], c3d: nodo3d, ambito: entorno) {
        throw new Error("Method not implemented.");
    }
}