import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient , public router:Router, private subirarchivoservice:SubirArchivoService) { 
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5 && this.token != "undefined") ? true: false;
  }


  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
    else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id:string, token:string , usuario:Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
    swal('Atencion', `Sesion Cerrada`, 'warning' );
  }

  loginGoogle(token:string){
    let url = URL_SERVICIOS + "/login/google"

    return this.http.post(url,{token}).pipe(map( (resp:any)=>{
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      swal('Hola!', `Bienvenido ${resp.usuario.nombre}`, 'success' );
      return true;
    }))
  }



  login(usuario:Usuario, recuerdame:boolean = false){
    
    let url = URL_SERVICIOS + "/login"
    
    return this.http.post(url,usuario).pipe(map( (resp:any)=>{
      //swal('Usuario Creado', usuario.email, 'success' );
      
      this.guardarStorage(resp.id, resp.token, resp.usuario);

      if(recuerdame){
        localStorage.setItem('email', usuario.email);
      }
      else{
        localStorage.removeItem('email');
      }
      swal('Hola!', `Bienvenido ${resp.usuario.nombre}`, 'success' );
      return true;
    }))

  }

  crearUsuario(usuario:Usuario){
    
    let url = URL_SERVICIOS + "/usuario"
    
    return this.http.post(url,usuario).pipe(map( (resp:any)=>{
      swal('Usuario Creado', usuario.email, 'success' );
      //return resp.usuario;
    }))

  }

  actualizarUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + "/usuario/"+ usuario._id;
    url+= "?token="+ this.token;

    return this.http.put(url,usuario).pipe(map( (resp:any)=>{

      if(resp.usuario._id === this.usuario._id){
        console.log("guardando en storage");
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
      }
      


      swal('Exito!', `Usuario ${resp.usuario.nombre} actualizado correctamente`, 'success' );
      return true;
    }));

  }

  cambiarImagen( file: File , id:string){

    this.subirarchivoservice.subirArchivo(file,'usuarios',id)
    .subscribe((resp:any) =>{
      console.log(resp);
      this.usuario.img = resp.usuario.img;
      this.guardarStorage(id, this.token , this.usuario);
      swal('Exito!', `La imagen se actualizo correctamente`, 'success' );
    });

  }

  cargarUsuarios(desde:number = 0){
    let url = URL_SERVICIOS + "/usuario?desde="+ desde;

    return this.http.get(url).pipe(map( (resp:any)=>{
      return resp;
    }));
  }


  buscarUsuarios(termino:string){
    let url = URL_SERVICIOS + "/busqueda/coleccion/usuarios/"+ termino;
    return this.http.get(url).pipe(map( (resp:any)=>{
      return resp;
    }));
  }

  borrarUsuario(id:string){
    let url = URL_SERVICIOS + "/usuario/"+ id;
    url+= "?token="+ this.token;

    return this.http.delete(url).pipe(map( (resp:any)=>{
      swal('Exito!', `TODO SALIO BIEN`, 'success' );
      return true;
    }));
  }


}



