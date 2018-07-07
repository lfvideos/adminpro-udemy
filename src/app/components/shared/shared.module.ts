import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrubsComponent } from './breadcrubs/breadcrubs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrubsComponent,
        NopagefoundComponent,
    ],
    imports: [ CommonModule ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrubsComponent,
        NopagefoundComponent,
    ],
    providers: [],
})
export class SharedModule {}