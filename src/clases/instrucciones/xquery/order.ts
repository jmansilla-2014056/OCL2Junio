import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { simbolo } from "src/clases/ast/simbolo";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import variable from "./variable";

export default class order implements instruccion{
    public accion:variable;
    public linea:number;
    public columna:number;
    public simbol:simbolo;

    constructor(accion,linea,columna){
        this.accion = accion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        this.verificaMatch(ent);
        let valor = this.simbol.valor;
        let idx:any = "";
        if(Array.isArray(valor)){
            valor = valor[0]
            for (let i = 0; i < this.accion.xpath.length; i++){
                for(let j = 0; j < this.accion.xpath[i].length; j++){
                    idx = this.accion.xpath[i][j].id;
                }
            }
            /* Ordenamiento burbuja asc */
            let tmp:any;
            for(let i = 0; i < valor.length; i++){
                for (const key in valor[i]["tabla"]) {
                    let llave = valor[i]["tabla"][key];
                    if(llave.id === idx){
                        for(let j = 0; j < (valor.length - 1);j++){
                            for(const llv in valor[j]["tabla"]){
                                let llave2 = valor[j]["tabla"][llv];
                                if (llave2 !== null && llave2 != undefined){
                                    if (llave2.id === idx){
                                        if(valor[j]["tabla"][llv].valor instanceof entorno && valor[j+1]["tabla"][llv].valor instanceof entorno){
                                            if (valor[j]["tabla"][llv].valor["tabla"]["valor"].valor > valor[j+1]["tabla"][llv].valor["tabla"]["valor"].valor ){
                                                tmp = valor[j];
                                                valor[j] = valor[j + 1];
                                                valor[j + 1] = tmp;
                                            }
                                        }else{
                                            if (valor[j]["tabla"][llv].valor > valor[j+1]["tabla"][llv].valor ){
                                                tmp = valor[j];
                                                valor[j] = valor[j + 1];
                                                valor[j + 1] = tmp;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /* Verifica que la variable a retornar exista en la tabla de simbolos */
    verificaMatch(ent:entorno){
        let match = true; let ind = 0; let entXq = ent.tabla["xquery"].valor;
        while(match){
            let simbol = entXq.getSimbol("var"+ind.toString());
            if(simbol && simbol.valor instanceof variable){
                if(simbol.valor.id === this.accion.id){
                    this.simbol = simbol.valor;
                    match = false;
                }
                ind++;
            }else{
                match = false;
                InsertarError("Semantico",`Error, la variable a ordenar ${this.accion.id} no esta definida`,"xquery",this.accion.linea,this.accion.columna);
            }
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        throw new Error("Method not implemented.");
    }
}