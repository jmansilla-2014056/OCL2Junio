import {Errors} from './Errors';
import {Optimizado} from './Optimizado';

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
  console.log(listaerrores);

}

export function InsertarOptimizacion(regla: string, desc: string){
  let opt = new Optimizado(regla , desc);
  let lista = [];
  let listaopt;
  if(localStorage.getItem('reglas') === null){
    localStorage.setItem('reglas', JSON.stringify(lista));
    listaopt = JSON.parse(localStorage.getItem('reglas'));
  }else{
    listaopt= JSON.parse(localStorage.getItem('reglas'));
  }

  listaopt.push(opt);
  localStorage.setItem('reglas', JSON.stringify(listaopt));
  console.log(listaopt);

}


export function getErrores():string{
  let errorcitos = '';
  if (window.localStorage.getItem('errores') !== undefined && window.localStorage.getItem('errores')) {
    let listaerrores = JSON.parse(localStorage.getItem('errores'));
    errorcitos = '<table class="table">\n\
                        <thead>\n\
                        <tr>\n\
                            <th scope="col">#</th>\n\
                            <th scope="col">Analizador</th>\n\
                            <th scope="col">Tipo</th>\n\
                            <th scope="col">Descripcion</th>\n\
                            <th scope="col">Fila</th>\n\
                            <th scope="col">Columna</th>\n\
                        </tr>\n\
                        </thead>\n\
                        <tbody>\n';
    for (let index = 0; index < listaerrores.length; index++) {
      errorcitos += '<tr>\n\
                      <th scope="row">' + (index + 1).toString() + '</th>\n\
                      <td>' + listaerrores[index]["analizador"] + '</td>\n\
                      <td>' + listaerrores[index]["tipo"] + '</td>\n\
                      <td>' + listaerrores[index]["desc"] + '</td>\n\
                      <td>' + listaerrores[index]["linea"] + '</td>\n\
                      <td>' + listaerrores[index]["columna"] + '</td>\n\
                    </tr>';
    }
    errorcitos += '</tbody>\n</table>\n';
  }
  return errorcitos;
}

export function InsertarCst(nodoS: string){
  let actual = localStorage.getItem('actual');
  if(actual === 'cst'){
    let inicializar = localStorage.getItem('cst');
    inicializar = inicializar + nodoS;
    localStorage.setItem('cst', inicializar);
  }
  else if(actual === 'cstx'){
    let inicializar = localStorage.getItem('cstx');
    inicializar = inicializar + nodoS;
    localStorage.setItem('cstx', inicializar);
  }
}

