import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

//PAGES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../../services/service.index';
import { RestindexComponent } from './restindex/restindex.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { PermisosComponent } from './permisos/permisos.component';

const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, 
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent , data:{titulo:"Dashboard"} },
            { path: 'profile', component: ProfileComponent , data:{titulo:"Perfil"} },
            { path: 'progress', component: ProgressComponent , data:{titulo:"Progress"} },
            { path: 'graficas1', component: Graficas1Component  , data:{titulo:"Graficas"} },
            { path: 'promesas', component: PromesasComponent , data:{titulo:"Promesas"} },
            { path: 'rxjs', component: RxjsComponent , data:{titulo:"RxJs"} },
            { path: 'account-settings', component: AccountSettingsComponent , data:{titulo:"Ajustes del Tema"} },
            
            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent , data:{titulo:"Mantenimiento de Usuarios"} },
            { path: 'hospitales', component: HospitalComponent , data:{titulo:"Mantenimiento de Hospitales"} },
            { path: 'medicos', component: MedicosComponent , data:{titulo:"Mantenimiento de Medicos"} },
            { path: 'medico/:id', component: MedicoComponent , data:{titulo:"Actualizar Medico"} },


            //TEST
            { path: 'restindex', component: RestindexComponent , data:{titulo:"REST Index"} },
            { path: 'permisos', component: PermisosComponent , data:{titulo:"Permisos"} },


            //DEFAULT
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
     },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PAGES_ROUTES {}
