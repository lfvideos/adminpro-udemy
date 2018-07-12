import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrubsComponent } from './breadcrubs/breadcrubs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { IncrementadorComponent } from './custom/incrementador/incrementador.component';

import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';

import { FormsModule } from '@angular/forms';
import { GraficodonaComponent } from './custom/graficodona/graficodona.component';


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrubsComponent,
        NopagefoundComponent,
        IncrementadorComponent,
        GraficodonaComponent,
    ],
    imports: [ 
        CommonModule,
        FormsModule,
        ChartsModule,
        RouterModule,
        PipesModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrubsComponent,
        NopagefoundComponent,
        IncrementadorComponent,
        GraficodonaComponent,
    ],
    providers: [],
})
export class SharedModule {}