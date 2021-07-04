import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import aritmetica from "src/clases/expresiones/operaciones/aritmetica";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import FOR from "./for";
import IF from "./if";
import LET from "./let";
import nativa from "./nativa";
import variable from "./variable";

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
    public simbol:entorno;
    public param: {[id:string]:Array<any>} = {}

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
        if(this.llamada){
            let result:any = "";
            this.verificaMatch(ent)
            if(this.simbol){
                this.contenido = this.simbol["tabla"].content.valor
                let totalParam = true;
                
                for(let i = 0; i < this.parametros.length;i++){
                    let varParam = this.simbol.getSimbol("param"+i.toString());
                    let valParam:any;
                    if(this.parametros[i] instanceof Function){
                        valParam = this.parametros[i].ejecutar(ent,arbol);
                    }else if(this.parametros[i] instanceof aritmetica){
                        valParam = this.parametros[i].getValor(ent,arbol);
                    }else if(Array.isArray(this.parametros[i][0])){

                    }else{
                        valParam = this.parametros[i].getValor(ent,arbol);
                    }
                    if(varParam){
                        varParam.valor[0].valor = valParam
                        this.param[varParam.id] = varParam.valor;
                    }else{
                        if(totalParam){
                            totalParam = false;
                            InsertarError("Semantico",`Error, cantidad de parametros ingresados a la funcion ${this.id} no cumplen`,"xquery",this.linea,this.columna);
                        }
                    }
                }
                //console.log("que pedo ", this.param)
                if(this.contenido){
                    for(let i = 0; i < this.contenido.length; i++){
                        if(this.contenido[i] instanceof FOR || this.contenido[i] instanceof LET || this.contenido[i] instanceof IF
                           || this.contenido[i] instanceof nativa || this.contenido[i] instanceof Function){
                               result = this.contenido[i].ejecutar(ent,arbol);
                        }else{
                            result = this.contenido[i].getValor(ent,arbol);
                        }
                    }
                    //if(result !== "" && result){
                    //    result = result.toString();
                    //}
                }
            }
            return result;
        }
    }

    /* Verifica que la variable a retornar exista en la tabla de simbolos */
    verificaMatch(ent:entorno){
        let match = true; let entXq = ent.tabla["xquery"].valor;
        while(match){
            let simbol = entXq.getSimbol("function");
            if(simbol){
                if(simbol.id === this.id){
                    this.simbol = simbol.valor;
                    match = false;
                }else{
                    match = false;
                    InsertarError("Semantico",`Error, la funcion a buscar ${this.id} no esta definida`,"xquery",this.linea,this.columna);
                }
            }else{
                match = false;
                InsertarError("Semantico",`Error, la funcion a buscar ${this.id} no esta definida`,"xquery",this.linea,this.columna);
            }
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }

    /* Verificar parametros 
    verificaMatchParam(ent:entorno,id:variable){
        let match = true; let ind = 0;
        while(match){
            let simbol = ent.getSimbol("param"+ind.toString());
            if(simbol){
                if(simbol.id === id.id){
                    match = false;
                }
            }else{
                match = false;
                InsertarError("Semantico",`Error, la funcion a buscar ${this.id} no esta definida`,"xquery",this.linea,this.columna);
            }
            ind++;
        }
    }*/
}