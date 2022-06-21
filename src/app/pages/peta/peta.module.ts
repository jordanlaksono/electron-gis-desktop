import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule
} from '@nebular/theme';

import { PetaComponent } from './peta.component';

@NgModule({
  imports: [
    //ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    CommonModule
  ],
  declarations: [
    PetaComponent
  ]
})
export class PetaModule { }
