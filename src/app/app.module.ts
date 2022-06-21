import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


import { DatabaseService } from './services/database.service';
import { initDatabase } from './services/database.service';

import { AsyncNoZonePipe } from './pipes/async-no-zone.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
         NbThemeModule,
         NbLayoutModule,
         NbSidebarModule,
         NbMenuModule,
         NbIconModule,
         NbChatModule,
         NbDatepickerModule,
         NbDialogModule,
         NbToastrModule,
         NbWindowModule,
         NbInputModule,
         NbButtonModule,
         NbCardModule,
        } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
//import { JalanComponent } from './pages/jalan/jalan.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';

@NgModule({
  declarations: [
  AppComponent,
  AsyncNoZonePipe,
  LoginComponent,
  RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbIconModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbInputModule,
    NbButtonModule,
    NbCardModule
  ],
  providers: [
  {
    provide: APP_INITIALIZER,
    useFactory: () => initDatabase,
    multi: true,
    deps: [/* your dependencies */]
  },
  DatabaseService,
    AsyncNoZonePipe
  ],
  exports: [
    AsyncNoZonePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
