import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuoteServiceService} from "./services/quote-service.service";
import {Client, Lines, Quote} from "./models/quote";
import {Router} from "@angular/router";
import {User} from "./models/Users";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router:Router,private userService:UserService) {
    this.isLoggedIn = this.userService.getToken();
    this.userService.isLoggedIn.subscribe(
      (data)=>{
        console.log("hee")
        this.isLoggedIn=data;
      }
    )
  }

  ngOnInit() {

  }

  clearSession() {
    this.userService.isLoggedIn.next(false);
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
