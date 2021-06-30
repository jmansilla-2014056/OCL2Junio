import { ast } from "src/clases/ast/ast";
import ast_xpath from "src/clases/ast/ast_xpath";
import { entorno } from "src/clases/ast/entorno";
import { instruccion } from "src/clases/interfaces/instruccion";

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
        let ret: any = null;
        for(let i = 0; i < this.retu.length; i++){
            if(this.retu[i].variable != null && this.retu[i].exp == null && this.retu[i].func == null && this.retu[i].ifs == null){
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
                        ret = "";
                        for(let j = 0; j < valor.length; j++){
                            ret += valor[j].toString() + "\n";
                        }
                    }
                }
            }
        }
        return ret
    }

}