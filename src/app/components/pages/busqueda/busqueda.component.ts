import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../../config/config';
import { map } from 'rxjs/operators';
import { Usuario } from '../../../models/usuario.model';
import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {


  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor( public activatedroute:ActivatedRoute, public http:HttpClient) {

    activatedroute.params.subscribe(params=>{
      let termino = params['termino'];
      this.buscar(termino).subscribe();
    });

    
   }

  ngOnInit() {

  }


  buscar(termino:string){

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    return this.http.get(url).pipe(map( (resp:any)=>{
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
      return resp;
    }));


  }


}
