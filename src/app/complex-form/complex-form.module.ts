import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../shared/material.module";
import { ComplexFormComponent } from './components/complex-form/complex-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ComplexFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class ComplexFormModule { }
