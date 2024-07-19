import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [],    
    providers: [],
    exports: [ButtonModule,TableModule,SplitButtonModule,DropdownModule,DialogModule,ImageModule,InputTextModule,InputTextareaModule,CheckboxModule,ToastModule]
})

export class PrimeModule {
}