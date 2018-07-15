import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map , catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError'
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { SweetalertService } from '../shared/sweetalert.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu:any = [];


  constructor(public http: HttpClient , public router:Router, private subirarchivoservice:SubirArchivoService, private sa: SweetalertService) { 
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5 && this.token != "undefined") ? true: false;
  }


  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      
    }
    else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id:string, token:string , usuario:Usuario , menu:any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout(){
    this.token = '';
    this.usuario = null;
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
    this.sa.displayMixin('warning', `Sesion Cerrada`);
  }

  loginGoogle(token:string){
    let url = URL_SERVICIOS + "/login/google"

    return this.http.post(url,{token}).pipe(map( (resp:any)=>{
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      //console.log(resp);
      this.sa.displayMixin('success', `Bienvenido ${resp.usuario.nombre}`);
      return true;
    }))
  }



  login(usuario:Usuario, recuerdame:boolean = false){
    
    let url = URL_SERVICIOS + "/login";
    
    if(recuerdame){
      localStorage.setItem('email', usuario.email);
    }
    else{
      localStorage.removeItem('email');
    }

    return this.http.post(url,usuario).pipe(map( (resp:any)=>{
      
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      this.sa.displayMixin('success', `Bienvenido ${resp.usuario.nombre}`);
      return true;
    }),catchError( err => {
      //console.log( err.error.mensaje);
      // return throwError(err);
      this.sa.swal('Error en el login', err.error.mensaje, 'error');
      return throwError(err.error.mensaje);
    }));

  }

  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + "/usuario"
    return this.http.post(url,usuario).pipe(map( (resp:any)=>{
      this.sa.swal('Usuario Creado', `usuario.email`, 'success');
    }));

  }

  actualizarUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + "/usuario/"+ usuario._id;
    url+= "?token="+ this.token;

    return this.http.put(url,usuario).pipe(map( (resp:any)=>{

      if(resp.usuario._id === this.usuario._id){
        console.log("guardando en storage");
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
      }
      
      this.sa.swal('Exito', `Usuario ${resp.usuario.nombre} actualizado correctamente`, 'success');
      return true;
    }));

  }

  cambiarImagen( file: File , id:string){

    this.subirarchivoservice.subirArchivo(file,'usuarios',id)
    .subscribe((resp:any) =>{
      console.log(resp);
      this.usuario.img = resp.usuario.img;
      this.guardarStorage(id, this.token , this.usuario, this.menu);
      this.sa.swal('Exito', `La imagen se actualizo correctamente`, 'success');
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
      this.sa.swal('Exito', `Usuario Eliminado`, 'success');
      return true;
    }));
  }


}



