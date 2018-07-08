import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() porcentaje:number = 50;
  @Input('nombre') leyenda: string = 'Leyenda';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef; 


  cambiarValor(valor){

    if(this.porcentaje >= 100 && valor > 0 ){
      this.porcentaje =  100;
      return;
    }
    if(this.porcentaje <= 0 && valor < 0 ){
      this.porcentaje =  0;
      return;
    }

    this.porcentaje = this.porcentaje + valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

  onChange(newValue){

    //let elementHTML:any = document.getElementsByName('progreso')[0];
    

    if(newValue >= 100){
      this.porcentaje = 100;
    }
    else if(newValue <= 0){
      this.porcentaje = 0;
    }
    else{
      this.porcentaje = newValue;
    }

    //elementHTML.value = this.porcentaje;
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }

}
