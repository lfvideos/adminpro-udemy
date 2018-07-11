import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  

  constructor( public router:Router) { }

  ngOnInit() {
    init_plugins();
  }

}
