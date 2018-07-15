import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService, SweetalertService } from '../../../services/service.index';
import { ModalUploadService } from '../../shared/custom/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;

  constructor( public usuariosservice:UsuarioService , public modaluploadservice:ModalUploadService , public sa:SweetalertService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modaluploadservice.notificacion.subscribe( resp=>{
      this.cargarUsuarios();
    });
  }

  cargarUsuarios(){

    this.cargando = true;
    this.usuariosservice.cargarUsuarios(this.desde).subscribe((resp:any) => {
      //console.log(resp);
      this.usuarios = resp.usuarios;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });

  }

  cambiarDesde(valor:number){
    let desde = this.desde + valor;
    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino:string){

    if(termino.length <= 2)
    {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuariosservice.buscarUsuarios(termino).subscribe((resp:any)=>{
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });

  }

  borrarUsuario(usuario:Usuario){
    if(usuario._id === this.usuariosservice.usuario._id){
      this.sa.swal("no se puede borrar el usuario", "No se puede borrar a si mismo", "error");
      return;
    }

    this.sa.swal({
      title: "Estas seguro?",
      text: "Estas apunto de borrar a " + usuario.nombre,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    })
    .then((borrar) => {
      if (borrar) {
        this.usuariosservice.borrarUsuario(usuario._id).subscribe( (borrado:boolean)=>{
          this.desde = 0;
          this.cargarUsuarios();
        });
      } 
    });


  }

  guardarUsuario(usuario:Usuario){
    this.usuariosservice.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id:string){
    //console.log(id);
    this.modaluploadservice.mostrarModal('usuarios',id);
  }


}
