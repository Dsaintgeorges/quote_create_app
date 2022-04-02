import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./forms/register/register.component";
import {CreateQuoteComponent} from "./forms/create-quote/create-quote.component";
import {LoginComponent} from "./forms/login/login.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {QuoteListComponent} from "./component/quote-list/quote-list.component";

let AuthGuard;
const routes: Routes = [
  // route for register component
  {path: 'register', component: RegisterComponent},
  // route for 404
  // route for create-quote component
  {path: 'create-quote', component: CreateQuoteComponent, canActivate: [AuthenticationGuard]},
  {path: 'quote-list',component: QuoteListComponent, canActivate: [AuthenticationGuard]},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
