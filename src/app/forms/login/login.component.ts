import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ComponentService} from "../../services/component.service";
import {ModalType} from "../../models/modalType";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(private fb:FormBuilder,private userService:UserService,private router:Router,
              private componentService:ComponentService) { }

  ngOnInit(): void {
    // init form loginForm with password validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {
  this.userService.loginUser(this.loginForm.value).subscribe(
    (res:any) => {
      this.componentService.openModal('Bienvenue '+res.user.firstname,ModalType.Success);
      this.userService.storeUserData(res.token, res.user);
      this.userService.isLoggedIn.next(true);
      this.router.navigate(['/create-quote']);
    },
    err => {
      this.componentService.openModal(err.error,ModalType.Error);
    }
  );
  }
}
