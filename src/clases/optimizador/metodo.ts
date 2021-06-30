import {instruccion_3d} from "./instruccion_3d";
import goto_expresion from "./goto_expresion";
import if_expresion from "./if_expresion";
import etiqueta from "./etiqueta";
import eliminado from "./eliminado";
import call_funcion from "./call_funcion";

export default class metodo implements instruccion_3d{

  intrucciones_3d : Array<instruccion_3d>;
  public tipo : string;
  public met : string;

  constructor(tipo:string, met: string ) {
    this.intrucciones_3d = new Array<instruccion_3d>();
    this.tipo = tipo;
    this.met = met;
  }

  getText(){
    return this.tipo + " " + this.met + '(){\n' + this.recolectar_string() + '}';
  }

  ejecutar() {
  }

  insertar(instruccion: any) {
    this.intrucciones_3d.push(instruccion);
  }

  insertar_lista(lista: Array<any>) {
    for(let x of lista){
      this.intrucciones_3d.push(x);
    }
  }

  optimizarCaso1(){
    let listaparaEliminar : Array<Number> = [];
    for (let i = 0; i < this.intrucciones_3d.length; i++){
     if(this.intrucciones_3d[i] instanceof goto_expresion){
       for (let j = i; j < this.intrucciones_3d.length; j++){
         if(this.intrucciones_3d[j] instanceof if_expresion || this.intrucciones_3d[j] instanceof goto_expresion || this.intrucciones_3d instanceof call_funcion){
            listaparaEliminar = [];
            break;
         }else {
           if(this.intrucciones_3d[j] instanceof etiqueta){
             this.eliminarCodigo(listaparaEliminar);
             listaparaEliminar = [];
             i = j;
             break;
           }
           listaparaEliminar.push(j);
         }
       }
     }
    }
  }

  eliminarCodigo(listaEliminar : Array<Number>){
    for(let x of listaEliminar){
        console.log("se elimino: " + this.intrucciones_3d[x.valueOf()] )
        this.intrucciones_3d[x.valueOf()] = new eliminado();
    }
  }

  recolectar_string(): string{
    let r : string = "";
    for(let t of this.intrucciones_3d){
       if(!(t instanceof eliminado)){
         r+= t.getText() + "\n";
       }
    }
    return r;
  }

}
