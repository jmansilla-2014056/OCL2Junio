import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { nodo3d } from "src/clases/c3d/nodo3d";
import primitivo from "src/clases/expresiones/primitivo";
import { expresion } from "src/clases/interfaces/expresion";
import { InsertarError } from "src/reports/ReportController";

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
        if(this.valor !== null){
            return this.valor;
        }else{
            let match = true; let ind = 0; let entXq = ent.tabla["xquery"].valor;
            let func = entXq.getSimbol("function");
            if(func){
                entXq = func.valor;
            }
            while(match){
                let simbol = entXq.getSimbol("var"+ind.toString());
                if (!simbol){
                    simbol = entXq.getSimbol("param"+ind.toString());
                }else{
                    if(simbol.id !== this.id){
                        simbol = entXq.getSimbol("param"+ind.toString());
                    }
                }
                console.log("tons que ", simbol.valor[0]);
                if(simbol){
                    if(simbol.id === this.id){
                        let val = simbol.valor;
                        if (Array.isArray(val) && val[0] instanceof variable){
                            this.valor = val[0].valor;
                        }else if(val instanceof primitivo){
                            this.valor = val.getValor(ent,arbol);
                        }else{
                            this.valor = val
                        }
                        match = false;
                        return this.valor;
                    }
                    ind++;
                }else{
                    match = false;
                    InsertarError("Semantico",`Error, la variable ${this.id} no esta definida`,"xquery",this.linea,this.columna);
                }
            }
        }
    }
}