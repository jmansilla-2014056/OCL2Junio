import { Component } from '@angular/core';
import nodo_xml from '../clases/xml/nodo_xml';
import archivos from "../clases/archivos";
import xml from "../gramatica/xml";
import { entorno } from 'src/clases/ast/entorno';
import { simbolo } from 'src/clases/ast/simbolo';
import { tipo } from 'src/clases/ast/tipo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  content: string = "CODEMIRROR"
  fls =  new Array<archivos>()
  fl: archivos
  xcode: string = ""
  index_files: number = 0
  actual_file: number
  nombre: string = "name_ini"
  contenido: string = "cont_ini"
  openFile(input) {
    var x: File = input.files[0]
    if (x){
      var reader = new FileReader()
      reader.onload = function (e) {
        let contenido = e.target.result
        //console.log(contenido)
        document.getElementById('name').innerText = x.name
        //document.getElementById('contenido').innerHTML = ''+contenido
        document.getElementById('contenido2').innerHTML = ''+contenido
      }
      //reader.readAsBinaryString(x)
      reader.readAsText(x)
    } else {
      document.getElementById('contenido').innerText = "No hay archivo"
    }
  }
  addFile(){
    let newFile = new archivos(this.index_files,document.getElementById('name').textContent,document.getElementById('contenido2').textContent)
    this.fls.push(newFile)
    this.index_files++
    //console.log(this.fls)
  }
  showFile(){
    //console.log(this.actual_file)
    //console.log(this.fls)
    let actual_file: archivos = this.fls[this.actual_file]
    document.getElementById('name').innerText = actual_file.nombre
    //document.getElementById('contenido').innerHTML = actual_file.contenido
    this.xcode = actual_file.contenido
    this.analizarXml(this.xcode)
    //console.log(actual_file)
  }
  analizarXml(entrada){
    for (var _i = 0; _i < 50; _i++) {
      entrada = entrada.split('>'+'\s').join('>');
      entrada = entrada.split('> ').join('>');
    }
    localStorage.clear();
    let result:nodo_xml = xml.parse(entrada);
    console.log("Analisis xml (arbol):")
    result.printNode("")
    console.log(result)

    /*MANEJO DE ENTORNOS DE LOS NODOS*/
    let entornoGlobal: entorno = new entorno(null)
    let entornoNodo: entorno = new entorno(null)
    if (result.valor != ""){
      entornoNodo.agregar(result.id,new simbolo(result.id,result.valor,tipo.VALOR,result.linea,result.columna))
    }
    for (let atr of result.atributos){
      entornoNodo.agregar(atr.id,new simbolo(atr.id,atr.valor,tipo.ATRIBUTE,atr.linea,atr.columna))
    }
    console.log("Entorno: "+result.id)
    result.entorno = entornoNodo
    /*FUNCION RECURSIVA PARA CREAR ENTORNOS DE LOS HIJOS*/
    for (let hijo of result.hijos){
      this.addNodo(hijo,result.entorno)
    }
    /*SE AGREGA AL ENTORNO GLOBAL*/
    entornoGlobal.agregar(result.id,new simbolo(result.id,entornoNodo,tipo.STRUCT,result.linea,result.columna))
    console.log(entornoGlobal)
  }
  addNodo(hijo: nodo_xml,oldEntorno: entorno){
    let newEntorno: entorno = new entorno(null)
    if (hijo.valor != ""){
      newEntorno.agregar(hijo.id,new simbolo(hijo.id,hijo.valor,tipo.VALOR,hijo.linea,hijo.columna))
    }
    for (let atr of hijo.atributos){
      newEntorno.agregar(atr.id,new simbolo(atr.id,atr.valor,tipo.ATRIBUTE,atr.linea,atr.columna))
    }
    /*FUNCION RECURSIVA PARA CREAR ENTORNOS DE LOS HIJOS*/
    //console.log(newNodo.id + "[" + newNodo.valor + "]" + " Hijos: "+newNodo.hijos.length)
    console.log(hijo.id + " Hijos: "+hijo.hijos.length)
    hijo.entorno = newEntorno
    for (let son of hijo.hijos){
      this.addNodo(son,hijo.entorno)
    }
    /*SE AGREGA AL ENTORNO PADRE*/
    oldEntorno.agregar(hijo.id,new simbolo(hijo.id,newEntorno,tipo.STRUCT,hijo.linea,hijo.columna))
  }
  test(){
    let diccionario: {[id:string]: string}
    diccionario = {}
    diccionario["letra"] = "A"
    diccionario["letra"] = "B"
    diccionario["letra"] = "C"
    console.log(diccionario)
  }
}

function abrirArchivo(evento) {
  let archivo = evento.target.files[0]
  if (archivo) {
    let reader = new FileReader()
    reader.onload = function(e){
      let contenido = e.target.result
      console.log(archivo.name)
      console.log(contenido)
      document.getElementById('contenido').innerText = ''+contenido
    }
    reader.readAsText(archivo)
  } else {
    document.getElementById('contenido').innerText = 'No hay archivo'
  }
}

/*window.addEventListener('load', ()=>{
  document.getElementById('file-input').addEventListener('change',abrirArchivo)
})*/
