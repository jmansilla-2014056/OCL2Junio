import {InsertarCst} from "./ReportController";
import nodo_xml from "../clases/xml/nodo_xml";

export default  class ASTNodo {
  public produccion: string;
  public token?: string;
  public id?:string;
  public listaIns:Array<ASTNodo>;

  constructor(produccion:string, token?:string) {
    this.produccion = produccion;
    this.token = this.escapeHtml(token);
    this.id = this.generarID();
    this.listaIns = [];
    let temp = this.id+'[shape = record, label="' + this.produccion + ' : ' + this.token + '"];\n';
    console.log(temp);
    InsertarCst(temp);
  }

  InsertarLista(listaNodo: any, nombre:string ){
    let puntero = new ASTNodo(nombre, "");
    for(let x of listaNodo){
      puntero.InsertarHijo(x.cst);
    }
    this.InsertarHijo(puntero);
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace('&', " &#38; ")
      .replace('<', " &#60; ")
      .replace('>', " &#62; ")
      .replace(':', " &#32;")
      .replace("'", "&#39;");
  }

  InsertarHijo(hijo : ASTNodo){
    if( !(hijo.produccion == 'lista_nodosA' && this.produccion == 'cuerpo_nodo') ) {
      this.listaIns.push(hijo);
      console.log(this.id + "->" + hijo.id);
      InsertarCst(this.id + "->" + hijo.id + ";\n");
      console.log("---------------INSERTAR HIJO--------------------");
      console.log(localStorage.getItem("cst"));
      console.log("------------------------------------------------");
    }

  }

  InsertarUnNodo(produccion:string, token?:string){
    const temp = new ASTNodo(produccion,token);
    if( !(temp.produccion == 'lista_nodosA' && this.produccion == 'cuerpo_nodoA') ){
      this.listaIns.push(temp);
      console.log(this.id + "->" + temp.id);
      InsertarCst(this.id + "->" + temp.id + ";\n");
      console.log("---------------INSERTAR NODO--------------------");
      console.log(localStorage.getItem("cst"));
      console.log("------------------------------------------------");
    }
  }

  generarID(): string {
    return '"'+ Math.random().toString(36).substr(2, 9) + '"';
  }

}
