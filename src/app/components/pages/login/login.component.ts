import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';
import { NgZone } from '@angular/core';


declare function init_plugins();
declare const gapi:any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email:string;

  auth2:any; // The Sign-In object.


  constructor(private router:Router , public usuarioService:UsuarioService, private zone: NgZone) {}

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || "";
    if(this.email.length > 1){
      this.recuerdame = true;
    }
    this.googleInit();
  }


  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: "998289039970-fmbelvo0g07rifc5udf0b62qsnj3d31e.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email",
      });
      this.attachSignIn(document.getElementById("btnGoogle"));
    });
  }

  attachSignIn(element){

    this.auth2.attachClickHandler(element , {} , (googleUser) =>{
      //let profile = googleUser.getBasicProfile();
      //console.log(profile);
      let token = googleUser.getAuthResponse().id_token;

      this.zone.run( () => {
        this.usuarioService.loginGoogle(token).subscribe((resp)=>{
          this.router.navigate(['/dashboard']);
          //window.location.href = "/dashboard";
        });
      });
      //console.log(token);
    });

  }



  ingresar( forma : NgForm){
    
    if(forma.invalid){
      return;
    }
    let usuario = new Usuario(null,forma.value.email, forma.value.password);

    this.usuarioService.login(usuario,forma.value.recuerdame).subscribe((respuesta)=>{
      //console.log(respuesta);
      this.router.navigate(['/dashboard']);
    });
    //console.log(forma.valid);
    //console.log(forma.value);
    //this.router.navigate(['/dashboard']);
  }

}
