import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { LoginComponent } from './components/pages/login/login.component';
import { NopagefoundComponent } from './components/shared/nopagefound/nopagefound.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ProgressComponent } from './components/pages/progress/progress.component';
import { Graficas1Component } from './components/pages/graficas1/graficas1.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { BreadcrubsComponent } from './components/shared/breadcrubs/breadcrubs.component';
import { APP_ROUTES } from './app.routes';
import { PagesComponent } from './components/pages/pages.component';
import { RegisterComponent } from './components/pages/login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrubsComponent,
    PagesComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
