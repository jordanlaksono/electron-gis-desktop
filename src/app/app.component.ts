import { Component, ViewEncapsulation } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private sidebarService: NbSidebarService
  ) {
    translate.setDefaultLang('en');
    // console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      // console.log(process.env);
      console.log('Mode electron');
      // console.log('Electron ipcRenderer', electronService.ipcRenderer);
      // console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
