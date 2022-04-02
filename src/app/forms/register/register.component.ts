import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
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
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService,private router:Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['',Validators.required],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required],
      password: ['',Validators.required],
      address: ['',Validators.required],
      zipcode: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      vatnumber: ['',Validators.pattern(this.validateVat())],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onRegisterSubmit() {
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    const user: User = this.registerForm.value;
    this.registerUser(user);
  }
  validateVat(){
    return '^((AT)?U[0-9]{8}|(BE)?0[0-9]{9}|(BG)?[0-9]{9,10}|(CY)?[0-9]{8}L|↵\n' +
      '(CZ)?[0-9]{8,10}|(DE)?[0-9]{9}|(DK)?[0-9]{8}|(EE)?[0-9]{9}|↵\n' +
      '(EL|GR)?[0-9]{9}|(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]|(FI)?[0-9]{8}|↵\n' +
      '(FR)?[0-9A-Z]{2}[0-9]{9}|(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|↵\n' +
      '(HU)?[0-9]{8}|(IE)?[0-9]S[0-9]{5}L|(IT)?[0-9]{11}|↵\n' +
      '(LT)?([0-9]{9}|[0-9]{12})|(LU)?[0-9]{8}|(LV)?[0-9]{11}|(MT)?[0-9]{8}|↵\n' +
      '(NL)?[0-9]{9}B[0-9]{2}|(PL)?[0-9]{10}|(PT)?[0-9]{9}|(RO)?[0-9]{2,10}|↵\n' +
      '(SE)?[0-9]{12}|(SI)?[0-9]{8}|(SK)?[0-9]{10})$'
  }

  // register user
  registerUser(user: User) {
    this.userService.registerUser(user).subscribe(
      (res:any) => {
        console.log(res, "res");
        this.router.navigate(['/login']);
      },
      err => {
        if(err.status===201){
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
