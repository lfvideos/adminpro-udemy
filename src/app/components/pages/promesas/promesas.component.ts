import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

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

}
