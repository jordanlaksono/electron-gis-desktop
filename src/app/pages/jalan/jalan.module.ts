import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalanComponent } from './jalan.component';

import { NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [
  	NbCardModule,
  	CommonModule
  ],
  declarations: [
    JalanComponent,
  ],
})
export class JalanModule { }
