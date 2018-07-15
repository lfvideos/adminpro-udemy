import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SweetalertService } from '../shared/sweetalert.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
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
  cargarHospitales(desde:number = 0){
    
      let url = URL_SERVICIOS + "/hospital?desde="+ desde;
      return this.http.get(url).pipe(map( (resp:any)=>{
        return resp;
      }));
    
  }


  borrarHospital(id:string){
    let url = URL_SERVICIOS + "/hospital/"+ id;
    url+= "?token="+ this.token;

    return this.http.delete(url).pipe(map( (resp:any)=>{
      this.sa.swal('Exito!', `TODO SALIO BIEN`, 'success' );
      return true;
    }));

    
  }

  crearHospital(nombre:string){
    let url = URL_SERVICIOS + "/hospital"
    url+= "?token="+ this.token;
    return this.http.post(url, {nombre}).pipe(map( (resp:any)=>{
      this.sa.swal('Hospital Creado', resp.nombre, 'success' );
      return resp.hospital;
    }));
  }

  buscarHospital(termino:string){
    let url = URL_SERVICIOS + "/busqueda/coleccion/hospitales/"+ termino;
    return this.http.get(url).pipe(map( (resp:any)=>{
      return resp;
    }));
  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS + "/hospital/"+ hospital._id;
    url+= "?token="+ this.token;

    return this.http.put(url,hospital).pipe(map( (resp:any)=>{

      this.sa.swal('Exito!', `El Hospital ${resp.hospital.nombre} fue actualizado correctamente`, 'success' );
      return true;
    }));
  }

  obtenerHospital(id:string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map( (resp:any)=>{
      return resp.hospital;
    }));
  }


}
