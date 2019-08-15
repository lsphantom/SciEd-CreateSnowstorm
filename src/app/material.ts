import {MatButtonModule, MatExpansionModule, MatFormFieldModule, MatSnackBarModule} from '@angular/material'; 
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatExpansionModule, MatFormFieldModule, MatSnackBarModule],
    exports: [MatButtonModule, MatExpansionModule, MatFormFieldModule, MatSnackBarModule],
})


export class MaterialModule { }