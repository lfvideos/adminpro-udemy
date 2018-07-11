import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { UsuarioService } from '../../../services/service.index';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],

})
export class HeaderComponent implements OnInit {

  constructor(public usuarioservice: UsuarioService) { }

  ngOnInit() {
    
    
  }

}
