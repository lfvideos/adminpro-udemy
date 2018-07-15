import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService, SweetalertService } from '../../../services/service.index';
import { ModalUploadService } from '../../shared/custom/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos:Medico[] = [];
  totalRegistros:number = 0;
  cargando:boolean = true;
  desde:number = 0;

  constructor(public medicoService: MedicoService, public modaluploadservice: ModalUploadService, public sa:SweetalertService) { }

  ngOnInit() {
    this.cargarMedicos();
    this.modaluploadservice.notificacion.subscribe( resp=>{
      this.cargarMedicos();
    });
  }

  cargarMedicos(){

    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde).subscribe((resp:any) => {
      //console.log(resp);
      this.medicos = resp.medicos;
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
    this.cargarMedicos();

  }

  buscarMedico(termino:string){

    if(termino.length == 0)
    {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this.medicoService.buscarMedico(termino).subscribe((resp:any)=>{
      //console.log(resp);
      this.medicos = resp.medicos;
      this.cargando = false;
    });

  }

  borrarMedico(medico:Medico){
    this.sa.swal({
      title: "Estas seguro?",
      text: "Estas apunto de borrar a " + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then((resultado) => {
      if(resultado.value){
        this.medicoService.borrarMedico(medico._id).subscribe( (borrado:boolean)=>{
          this.cargarMedicos();
        });
      }
    });
  }


  // async crearMedico(){
  //   const {value: name} = await this.sa.swal({
  //     title: 'Nuevo Medico',
  //     input: 'text',
  //     inputPlaceholder: 'Nombre para el Medico',
  //     showCancelButton: true,
  //     cancelButtonText: "Cancelar",
  //     confirmButtonText: "Crear",
  //     reverseButtons: true,
  //     inputValidator: (value) => {
  //       return !value && 'Ponle un nombre al medico'
  //     }
  //   });
  //   if (name) {
  //     this.medicoService.crearMedico(name).subscribe(resp=>{
  //     });
  //   }
  // }

  // guardarMedico(medico:Medico){
  //   console.log(medico);
  //   if(medico.nombre == "" || medico.nombre == undefined){
  //     return;
  //   }
  //   this.medicoService.actualizarMedico(medico).subscribe();
  // }

  mostrarModal(id:string){
    //console.log(id);
    this.modaluploadservice.mostrarModal('medicos',id);
  }

}
