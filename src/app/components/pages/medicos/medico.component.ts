import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService, HospitalService } from '../../../services/service.index';
import { Medico } from '../../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../shared/custom/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico:Medico = new Medico('','','','','');
  hospital:Hospital = new Hospital('');
  
  constructor(public medicoService:MedicoService, public hospitalservice:HospitalService , private router: Router, private activatedRoute: ActivatedRoute, private modalupload:ModalUploadService) { }

  ngOnInit() {
    this.hospitalservice.cargarHospitales().subscribe(resp=>{
      this.hospitales = resp.hospitales;
      //console.log(resp);
    });

    this.activatedRoute.params.subscribe(params =>{
      let id = params['id'];
      if(id != "nuevo"){
        this.cargarMedico(id);
      }
    });

    this.modalupload.notificacion.subscribe( resp => {
      //console.log(resp);
      this.medico.img = resp.medico.img;
    });
  }


  cargarMedico(id:string){
    this.medicoService.obtenerMedico(id).subscribe(resp=>{ 
      this.medico = resp;
      this.medico.hospital = resp.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });

  }

  guardarMedico(form:NgForm){
    if(form.invalid){
      return;
    }

    if(this.medico._id){
      this.medicoService.actualizarMedico(this.medico).subscribe( resp =>{
        this.router.navigate(['/medicos']);
      });
    }
    else{
      this.medicoService.crearMedico(this.medico).subscribe( resp =>{
        console.log(resp);
        this.medico._id = resp.medico._id;
        this.router.navigate(['/medico', resp.medico._id]);
      });
    }
    
    
  }

  cambioHospital(id:string){
    //console.log(event);
    this.hospitalservice.obtenerHospital(id).subscribe(hospital=>{
      //console.log(hospital);
      this.hospital = hospital;
    })

  }

  cambiarFoto(){
    this.modalupload.mostrarModal('medicos', this.medico._id);
  }

}
