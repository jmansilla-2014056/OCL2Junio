import { Component } from '@angular/core';
import { tablaSimbolos } from 'src/reports/tablaSimbolos';
import { entorno } from 'src/clases/ast/entorno';
import { simbolo } from 'src/clases/ast/simbolo';
import { tipo } from 'src/clases/ast/tipo';
import { ast } from '../clases/ast/ast';
import { getErrores } from '../reports/ReportController';
import gramatical from '../reports/gramatical';
import nodo_xml from '../clases/xml/nodo_xml';
import archivos from "../clases/archivos";
import xml from "../gramatica/xml";
import xmld from "../gramatica/xml_descendente";

import xpath from "../gramatica/xpath";
import ast_xpath from "../clases/ast/ast_xpath";
import select from 'src/clases/expresiones/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  content: string = "CODEMIRROR"
  fls = new Array<archivos>()
  fl: archivos
  xcode: string = ""
  index_files: number = 0
  actual_file: number
  nombre: string = "name_ini"
  contenido: string = "cont_ini"
  consola: string = '/bookstore/book[@year="1990"]'
  salida: string = ""
  openFile(input) {
    var x: File = input.files[0]
    if (x) {
      var reader = new FileReader()
      reader.onload = function (e) {
        let contenido = e.target.result
        //console.log(contenido)
        document.getElementById('name').innerText = x.name
        //document.getElementById('contenido').innerHTML = ''+contenido
        document.getElementById('contenido2').innerHTML = '' + contenido
      }
      //reader.readAsBinaryString(x)
      reader.readAsText(x)
    } else {
      document.getElementById('contenido').innerText = "No hay archivo"
    }
  }
  addFile() {
    let newFile = new archivos(this.index_files, document.getElementById('name').textContent, document.getElementById('contenido2').textContent)
    this.fls.push(newFile)
    this.index_files++
    //console.log(this.fls)
  }
  showFile() {
    //console.log(this.actual_file)
    //console.log(this.fls)
    let actual_file: archivos = this.fls[this.actual_file]
    document.getElementById('name').innerText = actual_file.nombre
    //document.getElementById('contenido').innerHTML = actual_file.contenido
    this.xcode = actual_file.contenido
    //this.analizarXml()
    //console.log(actual_file)
  }

  /* Analisis Ascendente */
  analizarXml() {
    localStorage.clear();
    let entrada = this.clearEntry(this.xcode);
    let parse_result = xml.parse(entrada);
    let result: nodo_xml = parse_result.etiqueta
    let encoding: nodo_xml = parse_result.encoding
    let reportG = parse_result.reportG;
    //let resultd:nodo_xml = xmld.parse(entrada);
    console.log("Analisis xml (arbol):")
    result.printNode("")
    //console.log(result)

    let arbol = new ast().getArbolito(result);
    localStorage.setItem('ast', 'digraph g {\n ' + arbol + '}');
    localStorage.setItem('cst', localStorage.getItem('cst')+"}");

    /* reporte gramatical */
    this.tablaReportGramatical(new gramatical("","").getReporteG(reportG),"Reporte Gramatical Ascendente");

    /* Entornos */
    this.createEntorno(result,encoding);

    /* reporte tabla de simbolos */
    this.tablaSimbolosReport();
  }

  /* Analisis descendente */
  analizarXmlDesc() {
    localStorage.clear();
    let entrada = this.clearEntry(this.xcode);
    let parse_result = xmld.parse(entrada);
    let result:nodo_xml = parse_result.etiqueta;
    let encoding: nodo_xml = parse_result.encoding;
    let reportG = parse_result.reportG;

    console.log("Analisis xml (arbol descendente):")
    result.printNode("")
    console.log(result)

    let arbol = new ast().getArbolito(result);
    localStorage.setItem('ast', 'digraph g {\n ' + arbol + '}');
    localStorage.setItem('cst', localStorage.getItem('cst')+"}");

    /* reporte gramatical */
    this.tablaReportGramatical(new gramatical("","").getReporteG(reportG),"Reporte Gramatical Descendente");

    /* Entornos */
    this.createEntorno(result,encoding);

    /* reporte tabla de simbolos */
    this.tablaSimbolosReport();
  }

  /*MANEJO DE ENTORNOS DE LOS NODOS*/
  createEntorno(result: nodo_xml,encoding: nodo_xml) {
    let entornoGlobal: entorno = new entorno(null)
    if (result.id == result.id2) {
      for (let atr of encoding.atributos){
        entornoGlobal.agregar(atr.id,new simbolo(atr.id,"",tipo.ATRIBUTE,atr.linea,atr.columna))
      }
      let entornoNodo: entorno = new entorno(entornoGlobal)
      entornoNodo.agregar("id",new simbolo("id",result.id,tipo.STRING,result.linea,result.columna))
      if (result.valor != "") {
        entornoNodo.agregar("valor", new simbolo(result.id, result.valor, tipo.VALOR, result.linea, result.columna))
      }
      entornoNodo.agregar("n_etiquetas", new simbolo("n_etiquetas",2,tipo.N_ETIQUETAS,result.linea,result.columna))
      for (let i = 0; i < result.atributos.length; i++) {
        let atr = result.atributos[i]
        entornoNodo.agregar("atr" + i, new simbolo(atr.id, atr.valor, tipo.ATRIBUTE, atr.linea, atr.columna))
      }
      result.entorno = entornoNodo
      /*FUNCION RECURSIVA PARA CREAR ENTORNOS DE LOS HIJOS*/
      for (let j = 0; j < result.hijos.length; j++) {
        let hijo = result.hijos[j]
        this.addNodo(hijo, result.entorno, j)
      }
      /*SE AGREGA AL ENTORNO GLOBAL*/
      entornoGlobal.agregar("xml", new simbolo(result.id, entornoNodo, tipo.STRUCT, result.linea, result.columna))
      console.log(entornoGlobal)
      this.fls[this.actual_file].ent = entornoGlobal
    }
  }

  /* Agregar nodo a entorno */
  addNodo(hijo: nodo_xml, oldEntorno: entorno, n: number) {
    if (hijo.id == hijo.id2 || hijo.id2 == null) {
      let newEntorno: entorno = new entorno(oldEntorno)
      newEntorno.agregar("id",new simbolo("id",hijo.id,tipo.STRING,hijo.linea,hijo.columna))
      if (hijo.valor != "") {
        newEntorno.agregar("valor", new simbolo(hijo.id, hijo.valor, tipo.VALOR, hijo.linea, hijo.columna))
      }
      if (hijo.id2 == null){
        newEntorno.agregar("n_etiquetas", new simbolo("n_etiquetas",1,tipo.N_ETIQUETAS,hijo.linea,hijo.columna))
      } else {
        newEntorno.agregar("n_etiquetas", new simbolo("n_etiquetas",2,tipo.N_ETIQUETAS,hijo.linea,hijo.columna))
      }
      for (let i = 0; i < hijo.atributos.length; i++) {
        let atr = hijo.atributos[i]
        newEntorno.agregar("atr" + i, new simbolo(atr.id, atr.valor, tipo.ATRIBUTE, atr.linea, atr.columna))
      }
      /*FUNCION RECURSIVA PARA CREAR ENTORNOS DE LOS HIJOS*/
      hijo.entorno = newEntorno
      for (let j = 0; j < hijo.hijos.length; j++) {
        let son = hijo.hijos[j]
        this.addNodo(son, hijo.entorno, j)
      }
      /*SE AGREGA AL ENTORNO PADRE*/
      oldEntorno.agregar("hijo" + n, new simbolo(hijo.id, newEntorno, tipo.STRUCT, hijo.linea, hijo.columna))
    }
  }

  /* Reporte Gramatical */
  tablaReportGramatical(gramar:string,titles:string){
    document.getElementById("TitleReportGramatical").innerHTML = titles;
    document.getElementById("reportG").innerHTML = gramar;
  }

  /* Reporte para la tabla de simbolos */
  tablaSimbolosReport(){
    let simbolitos = new tablaSimbolos().getTableSimbolos(this.fls[this.actual_file].ent);
    document.getElementById("TitleSimbolTable").innerHTML = "Tabla de Simbolos"
    document.getElementById("reportS").innerHTML = simbolitos;
  }

  /* Reporte para la tabla de simbolos */
  tablaReportError(){
    let errores = getErrores();
    document.getElementById("TitleErrorTable").innerHTML = "Reporte de Errores"
    document.getElementById("reportE").innerHTML = errores;
  }

  execXpath() {
    let entrada = this.consola
    let result: ast_xpath = xpath.parse(entrada)
    let xpath_str
    let arbol: ast = new ast()
    xpath_str = result.ejecutar(this.fls[this.actual_file].ent.tabla["xml"].valor,arbol)
    this.salida = xpath_str
    console.log(this.salida)
  }

  reporteArbol() {
    window.open('/xml/ast.html', '_blank');
  }

  /* Limpiar Entrada */
  clearEntry(entrada: string): string {
    for (var _i = 0; _i < 50; _i++) {
      entrada = entrada.split('>' + '\s').join('>');
      entrada = entrada.split('> ').join('>');
    }
    return entrada;
  }

}

function abrirArchivo(evento) {
  let archivo = evento.target.files[0]
  if (archivo) {
    let reader = new FileReader()
    reader.onload = function (e) {
      let contenido = e.target.result
      console.log(archivo.name)
      console.log(contenido)
      document.getElementById('contenido').innerText = '' + contenido
    }
    reader.readAsText(archivo)
  } else {
    document.getElementById('contenido').innerText = 'No hay archivo'
  }
}

/*window.addEventListener('load', ()=>{
  document.getElementById('file-input').addEventListener('change',abrirArchivo)
})*/
