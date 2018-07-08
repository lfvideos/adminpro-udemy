import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: []
})
export class GraficodonaComponent implements OnInit {

  @Input() data = [350, 450, 100];
  @Input() leyenda:string = "Leyenda";
  @Input() labels:string[] = ['Lorem1', 'Lorem2', 'Lorem3'];
  @Input() type:string = 'doughnut';

  constructor() { }

  ngOnInit() {
    // console.log(this.leyenda);
    // console.log(this.data);
    // console.log(this.labels);
    // console.log(this.type);
  }

}
