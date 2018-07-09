import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 

    this.subscription = this.regresaObservable().pipe(
      retry(9) //  (intentos)
    )
    .subscribe( 
      (contador) => console.log('Subs',contador),
      (error) => console.error('Error en el obs', error),
      () => console.log('El observador termino')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log("RXJS Cerrandose");
  }


  regresaObservable(): Observable<any>{

    let obs = new Observable<any>( observer => {

      let contador = 0;
      let intervalo = setInterval( ()=> {
        contador += 1;

        const salida = {
          valor: contador,
        };

        observer.next(salida);

        // if(contador == 10){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if(contador == 2){
        //   //clearInterval(intervalo);
        //   observer.error('No es realmente un error');
        // }
      },1000);

    }).pipe( 
      map( respuesta => respuesta.valor),
      filter( (valor , index) => {
        if( (valor % 2) == 0){
          return true;
        }
        return false;
      })
    );

    return obs;

  }

}
