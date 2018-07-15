import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioservice:UsuarioService){}
  canActivate() {

    if(this.usuarioservice.usuario.role == 'ADMIN_ROLE'){
      return true;
    }
    console.log("Bloqueado por el ADMIN Guard");
    this.usuarioservice.logout();
    return false;
  }

}
