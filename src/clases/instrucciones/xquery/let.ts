import { ast } from "src/clases/ast/ast";
import { entorno } from "src/clases/ast/entorno";
import { simbolo } from "src/clases/ast/simbolo";
import { tipo } from "src/clases/ast/tipo";
import { nodo3d } from "src/clases/c3d/nodo3d";
import primitivo from "src/clases/expresiones/primitivo";
import select from "src/clases/expresiones/select";
import { instruccion } from "src/clases/interfaces/instruccion";
import { InsertarError } from "src/reports/ReportController";
import Function from "./function";
import nativa from "./nativa";
import Return from "./return";
import variable from "./variable";

export default class LET implements instruccion {
    public identificador: variable;
    public asignacion: any;
    public return: Return;
    public linea: number;
    public columna: number;

    constructor(id, asig, linea, columna) {
        this.identificador = id;
        this.asignacion = asig;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(ent: entorno, arbol: ast) {
        let result: any = null;
        let entXquery = ent.tabla["xquery"].valor
        let entXml: any = null;
        if (Object.prototype.hasOwnProperty.call(ent.tabla, "xml")) {
            entXml = ent.tabla["xml"].valor;
        }

        if (this.asignacion !== null) {
            if (Array.isArray(this.asignacion)) {
                if (this.asignacion[0] === "to") {
                    if (this.asignacion[1] instanceof primitivo && this.asignacion[2] instanceof primitivo) {
                        result = [];
                        for (let i = Number(this.asignacion[1].getValor(ent, arbol)); i <= Number(this.asignacion[2].getValor(ent, arbol)); i++) {
                            result.push(i);
                        }
                        this.identificador.valor = result;
                    }
                }
            } else {
                result = [];
                if (this.asignacion instanceof Function || this.asignacion instanceof nativa) {
                    result.push(this.asignacion.ejecutar(ent, arbol));
                    this.identificador.valor = result;
                } else {
                    result.push(this.asignacion.getValor(ent, arbol));
                    this.identificador.valor = result;
                }
            }
        } else {
            let entorno_temp;
            result = new Array<Array<entorno>>()
            for (let i = 0; i < this.identificador.xpath.length; i++) {
                let slc: Array<select> = this.identificador.xpath[i]
                entorno_temp = entXml
                console.log(entorno_temp);
                for (let slc_sub of slc) {
                    entorno_temp = slc_sub.getValor(entorno_temp, arbol)
                }
                result.push(entorno_temp)
            }
            this.identificador.valor = result;
            result.push("xpath");
        }

        if (this.return !== null && this.return !== undefined) {
            result = this.return.ejecutar(ent, arbol);
            return result;
        }
    }
    traducir(ent: entorno[], c3d: nodo3d) {
        c3d.main += `\t//let;\n`
        let n_ent: entorno = ent[0]
        for (let key in n_ent.tabla) {
            if (key.startsWith("var")) {
                let simbol: simbolo = n_ent.tabla[key]
                if (simbol.id == this.identificador.id) {
                    simbol.valor = this.identificador.traducir(ent,c3d)
                    let ret = { "id": c3d.t_res, "val": c3d.temp[c3d.t_res] }
                    simbol.stack = ret.val
                    break
                }
            }
        }
    }
}