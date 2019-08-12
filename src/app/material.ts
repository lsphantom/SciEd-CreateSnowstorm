import {MatButtonModule, MatExpansionModule, MatFormFieldModule} from '@angular/material'; 
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatExpansionModule, MatFormFieldModule],
    exports: [MatButtonModule, MatExpansionModule, MatFormFieldModule],
})
export class MaterialModule { }