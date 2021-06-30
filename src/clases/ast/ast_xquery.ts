import FOR from "../instrucciones/xquery/for";
import Function from "../instrucciones/xquery/function";
import IF from "../instrucciones/xquery/if";
import LET from "../instrucciones/xquery/let";
import { ast } from "./ast";
import { entorno } from "./entorno";
import { simbolo } from "./simbolo";
import { simbolTabla } from "./simbolTabla";
import { tipo } from "./tipo";

export default class ast_xquery{
    public listXquery: Array<any>;
    public simbolos: Array<simbolTabla>;
    public ambito:string;

    /* Crea los entornos para xquery */
    creaEntornoXquery(oldEntorno:entorno,result:Array<any>){
        this.listXquery = result;
        this.simbolos = new Array<simbolTabla>();
        this.ambito = "Global";
        let newEntorno = new entorno(oldEntorno);
        this.hijosEntorno(newEntorno,result)
        oldEntorno.agregar("xquery",new simbolo("xquery",newEntorno,null,0,0));
    }

    /* recursiva y no recursiva para contenidos */
    hijosEntorno(ent:entorno,result:Array<any>){
        let lets : number = 0;
        let fors : number = 0;
        
        for (let i = 0; i < result.length; i++){
            if (result[i] instanceof LET) {
                ent.agregar("var" + lets.toString(),new simbolo(result[i].identificador.id,null,tipo.ATRIBUTE,result[i].identificador.linea,result[i].identificador.columna));
                lets++;
            }else if (result[i] instanceof FOR){
                ent.agregar("var" + fors.toString(),new simbolo(result[i].id.id,null,tipo.STRUCT,result[i].id.linea,result[i].id.columna));
                fors++;
            }else if(result[i] instanceof IF){
                let res = [];
                if (result[i].ifList.length > 0){
                    (Array.isArray(result[i].ifList[0]) ? res = result[i].ifList[0] : res = result[i].ifList)
                    if (res[0] instanceof LET || res[0] instanceof FOR || res[0] instanceof Function || res[0] instanceof IF){
                        let entAux = new entorno(ent);
                        this.hijosEntorno(entAux,res);
                        ent.agregar("ifList",new simbolo("if",entAux,tipo.STRUCT,result[i].linea,result[i].columna));
                    }
                }
                if (result[i].elseList.length > 0){
                    (Array.isArray(result[i].elseList[0]) ? res = result[i].elseList[0] : res = result[i].elseList)
                    if (res[0] instanceof LET || res[0] instanceof FOR || res[0] instanceof Function || res[0] instanceof IF){
                        let entAux = new entorno(ent);
                        this.hijosEntorno(entAux,res);
                        ent.agregar("elseList",new simbolo("else",entAux,tipo.STRUCT,result[i].linea,result[i].columna));
                    }
                }
            }else if (result[i] instanceof Function){
                if (!result[i].llamada){
                    let entfun = new entorno(ent);
                    result[i].tipo = this.getType(result[i].tipe)
                    for (let j = 0; j < result[i].parametros.length; j++){
                        entfun.agregar("param" + j.toString(),new simbolo(result[i].parametros[j][0].id,null,tipo.PARAMETRO,result[i].linea,result[i].columna));
                    }
                    ent.agregar("function",new simbolo(result[i].id,entfun,tipo.FUNCTION,result[i].linea,result[i].columna));
                    let entAux = new entorno(ent);
                    let res = result[i].contenido;
                    if (Array.isArray(res[0])) {
                        res = res[0]
                    }
                    this.hijosEntorno(entAux,res);
                    entfun.agregar("content",new simbolo(result[i].id,entAux,tipo.STRUCT,result[i].linea,result[i].columna));
                }
            }
        }
    }

    getType(tipe:string){
        switch (tipe.toLowerCase()) {
            case "string":
                return tipo.STRING;
            case "integer":
                return tipo.INT;
            case "decimal":
                return tipo.DOUBLE;
            case "double":
                return tipo.DOUBLE;
            default:
                return tipo.BOOL;
        }
    }

    /* genera para tabla de simbolos */
    getSimbolitos(ent:entorno){
        for (const key in ent.tabla) {
            
            if(key === "function"){
                this.simbolos.push(new simbolTabla(ent.tabla[key].id,tipo[ent.tabla[key].tipo],this.ambito,ent.tabla[key].linea,ent.tabla[key].columna,null,null));
                this.ambito = ent.tabla[key].id;
                if (ent.tabla !== {} && ent.tabla[key].valor instanceof entorno){
                    this.getSimbolitos(ent.tabla[key].valor)
                }
            }
            if (key.startsWith("param")){
                this.simbolos.push(new simbolTabla(ent.tabla[key].id,tipo[ent.tabla[key].tipo],this.ambito,ent.tabla[key].linea,ent.tabla[key].columna,null,null));
            }
            if (key.startsWith("var")){
                this.simbolos.push(new simbolTabla(ent.tabla[key].id,tipo[ent.tabla[key].tipo],this.ambito,ent.tabla[key].linea,ent.tabla[key].columna,null,null));
            }
            if (key === "content" || key === "elselist" || key === "iflist"){
                if (ent.tabla !== {}){
                    if (ent.tabla[key].valor instanceof entorno){
                        this.getSimbolitos(ent.tabla[key].valor)
                    }
                }
            }
        }
    }

    /* Ejecuta instrucciones */
    ejecutar(entorno:entorno,arbol:ast){
        
    }
}