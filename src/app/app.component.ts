import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuoteServiceService} from "./services/quote-service.service";
import {Client, Lines, Quote} from "./models/quote";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router) {
  }

  ngOnInit() {
  }

  clearSession() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
