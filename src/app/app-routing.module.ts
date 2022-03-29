import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./forms/register/register.component";
import {CreateQuoteComponent} from "./forms/create-quote/create-quote.component";

const routes: Routes = [
  // route for register component
  {path: 'register', component: RegisterComponent},
  // route for 404
  // route for create-quote component
  {path: 'create-quote', component: CreateQuoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
