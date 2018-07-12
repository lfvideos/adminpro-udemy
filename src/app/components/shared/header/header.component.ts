import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],

})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public usuarioservice: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioservice.usuario;
    
  }

}
