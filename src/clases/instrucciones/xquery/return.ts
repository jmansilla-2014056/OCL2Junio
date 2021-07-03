import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { ast } from "src/clases/ast/ast";
import ast_xpath from "src/clases/ast/ast_xpath";
import { entorno } from "src/clases/ast/entorno";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import variable from "./variable";

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
        let ret: any = "";
        for(let i = 0; i < this.retu.length; i++){
            if(this.retu[i].variable != null && this.retu[i].exp == null && this.retu[i].func == null && this.retu[i].ifs == null){
                this.verificaMatch(ent,i);
                if(Array.isArray(this.retu[i].variable.valor)){
                    let valor = this.retu[i].variable.valor;
                    if(valor[valor.length - 1] === "xpath"){
                        let ast_xp = new ast_xpath(null);
                        for (let j = 0; j < valor.length - 1; j++) {
                            for (let slc of valor[j]) {
                                ast_xp.getResult(slc)
                            }
                        }
                        ret = ast_xp.str_result;
                    }else{
                        for(let j = 0; j < valor.length; j++){
                            ret += valor[j].toString() + "\n";
                        }
                    }
                }
            }else if(this.retu[i].variable != null && this.retu[i].exp != null && this.retu[i].func == null && this.retu[i].ifs == null){
                this.verificaMatch(ent,i);
                if(Array.isArray(this.retu[i].variable.valor)){
                    let valor = this.retu[i].variable.valor;
                    let ex = this.retu[i].exp.id;
                    if(valor[valor.length - 1] === "xpath"){
                        let ast_xp = new ast_xpath(null);
                        for (let j = 0; j < valor.length - 1; j++) {
                            for (let slc of valor[j]) {
                                ast_xp.getResult(slc)
                            }
                        }
                        ret += ex.toString() + ' ' + ast_xp.str_result;
                    }else{
                        for(let j = 0; j < valor.length; j++){
                            ret += ex.toString() + ' ' + valor[j].toString() + "\n";
                        }
                    }
                }
            }
        }
        return ret
    }

    /* Verifica que la variable a retornar exista en la tabla de simbolos */
    verificaMatch(ent:entorno,i:number){
        let match = true; let ind = 0; let entXq = ent.tabla["xquery"].valor;
        while(match){
            let simbol = entXq.getSimbol("var"+ind.toString());
            if(simbol && simbol.valor instanceof variable){
                if(simbol.valor.id === this.retu[i].variable.id){
                    this.retu[i].variable.valor = simbol.valor.valor;
                    match = false;
                }
                ind++;
            }else{
                match = false;
                InsertarError("Semantico",`Error, la variable de retorno ${this.retu[i].variable.id} no esta definida`,"xquery",this.retu[i].variable.linea,this.retu[i].variable.columna);
            }
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }
}