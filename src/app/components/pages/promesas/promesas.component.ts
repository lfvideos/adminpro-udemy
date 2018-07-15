import { Component, OnInit } from '@angular/core';

import { SweetalertService } from '../../../services/service.index';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor(private sa:SweetalertService) {

    this.contarTres().then( (mensaje)=> console.log('termino',mensaje) ).catch( (error) => console.error('Error en la promesa', error));

    //promesa.then( (mensaje)=> console.log('termino',mensaje) ).catch( (error) => console.error('Error en la promesa', error));


   }

  ngOnInit() {
  }

  contarTres():Promise<boolean>{

    let promesa = new Promise<boolean>( (resolve , reject) => {
      let contador = 0;
      let intervalo = setInterval( ()=>{
        contador +=1;
        console.log(contador);
        if(contador == 3){
          resolve(true);
          // resolve();
          //reject('ocurrio un error');
          clearInterval(intervalo);
        }
      }, 1000);
    });

    return promesa;

  }




  testMixin(){

    this.sa.displayMixin('success',"Iniciaste Sesion");

    // const toast = (swal as any).mixin({
    //   toast: true,
    //   position: 'top-end',
    //   showConfirmButton: false,
    //   timer: 3000
    // });

    // toast({
    //   type: 'success',
    //   title: 'Signed in successfully'
    // });
  }
  


}
