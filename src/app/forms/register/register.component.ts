import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {User} from "../../models/Users";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;

  constructor(private fb: FormBuilder, private userService: UserService,private router:Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      password: [''],
      address: [''],
      zipcode: [''],
      city: [''],
      state: [''],
      vatnumber: [''],
    });
  }

  onRegisterSubmit() {
    const user: User = this.registerForm.value;
    this.registerUser(user);
  }

  // register user
  registerUser(user: User) {
    this.userService.registerUser(user).subscribe(
      (res:any) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      err => console.log(err)
    );
  }
}
