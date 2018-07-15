import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SweetalertService } from '../shared/sweetalert.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  hospital: Medico;
  token: string;

  constructor(public http: HttpClient, private sa:SweetalertService) { 
    this.cargarStorage();
  }


  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }
    else{
      this.token = '';
    }
  }


  cargarMedicos(desde:number = 0){
    
    let url = URL_SERVICIOS + "/medico?desde="+ desde;
    return this.http.get(url).pipe(map( (resp:any)=>{
      return resp;
    })); 
  }

  borrarMedico(id:string){
    let url = URL_SERVICIOS + "/medico/"+ id;
    url+= "?token="+ this.token;

    return this.http.delete(url).pipe(map( (resp:any)=>{
      this.sa.swal('Exito!', `TODO SALIO BIEN`, 'success' );
      return true;
    }));

    
  }

  crearMedico(medico:Medico){
    let url = URL_SERVICIOS + "/medico"
    url+= "?token="+ this.token;
    return this.http.post(url, medico).pipe(map( (resp:any)=>{
      this.sa.swal('Medico Creado', resp.nombre, 'success' );
      return resp;
    }));
  }

  buscarMedico(termino:string){
    let url = URL_SERVICIOS + "/busqueda/coleccion/medicos/"+ termino;
    return this.http.get(url).pipe(map( (resp:any)=>{
      return resp;
    }));
  }

  actualizarMedico(medico: Medico){
    let url = URL_SERVICIOS + "/medico/"+ medico._id;
    url+= "?token="+ this.token;

    return this.http.put(url,medico).pipe(map( (resp:any)=>{

      this.sa.swal('Exito!', `El Medico ${resp.medico.nombre} fue actualizado correctamente`, 'success' );
      return true;
    }));
  }

  obtenerMedico(id:string){
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map( (resp:any)=>{
      return resp.medico;
    }));
  }



}
