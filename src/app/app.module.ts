import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './/app-routing.module';
import {WelcomeComponent} from './component/welcome/welcome.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './service/authentication.service';
import {AboutComponent} from './component/about/about.component';
import {FirstUserCredentialsComponent} from './component/welcome/first-user-credentials/first-user-credentials.component';
import {FormsModule} from '@angular/forms';
import { LoginFormComponent } from './component/welcome/login-form/login-form.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    AboutComponent,
    FirstUserCredentialsComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
