import {InsertarCst} from "./ReportController";

export default  class NodeAst{
  public produccion: string;
  public token?: string;
  public id?:string;
  public listaIns:Array<NodeAst>;

  constructor(produccion:string, token?:string) {
    this.produccion = produccion;
    this.token = '"' + token +'"';
    this.id = this.generarID();
    this.listaIns = [];

    const temp = this.id+"[shape = record, label=" + this.produccion + "];\n";

    console.log(temp);
    InsertarCst(temp);
  }

  InsertarNodos(listaNodo:Array<NodeAst>){
    for(let i=0;i<listaNodo.length;i++){
      this.listaIns.push(listaNodo[i]);
    }
  }

  InsertarHijo(hijo : NodeAst){
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
    const temp = new NodeAst(produccion,token);
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
