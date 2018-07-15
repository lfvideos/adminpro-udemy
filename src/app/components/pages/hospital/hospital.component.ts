import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService, SweetalertService } from '../../../services/service.index';
import { ModalUploadService } from '../../shared/custom/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {


  hospitales:Hospital[] = [];
  totalRegistros:number = 0;
  cargando:boolean = true;
  desde:number = 0;


  constructor(public hospitalservice: HospitalService, public modaluploadservice: ModalUploadService, public sa:SweetalertService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modaluploadservice.notificacion.subscribe( resp=>{
      this.cargarHospitales();
    });
  }


  cargarHospitales(){

    this.cargando = true;
    this.hospitalservice.cargarHospitales(this.desde).subscribe((resp:any) => {
      //console.log(resp);
      this.hospitales = resp.hospitales;
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
    this.cargarHospitales();

  }

  buscarHospital(termino:string){

    if(termino.length == 0)
    {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this.hospitalservice.buscarHospital(termino).subscribe((resp:any)=>{
      //console.log(resp);
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });

  }

  borrarHospital(hospital:Hospital){
    this.sa.swal({
      title: "Estas seguro?",
      text: "Estas apunto de borrar el " + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then((resultado) => {
      if(resultado.value){
        this.hospitalservice.borrarHospital(hospital._id).subscribe( (borrado:boolean)=>{
          this.cargarHospitales();
        });
      }
    });
  }

  async crearHospital(){
    const {value: name} = await this.sa.swal({
      title: 'Nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre para el Hospital',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Crear",
      reverseButtons: true,
      inputValidator: (value) => {
        return !value && 'Ponle un nombre al hospital'
      }
    });
    if (name) {
      this.hospitalservice.crearHospital(name).subscribe(resp=>{
      });
    }
  }


  guardarHospital(hospital:Hospital){
    console.log(hospital);
    if(hospital.nombre == "" || hospital.nombre == undefined){
      return;
    }
    this.hospitalservice.actualizarHospital(hospital).subscribe();
  }

  mostrarModal(id:string){
    //console.log(id);
    this.modaluploadservice.mostrarModal('hospitales',id);
  }


}
