import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any = [];
  // menu:any = [
  //   {
  //     titulo:'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Dashboard', url: '/dashboard'},
  //       {titulo: 'ProgressBar', url: '/progress'},
  //       {titulo: 'Graficas', url: '/graficas1'},
  //       {titulo: 'Promesas', url: '/promesas'},
  //       {titulo: 'RxJS', url: '/rxjs'},
        
  //     ],
      
  //   },
  //   {
  //     titulo:'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: '/usuarios'},
  //       {titulo: 'Hospitales', url: '/hospitales'},
  //       {titulo: 'Medicos', url: '/medicos'},
  //     ],
      
  //   },
  //   {
  //     titulo:'Custom',
  //     icono: 'mdi mdi-anchor',
  //     submenu: [
  //       {titulo: 'REST Index', url: '/restindex'},
  //       {titulo: 'Permisos', url: '/permisos'},
        
  //     ],
      
  //   }
  // ];


  constructor( private usuarioservice:UsuarioService) {
    
    this.cargarMenu();
   }

   cargarMenu(){
    this.menu = this.usuarioservice.menu;
   }

}
