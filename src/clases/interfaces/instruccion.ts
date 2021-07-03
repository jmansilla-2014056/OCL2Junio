import { ast } from "../ast/ast";
import { entorno } from "../ast/entorno";
import { nodo3d } from "../c3d/nodo3d";

export interface instruccion{
    ejecutar(ent:entorno,arbol:ast);
    traducir(ent: Array<entorno>, c3d: nodo3d);
}