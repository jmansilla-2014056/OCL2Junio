
import {Tabla} from './AST/Tabla';
import {Funcion} from './Instrucciones/Funcion';
import analizador from './analizador.js';
import {Arbol} from "./AST/Arbol";
import {Typo} from "./Instrucciones/Typo";
import {Set_type, Type_object} from "./Instrucciones/Type_object";
import {Declaracion} from "./Instrucciones/Declaracion";
import {Asignacion} from "./Instrucciones/Asignacion";
declare var generateTree;


export default class Traductor{
  traducido:boolean = false;
  arbol:Arbol;// "Arbol" de analisis sintactico y semantico
  tabla:Tabla;// tabla de simbolos

  constructor() {
  }

  traducir_3d(entrada: string): string{
    this.tabla = new Tabla(null); // Inicializar la tabla de simbolos

    this.arbol = analizador.parse(entrada);// obtener el rbol del analisis sintactico
    console.log(this.arbol);

    this.arbol.instrucciones.forEach(element => {//primeraa pasada para guardar las funciones declaradas
      if(element instanceof Funcion){
        element.traducir(this.tabla, this.arbol);
      }
    });

    this.arbol.contenido += "\nint main(){\n";
    this.arbol.instrucciones.forEach(element => {//primeraa pasada para guardar las funciones declaradas
      if(!(element instanceof Funcion)){
        element.traducir(this.tabla, this.arbol);
      }
    });
    this.arbol.contenido += "\nreturn 0;\n}\n";

    this.arbol.generar_temporales();
    this.arbol.instrucciones.forEach(element => {//primeraa pasada para guardar las funciones declaradas
      if(element instanceof Funcion){
        element.guardar_funcion(this.tabla, this.arbol);
      }
    });

    this.arbol.cabecera += this.arbol.generar_nativas();

    return this.arbol.cabecera + "\n" + this.arbol.contenido;
  }

  ejecutar_(entrada) : string{
    try{
      this.arbol = analizador.parse(entrada);// obtener el rbol del analisis sintactico
      return this.pasadas();
    }catch(e){
      alert("Error no encontrado :(");
      return '';
    }
  }

  pasadas(): string{
    try{
        //EJECUCION
        this.tabla = new Tabla(null); // Inicializar la tabla de simbolos
        this.arbol.instrucciones.forEach(element => {//primeraa pasada para guardar las funciones declaradas
          if(element instanceof Funcion){
            element.guardar_funcion(this.tabla, this.arbol);
          }
        });
        this.arbol.instrucciones.forEach(element => { // tercera pasada para guardar los tyipos
          if(element instanceof Typo){
            element.ejecutar(this.tabla, this.arbol);
          }
        });

        this.arbol.instrucciones.forEach(element => {//segunda pasada para guardar las variables
          if(element instanceof Type_object){
            element.ejecutar(this.tabla, this.arbol);
          }
        });
        this.arbol.instrucciones.forEach(element => {//segunda pasada para guardar las variables
          if(element instanceof Declaracion || element instanceof Set_type || element instanceof Asignacion){
            element.ejecutar(this.tabla, this.arbol);
          }
        });

        this.arbol.instrucciones.forEach(element => {// Ultima pasada para ejecutar algo distinto a lo anterior
          if(!(element instanceof  Declaracion) && !(element instanceof Funcion)
            && !(element instanceof Typo) && !(element instanceof Type_object)){
            element.ejecutar(this.tabla, this.arbol);
          }
        });
        let salida = "";
        this.arbol.consola.forEach(element => {// obtener los resultados de consola
          salida += element + "\n";
        });
        console.log(this.arbol);
        return salida;// mostrarlos en la secicon de consola
    }catch(e){
      alert("Error no encontrado");
      return '';
    }
  }

}
