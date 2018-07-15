import { Injectable } from '@angular/core';
import swal, { SweetAlertType } from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  public swal;
  constructor() {
    this.swal = swal;
   }

  displayMixin( type: string , text: string ){
    const toast = (swal as any).mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })

    toast({
      type: type,
      title: text
    })
  }

  displayAlert(type:string, title:string , text:string){
    swal(title, text, (type as SweetAlertType) );
  }




}
