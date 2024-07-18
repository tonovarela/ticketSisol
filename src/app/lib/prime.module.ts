import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';

@NgModule({
    declarations: [],    
    providers: [],
    exports: [ButtonModule,TableModule,SplitButtonModule,DropdownModule,DialogModule,ImageModule]
})

export class PrimeModule {
}