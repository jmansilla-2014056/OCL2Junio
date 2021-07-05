import { Component } from '@angular/core';
import { tablaSimbolos } from 'src/reports/tablaSimbolos';
import { entorno } from 'src/clases/ast/entorno';
import { simbolo } from 'src/clases/ast/simbolo';
import { tipo } from 'src/clases/ast/tipo';
import { ast } from '../clases/ast/ast';
import { astXpath } from '../reports/astXpath';
import {getErrores, getOptimizar, InsertarError} from '../reports/ReportController';
import gramatical from '../reports/gramatical';
import nodo_xml from '../clases/xml/nodo_xml';
import xml from "../gramatica/xml";
import op from "../gramatica/optimizador";
import xmld from "../gramatica/xml_descendente";

import xpath from "../gramatica/xpath";
import xpathd from "../gramatica/xpath_descendente";
import ast_xpath from "../clases/ast/ast_xpath";

import xquery from "../gramatica/xquery";

import { Buffer } from 'buffer';
import { nodo3d } from 'src/clases/c3d/nodo3d';
import { simbolTabla } from 'src/clases/ast/simbolTabla';
import select from 'src/clases/expresiones/select';
import { arreglo } from 'src/clases/arreglo';
import ast_xquery from 'src/clases/ast/ast_xquery';
import declaraciones from "../clases/optimizador/declaraciones";
import metodo from "../clases/optimizador/metodo";
import { instruccion } from 'src/clases/interfaces/instruccion';
import Traductor from "../clases/contenido/Traductor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  content: string = "CODEMIRROR"
  xcode: string = `<?xml version="1.0" encoding="UTF-8"?>
  <m>
	<n atr="a">6</n>
	<o atr="o">7</o>
	<k atr="k">4</k>
</m>`
  /* MANEJO ARCHIVOS
  fls = new Array<archivos>()
  index_files: number = 0
  actual_file: number*/
  entornoGlobal: entorno = new entorno(null)
  nombre: string = "name_ini"
  contenido: string = "cont_ini"
  /*consola: string = `for $x in /catalog/book
where $x/price>30
order by $x/title
return $x`*/
  consola: string = `declare function local:suma($integer as xs:integer) as xs:double{
    let $x := ($integer + 2)
    return $x
};
local:suma(/m/n)`
  salida: string = ""
  cd3r:string = ""
  n_node: number
  c3d: nodo3d
  ts: Array<simbolTabla>
  tsx: Array<simbolTabla>
  result: ast_xpath
  heap: Array<arreglo>
  stack: Array<arreglo>
  xquery_result: string
  P_xpath: boolean
  entornos: Array<entorno>
  xquery: Array<instruccion>
  entXquery: ast_xquery;
  /*openFile(input) {
    var x: File = input.files[0]
    if (x) {
      var reader = new FileReader()
      reader.onload = function (e) {
        let contenido = e.target.result
        document.getElementById('name').innerText = x.name
        document.getElementById('contenido2').innerHTML = '' + contenido
      }
      reader.readAsText(x)
    } else {
      document.getElementById('contenido').innerText = "No hay archivo"
    }
  }
  /addFile() {
    let newFile = new archivos(this.index_files, document.getElementById('name').textContent, document.getElementById('contenido2').textContent)
    this.fls.push(newFile)
    this.index_files++
  }
  showFile() {
    let actual_file: archivos = this.fls[this.actual_file]
    document.getElementById('name').innerText = actual_file.nombre
    this.xcode = actual_file.contenido
  }*/

  optimizar() {
    localStorage.clear();
    let entrada = this.clearEntry(this.cd3r);
    let op_result = op.parse(entrada);
    let exit = "";
    if(op_result[0] instanceof declaraciones){
      exit += op_result[0].getText();
    }
    if(op_result[1] instanceof Array){
      for( let m of op_result[1]){
       if(m instanceof  metodo){
         for(let i = 0 ; i < 6; i++){
           m.optimizarCaso1();
           m.optimizarCaso3();
           m.optimizarCaso4();
           m.optimizarCaso5();
           m.optimizarCaso6();
           m.optimizarCaso7();
           m.optimizarCaso8();
         }
         exit += m.getText();
       }
      }
    }
    this.cd3r = exit;
    this.consola = localStorage.getItem("reglas");
  }

  /* Analisis Ascendente */
  analizarXml() {
    if (this.xcode !== "") {
      this.replaceCharacters()
      localStorage.removeItem('errores');
      localStorage.setItem('cst', " digraph L {\n" + "\n" + "  node [shape=record fontname=Arial];");
      localStorage.setItem('actual', 'cst');
      try {
        let entrada = this.clearEntry(this.xcode);
        let parse_result = xml.parse(entrada);
        let result: nodo_xml = parse_result.etiqueta
        let encoding: nodo_xml = parse_result.encoding
        let reportG = parse_result.reportG;
        console.log("Analisis xml (arbol):")
        result.printNode("")
        let arbol = new ast().getArbolito(result);
        localStorage.setItem('ast', 'digraph g {\n ' + arbol + '}');
        localStorage.setItem('cst', localStorage.getItem('cst') + "}");
        // reporte gramatical
        this.tablaReportGramatical(new gramatical("", "").getReporteG(reportG), "Reporte Gramatical Ascendente", "reportG", "TitleReportGramatical");
        // Entornos
        this.n_node = 1
        let tipo_encoding: string
        for (let atr of encoding.atributos) {
          if (atr.id.toLocaleLowerCase() == "encoding") {
            tipo_encoding = atr.valor
          }
        }
        this.createEntorno(result, encoding, tipo_encoding);
        // reporte tabla de simbolos
          //this.tablaSimbolosReport();
        // Fin analisis
        alert("Analisis xml finalizado con exito!");
      } catch (error) {
        alert("Error, no ha sido posible recuperarse, xml!");
      }
    } else {
      alert("Error, Ingrese archivo xml a analizar!");
    }
  }

  /* Analisis descendente */
  analizarXmlDesc() {
    if (this.xcode !== "") {
      this.replaceCharacters()
      localStorage.removeItem('errores');
      localStorage.setItem('cst', "digraph L {\n" + "\n" + "  node [shape=record fontname=Arial];");
      localStorage.setItem('actual', 'cst');
      try {
        let entrada = this.clearEntry(this.xcode);
        let parse_result = xmld.parse(entrada);
        let result: nodo_xml = parse_result.etiqueta;
        let encoding: nodo_xml = parse_result.encoding;
        let reportG = parse_result.reportG;
        console.log("Analisis xml (arbol descendente):")
        result.printNode("")
        let arbol = new ast().getArbolito(result);
        localStorage.setItem('ast', 'digraph g {\n ' + arbol + '}');
        localStorage.setItem('cst', localStorage.getItem('cst') + "}");
        /* reporte gramatical */
        this.tablaReportGramatical(new gramatical("", "").getReporteG(reportG), "Reporte Gramatical Descendente", "reportG", "TitleReportGramatical");
        /* Entornos */
        this.n_node = 1
        let tipo_encoding: string
        for (let atr of encoding.atributos) {
          if (atr.id.toLocaleLowerCase() == "encoding") {
            tipo_encoding = atr.valor
          }
        }
        this.createEntorno(result, encoding, tipo_encoding);
        /* reporte tabla de simbolos */
          //this.tablaSimbolosReport();
        /* Fin analisis */
        alert("Analisis finalizado con exito!");
      } catch (error) {
        alert("Error, no ha sido posible recuperarse!");
      }
    } else {
      alert("Error, Ingrese archivo a analizar!");
    }
  }

  /*MANEJO DE ENTORNOS DE LOS NODOS*/
  createEntorno(result: nodo_xml, encoding: nodo_xml, tipo_encoding: string) {
    this.entornoGlobal = new entorno(null)
    if (result.id == result.id2) {
      for (let atr of encoding.atributos) {
        this.entornoGlobal.agregar(atr.id, new simbolo(atr.id, "", tipo.ATRIBUTE, atr.linea, atr.columna))
      }
      let entornoNodo: entorno = new entorno(this.entornoGlobal)
      entornoNodo.agregar("id", new simbolo("id", result.id, tipo.STRING, result.linea, result.columna))
      if (result.valor != "") {
        entornoNodo.agregar("valor", new simbolo(result.id, this.encoding(result.valor, tipo_encoding), tipo.VALOR, result.linea, result.columna))
      }
      entornoNodo.agregar("n_etiquetas", new simbolo("n_etiquetas", 2, tipo.N_ETIQUETAS, result.linea, result.columna))
      entornoNodo.agregar("index", new simbolo("index", this.n_node, tipo.INT, result.linea, result.columna))
      this.n_node++
      for (let i = 0; i < result.atributos.length; i++) {
        let atr = result.atributos[i]
        entornoNodo.agregar("atr" + i, new simbolo(atr.id, atr.valor, tipo.ATRIBUTE, atr.linea, atr.columna))
      }
      result.entorno = entornoNodo
      /*FUNCION RECURSIVA PARA CREAR ENTORNOS DE LOS HIJOS*/
      for (let j = 0; j < result.hijos.length; j++) {
        let hijo = result.hijos[j]
        this.addNodo(hijo, result.entorno, j, tipo_encoding)
      }
      /*SE AGREGA AL ENTORNO GLOBAL*/
      this.entornoGlobal.agregar("xml", new simbolo(result.id, entornoNodo, tipo.STRUCT, result.linea, result.columna))
      console.log(this.entornoGlobal)
    } else {
      InsertarError("Semantico", `Error: etiqueta inicio ${result.id} no es igual a cierre ${result.id2}`, "xml", result.linea, result.columna)
    }
  }

  /* Agregar nodo a entorno */
  addNodo(hijo: nodo_xml, oldEntorno: entorno, n: number, tipo_encoding: string) {
    if (hijo.id == hijo.id2 || hijo.id2 == null) {
      let newEntorno: entorno = new entorno(oldEntorno)
      newEntorno.agregar("id", new simbolo("id", hijo.id, tipo.STRING, hijo.linea, hijo.columna))
      if (hijo.valor != "") {
        newEntorno.agregar("valor", new simbolo(hijo.id, this.encoding(hijo.valor, tipo_encoding), tipo.VALOR, hijo.linea, hijo.columna))
      }
      if (hijo.id2 == null) {
        newEntorno.agregar("n_etiquetas", new simbolo("n_etiquetas", 1, tipo.N_ETIQUETAS, hijo.linea, hijo.columna))
      } else {
        newEntorno.agregar("n_etiquetas", new simbolo("n_etiquetas", 2, tipo.N_ETIQUETAS, hijo.linea, hijo.columna))
      }
      newEntorno.agregar("index", new simbolo("index", this.n_node, tipo.INT, hijo.linea, hijo.columna))
      this.n_node++
      for (let i = 0; i < hijo.atributos.length; i++) {
        let atr = hijo.atributos[i]
        newEntorno.agregar("atr" + i, new simbolo(atr.id, atr.valor, tipo.ATRIBUTE, atr.linea, atr.columna))
      }
      /*FUNCION RECURSIVA PARA CREAR ENTORNOS DE LOS HIJOS*/
      hijo.entorno = newEntorno
      for (let j = 0; j < hijo.hijos.length; j++) {
        let son = hijo.hijos[j]
        this.addNodo(son, hijo.entorno, j, tipo_encoding)
      }
      /*SE AGREGA AL ENTORNO PADRE*/
      oldEntorno.agregar("hijo" + n, new simbolo(hijo.id, newEntorno, tipo.STRUCT, hijo.linea, hijo.columna))
    } else {
      InsertarError("Semantico", `Error: etiqueta inicio ${hijo.id} no es igual a cierre ${hijo.id2}`, "xml", hijo.linea, hijo.columna)
    }
  }

  /* Reporte Gramatical */
  tablaReportGramatical(gramar: string, titles: string, idg: string, idt: string) {
    document.getElementById(idt).innerHTML = titles;
    document.getElementById(idg).innerHTML = gramar;
  }

  /* Reporte para la tabla de simbolos */
  tablaSimbolosReport() {
    let simbolitos = new tablaSimbolos()
    simbolitos.getTableSimbolos(this.entornoGlobal.tabla["xml"].valor)
    console.log("--------------------------")
    console.log(this.entornoGlobal.tabla["xquery"].valor)
    console.log("--------------------------")
    this.entXquery.getSimbolitos(this.entornoGlobal.tabla["xquery"].valor)
    this.tsx = this.entXquery.simbolos
    this.ts = simbolitos.simbolos
    if (this.tsx !== undefined && this.ts !== undefined) {
      this.ts = this.ts.concat(this.tsx);
    } else if (this.tsx !== undefined) {
      this.ts = this.tsx;
    }
    /*let simbolitos = new tablaSimbolos().getTableSimbolos(this.entornoGlobal);
    document.getElementById("TitleSimbolTable").innerHTML = "Tabla de Simbolos"
    document.getElementById("reportS").innerHTML = simbolitos;*/
  }

  /* Reporte para la tabla de simbolos */
  tablaReportError() {
    let errores = getErrores();
    document.getElementById("TitleErrorTable").innerHTML = "Reporte de Errores"
    document.getElementById("reportE").innerHTML = errores;
  }

  /* Analisis xpath ascendente */
  execXpath() {
    if (this.consola !== "") {
      /* ejecuta xml */
      this.analizarXml();

      this.P_xpath = true
      localStorage.removeItem('errores');
      localStorage.setItem('cstx', "digraph L {\n" + "\n" + "  node [shape=record fontname=Arial];");
      localStorage.setItem('actual', 'cst');
      try {
        let entrada = this.consola
        let parse_result = xpath.parse(entrada);
        this.result = parse_result.xpath;
        let reportG = parse_result.reportG;

        let xpath_str
        let arbol: ast = new ast()
        xpath_str = this.result.ejecutar(this.entornoGlobal.tabla["xml"].valor, arbol)
        this.salida = xpath_str
        console.log(this.salida)

        //Reporte Ast
        let arbolito = new astXpath().getArbolito(this.result);
        localStorage.setItem('astx', 'digraph g {\n ' + arbolito + '}');

        //reporte gramatical
        this.tablaReportGramatical(new gramatical("", "").getReporteG(reportG), "Reporte Gramatical Xpath Ascendente", "reportGX", "TitleReportGramaticalX");

        //Fin analisis
        alert("Analisis xpath finalizado con exito!");

        /*  let entrada = this.consola
          let parse_result = xpath.parse(entrada);
          this.result = parse_result.xpath;
          let reportG = parse_result.reportG;

          let xpath_str
          let arbol: ast = new ast()
          xpath_str = this.result.ejecutar(this.entornoGlobal.tabla["xml"].valor, arbol)
          this.salida = xpath_str
          console.log(this.salida)

          //Reporte Ast
          let arbolito = new astXpath().getArbolito(this.result);
          localStorage.setItem('astx', 'digraph g {\n ' + arbolito + '}');

          //reporte gramatical
          this.tablaReportGramatical(new gramatical("", "").getReporteG(reportG), "Reporte Gramatical Xpath Ascendente", "reportGX", "TitleReportGramaticalX");

          //Fin analisis
          alert("Analisis xpath finalizado con exito!");*/
      } catch (error) {
        alert("Error, no ha sido posible recuperarse, xpath!");
        console.log(error);
      }
    } else {
      alert("Error, Ingrese consulta xpath a ejecutar!");
    }
  }

  /* Analisis xpath descendente */
  execXpathD() {
    if (this.consola !== "") {
      localStorage.removeItem('errores');
      localStorage.setItem('cstx', "digraph L {\n" + "\n" + "  node [shape=record fontname=Arial];");
      localStorage.setItem('actual', 'cstx');

      try {
        let entrada = this.consola
        let parse_result = xpathd.parse(entrada);
        this.result = parse_result.xpath;
        let reportG = parse_result.reportG;
        this.reOrderArray(this.result["lista_several"]);
        //this.reOrderArray(result["lista_several"]); <------------- CONFLICTO

        let xpath_str
        let arbol: ast = new ast()
        xpath_str = this.result.ejecutar(this.entornoGlobal.tabla["xml"].valor, arbol)
        this.salida = xpath_str
        console.log(this.salida)

        /* Reporte ast */
        let arbolito = new astXpath().getArbolito(this.result);
        localStorage.setItem('astx', 'digraph g {\n ' + arbolito + '}');

        /* reporte gramatical */
        this.tablaReportGramatical(new gramatical("", "").getReporteG(reportG), "Reporte Gramatical Xpath Descendente", "reportGX", "TitleReportGramaticalX");

        /* Fin analisis */
        alert("Analisis finalizado con exito!");
      } catch (error) {
        alert("Error, no ha sido posible recuperarse!");
      }
    } else {
      alert("Error, Ingrese consulta a ejecutar!");
    }
  }

  /* analizdor xquery ascendente */
  execXquery() {
    if (this.consola !== "") {
      /* ejecuta xml */
      this.analizarXml();

      this.xquery = new Array<instruccion>()
      this.P_xpath = false
      localStorage.removeItem('errores');
      try {
        let entrada = this.consola
        let result_parser = xquery.parse(entrada);
        this.xquery = result_parser.xquery
        let result = result_parser['xquery'];
        let reportG = result_parser['reportG'];

        if (Array.isArray(result[0])) {
          result = result[0]
        }

        this.entXquery = new ast_xquery;
        this.entXquery.creaEntornoXquery(this.entornoGlobal, result);
        //entXquery.getSimbolitos(this.entornoGlobal.tabla["xquery"].valor)
        //this.tsx = entXquery.simbolos;

        /* Ejecuta xquery */
        let result_str
        let arbol = new ast();
        result_str = this.entXquery.ejecutar(this.entornoGlobal, arbol);
        this.salida = result_str
        this.xquery_result = result_str

        /* reporte gramatical */
        this.tablaReportGramatical(new gramatical("", "").getReporteG(reportG), "Reporte Gramatical Xquery", "reportGQ", "TitleReportGramaticalQ");

        /* Fin analisis */
        alert("Analisis xquery finalizado con exito!");
      } catch (error) {
        alert("Error, no ha sido posible recuperarse, xquery!");
        console.log(error);
      }
    } else {
      alert("Error, Ingrese consulta xquery a ejecutar!");
    }
  }

  execXqueryV2() {
    let temp : string = this.consola;
    for (var _i = 0; _i < 80; _i++) {
      temp = temp.split('>' + '\s').join('>');
      temp = temp.split(' eq ').join('==');
      temp = temp.split(' or ').join(' || ');
      temp = temp.split(' and ').join(' && ');
      temp = temp.split('as xs').join(' ');
    }

    let traductor: Traductor = new Traductor();
    this.salida = traductor.traducir_3d(temp);
  }

  execXqueryVT() {
    let temp : string = this.consola;
    for (var _i = 0; _i < 80; _i++) {
      temp = temp.split('>' + '\s').join('>');
      temp = temp.split(' eq ').join('==');
      temp = temp.split(' or ').join(' || ');
      temp = temp.split(' and ').join(' && ');
      temp = temp.split('as xs').join(' ');
    }

    let traductor: Traductor = new Traductor();
    this.salida = traductor.traducir_3d(temp);
  }

  reporteArbolA() {
    window.open(window.location.href + 'xml/ast.html', '_blank');
  }

  reporteArbolB() {
    window.open(window.location.href + 'xml/cst.html', '_blank');
  }

  reporteArbolC() {
    window.open(window.location.href + 'xpath/ast.html', '_blank');
  }

  reporteArbolD() {
    console.log("hola");
    let errores = getOptimizar();
    document.getElementById("TitleErrorTable").innerHTML = "Reporte"
    document.getElementById("reportE").innerHTML = errores;
  }

  /* Limpiar Entrada */
  clearEntry(entrada: string): string {
    for (var _i = 0; _i < 50; _i++) {
      entrada = entrada.split('>' + '\s').join('>');
      entrada = entrada.split('> ').join('>');
    }
    return entrada;
  }

  /* Reordena array Xpath descendente*/
  reOrderArray(arreglo: Array<any>) {
    for (let index = 0; index < arreglo.length; index++) {
      arreglo[index].reverse();
    }
  }

  encoding(str: string, tipe: string) {
    if (tipe.toLocaleLowerCase() == "utf8") {
      let buf1 = Buffer.from(str);
      return buf1.toString('utf8')
    } else if (tipe.toLocaleLowerCase() == "ascii") {
      let buf1 = Buffer.from(str);
      return buf1.toString('ascii')
    } else if (tipe.toLocaleLowerCase() == "iso-8859-1") {
      let buf1 = Buffer.from(str);
      return buf1.toString('latin1')
    }
    return str
  }

  replaceCharacters() {
    while (this.xcode.includes("&quot;")) {
      this.xcode = this.xcode.replace('&quot;', '"')
    }
    while (this.xcode.includes("&amp;")) {
      this.xcode = this.xcode.replace("&amp;", "&")
    }
    while (this.xcode.includes("&apos;")) {
      this.xcode = this.xcode.replace("&apos;", "'")
    }
  }
  addXml() {
    this.c3d = new nodo3d()
    this.c3d.main += `\t\t/* xml */\n`
    this.c3d.addRoot()
    let ent: entorno = this.entornoGlobal.tabla["xml"].valor
    //xml
    this.addNodo3D(ent)
    if (this.P_xpath){//xpath
      this.c3d.main += `\n\t\t/* xpath */\n`
      this.processSeveral(ent)
    } else {//xquery
      this.processXquery()
    }
    this.c3d.printEntorno(this.entornos)
    this.c3d.endCode()
    this.cd3r = this.c3d.code
    console.log(this.entornoGlobal)
  }
  addNodo3D(ent: entorno) {
    this.c3d.addNodo(ent)
    for (let key in ent.tabla) {
      if (key.startsWith("atr")) {
        this.c3d.addAtr(ent.tabla[key])
      } else if (key.startsWith("hijo")) {
        this.addNodo3D(ent.tabla[key].valor)
      } else if (key == "valor") {
        this.c3d.addVal(ent.tabla[key])
      }
    }
  }
  processSeveral(ent) {
    this.entornos = new Array<entorno>()
    let entorno_temp
    for (let i = 0; i < this.result.lista_several.length; i++) {
      let slc: Array<select> = this.result.lista_several[i]
      entorno_temp = [ent]
      for (let slc_sub of slc) {
        entorno_temp = slc_sub.matches
        slc_sub.traducir(entorno_temp, this.c3d)
      }
      //entorno final
      console.log("entorno final")
      console.log(entorno_temp)
      for (let n_ent of entorno_temp){
        this.entornos.push(n_ent)
      }
      //this.c3d.printEntorno(entorno_temp)
    }
  }
  arrHeap() {
    this.heap = new Array<arreglo>()
    for (let key in this.c3d.heap) {
      this.heap.push(new arreglo(key, this.c3d.heap[key]))
    }
  }
  arrStack() {
    this.stack = new Array<arreglo>()
    for (let key in this.c3d.stack) {
      this.stack.push(new arreglo(key, this.c3d.stack[key]))
    }
  }
  processXquery(){
    this.entornos = new Array<entorno>()
    console.log("LISTA XQUERY")
    console.log(this.xquery)
    for (let inst of this.xquery){
      inst.traducir([this.entornoGlobal.tabla["xquery"].valor], this.c3d)
    }
    let xqueryEnt: entorno = new entorno(this.entornoGlobal)
    xqueryEnt.agregar("n_etiquetas", new simbolo("n_etiquetas", 0, tipo.N_ETIQUETAS, 0, 0))
    xqueryEnt.agregar("valor", new simbolo("valor", this.xquery_result, tipo.VALOR, 0, 0))
    this.entornos.push(xqueryEnt)
  }

}
