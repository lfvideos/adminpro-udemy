import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string;

  constructor( private subirarchivoservice: SubirArchivoService , public modaluploadservice:ModalUploadService) { }

  ngOnInit() {
  }


  seleccionImagen(archivo: File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0)
    {
      swal('Error!', `El archivo seleccionado no es una imagen`, 'error' );
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend =  ()=>{
      this.imagenTemp = reader.result;
    }

  }

  subirImagen(){
    this.subirarchivoservice.subirArchivo(this.imagenSubir, this.modaluploadservice.tipo, this.modaluploadservice.id).subscribe(resp=>{
      console.log(resp);
      this.modaluploadservice.notificacion.emit(resp);
      this.cerrarModal();
    });
  }

  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemp = null;
    this.modaluploadservice.ocultarModal();

  }

}
