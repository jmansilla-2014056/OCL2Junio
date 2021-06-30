import { simbolo } from "src/clases/ast/simbolo";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import { ast } from "../../ast/ast";
import { entorno } from "../../ast/entorno";
import { expresion } from "../../interfaces/expresion";

export default class last implements expresion{
    public linea: number
    public columna: number
    public val: number
    constructor(linea,columna){
        this.linea = linea
        this.columna = columna
    }
    getTipo(ent: entorno, arbol: ast) {
        return tipo.INT
    }
    getValor(ent: entorno, arbol: ast) {
        if (ent instanceof Array){
            this.val = ent.length
            return ent.length
        } else {
            this.val = 1
            return 1
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        let t = { "id": c3d.generateTemp(), "val": this.val }
        c3d.temp[t.id] = t.val
        c3d.main += `\tt${t.id} = ${t.val};\n`
        return t.id
    }

}