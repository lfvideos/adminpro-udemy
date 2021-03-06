import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//MODULES
import { PagesModule } from './components/pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//ROUTES
import { APP_ROUTES } from './app.routes';

//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/login/register.component';


//SERVICES
import { ServiceModule } from './services/service.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
