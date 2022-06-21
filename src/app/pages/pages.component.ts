import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MENU_ITEMS } from './pages-menu';

import { NbSidebarService, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  template: `
  <nb-layout>
    <nb-sidebar state="expand" containerFixed="false">
      <!-- <div style="display: flex;">
        <div (click)="sidebarService.toggle(true, 'right');">
          <nb-icon icon="menu-2-outline"></nb-icon>
        </div>
        <div style="margin-left: 15px;">logo</div>
      </div> -->
      <nb-menu [items]="items"></nb-menu>
      <!-- <a download="filename" target="_blank" href="{{outputPath}}/Export_Output.csv">
        Click here to download image
      </a> -->
      <!-- <nb-menu> Download</nb-menu> -->
    </nb-sidebar>
    <nb-layout-column>
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>
  `,
  styleUrls: ['./pages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent {
  outputPath: string = 'assets/excel/';
  items = MENU_ITEMS;
  constructor(
    private sidebar: NbSidebarService,
    private menu: NbMenuService,
    private router: Router
    ) {
    menu.onItemClick().subscribe((data) => {
      console.log(data)
      if(data.item.title == 'Logo'){
        this.sidebar.toggle(true, 'right')
      }else if(data.item.title == 'Download Excel'){
        // window.open('/assets/excel/Export_Output.csv', '_self');

        // window.location.href = 'assets/excel/Export_Output.csv';
        var save = document.createElement('a');
        save.href = 'assets/excel/Export_Output.csv';
        save.download = 'Export_Output.csv';

        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

      }else if(data.item.title == 'Download SHP'){
        window.location.href = 'assets/shp/shp.zip';
      }else if(data.item.title == 'Logout'){
        this.logout();
      }
    });
  }  


  logout(){
    this.router.navigate(['auth']);
  }

}
