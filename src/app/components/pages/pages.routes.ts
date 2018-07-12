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
            { path: 'restindex', component: RestindexComponent , data:{titulo:"REST Index"} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
     },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PAGES_ROUTES {}
