import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { UsuarioService, SweetalertService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;


  constructor( public usuarioService:UsuarioService , public router: Router , public sa:SweetalertService ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required] ),
      email: new FormControl(null, [Validators.required , Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password','password2') }    );

    this.forma.setValue({
      nombre: "Usuario",
      email: "test@correo.com",
      password: "test",
      password2:"test",
      condiciones: true,
    });


  }

  sonIguales(campo1:string, campo2:string){
    return (group:FormGroup)=>{

      let field1 = group.controls[campo1].value;
      let field2 = group.controls[campo2].value;

      if(field1 === field2)
      {
        return null;
      }
      return {
        sonIguales:true  //True significa Error
      };
    }

  }

  registrarUsuario()
  {
    if(this.forma.invalid){
      return;
    }
    if(!this.forma.value.condiciones){
      this.sa.swal("Importante", "Debe de aceptar las condiciones", "warning");
      return;
    }

    let usuario = new Usuario(this.forma.value.nombre, this.forma.value.email, this.forma.value.password);
    this.usuarioService.crearUsuario(usuario).subscribe( (respuesta)=>{
      this.router.navigate(['/login']);
    }, (error)=>{
      this.sa.swal("Error", error.error.mensaje, "error");
      console.log(error);
    });
  }

}
