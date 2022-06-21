import { NgModule } from '@angular/core';
import { NbMenuModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbSidebarModule,
  NbLayoutModule,

} from '@nebular/theme';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { PetaModule } from './peta/peta.module';
import { JalanModule } from './jalan/jalan.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbMenuModule,
    PetaModule,
    JalanModule
  ],
  declarations: [
    PagesComponent
  ],
})
export class PagesModule {
}
