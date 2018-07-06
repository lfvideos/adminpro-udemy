import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProgressComponent } from './components/pages/progress/progress.component';
import { Graficas1Component } from './components/pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './components/shared/nopagefound/nopagefound.component';
import { PagesComponent } from './components/pages/pages.component';
import { RegisterComponent } from './components/pages/login/register.component';

const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
     },
    
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class APP_ROUTES {}
