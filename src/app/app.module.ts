import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './forms/register/register.component';
import { CreateQuoteComponent } from './forms/create-quote/create-quote.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import { LoginComponent } from './forms/login/login.component';
import {TokenInterceptor} from "./services/token.interceptor";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {UserService} from "./services/user.service";
import { QuoteListComponent } from './component/quote-list/quote-list.component';
import { UploadTemplateComponent } from './component/upload-template/upload-template.component';
import { TemplateListComponent } from './component/template-list/template-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from './modal/confirm/confirm.component';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CreateQuoteComponent,
    LoginComponent,
    QuoteListComponent,
    UploadTemplateComponent,
    TemplateListComponent,
    ConfirmComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        FormsModule,
        NgbModule,
        MatInputModule,
        MatTableModule,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
