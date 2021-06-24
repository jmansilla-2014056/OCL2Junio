import {instruccion_3d} from "./instruccion_3d";

export default class if_expresion implements instruccion_3d{
  public izq : string;
  public operadorlogico: string;
  public der : string;
  public etiqueta : string;


  constructor(izq, operador, der, etiqueta) {
    this.izq = izq;
    this.operadorlogico = operador;
    this.der = der;
    this.etiqueta = etiqueta;
  }

  getText(){
    return 'if('+ this.izq + this.operadorlogico + this.der + ') goto ' + this.etiqueta + ';'
  }

  intrucciones_3d: Array<instruccion_3d>;

  ejecutar() {
  }

}
