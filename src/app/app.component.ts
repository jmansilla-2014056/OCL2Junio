import { Component } from '@angular/core';
import nodo_xml from 'src/clases/nodo_xml';
import archivos from "../clases/archivos";
import xml from "../gramatica/xml";

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
        console.log(contenido)
        document.getElementById('name').innerText = x.name
        document.getElementById('contenido').innerHTML = ''+contenido
        document.getElementById('contenido2').innerHTML = ''+contenido
      }
      //reader.readAsBinaryString(x)
      reader.readAsText(x)
    } else {
      document.getElementById('contenido').innerText = "No hay archivo"
    }
  }
  addFile(){
    let newFile = new archivos(this.index_files,document.getElementById('name').textContent,document.getElementById('contenido').textContent)
    this.fls.push(newFile)
    this.index_files++
    //console.log(this.fls)
  }
  showFile(){
    console.log(this.actual_file)
    //console.log(this.fls)
    let actual_file: archivos = this.fls[this.actual_file]
    document.getElementById('name').innerText = actual_file.nombre
    document.getElementById('contenido').innerHTML = actual_file.contenido
    this.xcode = actual_file.contenido
    this.analizarXml(this.xcode)
    //console.log(actual_file)
  }
  analizarXml(entrada){
    entrada = entrada.split('\n').join('');
    for (var _i = 0; _i < 50; _i++) {
      entrada = entrada.split('>'+'\s').join('>');
      entrada = entrada.split('> ').join('>');
    }

    alert(entrada);
    let result:nodo_xml = xml.parse(entrada);
    console.log("Analisis xml")
    result.printNode("")
    console.log(result)
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
