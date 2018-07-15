import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: []
})
export class PermisosComponent implements OnInit {

  Disponibles:string[]=["Permiso1","Permiso2","Permiso3","Permiso4","Permiso5"];
  Asignados:string[]=[];
  constructor() { }

  ngOnInit() {
    console.log(localStorage.getItem('asignados'));
    if(localStorage.getItem('asignados') != null){
      this.Disponibles = JSON.parse(localStorage.getItem('disponibles'));
      this.Asignados = JSON.parse(localStorage.getItem('asignados'));
    }
  }

  agregarPermiso(permiso:string){
    this.Disponibles.splice(this.Disponibles.indexOf(permiso),1);
    this.Asignados.push(permiso);
  }
  
  quitarPermiso(permiso:string){
    this.Asignados.splice(this.Asignados.indexOf(permiso),1);
    this.Disponibles.push(permiso);
  }

  guardar(){
    console.log("Enviando a DB:" , this.Asignados);
    localStorage.setItem('asignados',JSON.stringify(this.Asignados));
    localStorage.setItem('disponibles',JSON.stringify(this.Disponibles));
  }
}
