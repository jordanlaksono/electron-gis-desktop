import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PetaComponent } from './peta/peta.component';
import { JalanComponent } from './jalan/jalan.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'peta',
      pathMatch: 'full',
    },
    {
      path: 'peta',
      component: PetaComponent
    },
    {
      path: 'jalan',
      component: JalanComponent
    },
    {
      path: '**',
      redirectTo: 'peta',
    },
    // {
    //   path: '**',
    //   component: PageNotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
