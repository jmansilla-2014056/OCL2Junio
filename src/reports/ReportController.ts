import {Errors} from './Errors';


  export function InsertarError(tipo: string, desc: string, analis:string, linea: number, columna: number){
    let error = new Errors(tipo,desc,analis,linea,columna);
    let lista = [];
    let listaerrores;
    if(localStorage.getItem('errores') === null){
      localStorage.setItem('errores', JSON.stringify(lista));
      listaerrores = JSON.parse(localStorage.getItem('errores'));
    }else{
      listaerrores = JSON.parse(localStorage.getItem('errores'));
    }

    listaerrores.push(error);
    localStorage.setItem('errores', JSON.stringify(listaerrores));
    alert(localStorage.getItem('errores'));

  }

  export function InsertarCst(nodoS: string){
    let inicializar = "digraph L {\n" + "\n" + "  node [shape=record fontname=Arial];"
    if(localStorage.getItem('cst') === null){
      localStorage.setItem('cst', inicializar);
      inicializar  = localStorage.getItem('cst');
    }else{
      inicializar  = localStorage.getItem('cst');
    }

    inicializar = inicializar + nodoS;
    localStorage.setItem('cst', inicializar);

  }
