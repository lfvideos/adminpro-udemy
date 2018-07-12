import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';
    if(!img){
      return url + '/usuarios/noImage'
    }
    if(img.indexOf('https')>=0){
      return img;
    }

    switch( tipo ){
      case 'usuario':
        return url + '/usuarios/'+ img;
      case 'medico':
        return url + '/usuarios/'+ img;
      case 'hospital':
        return url + '/usuarios/'+ img;

      default:
        return url + '/usuarios/noImage'
    }
  }

}
