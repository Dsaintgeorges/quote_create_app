import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/Users";
import {LoginRequest} from "../models/LoginRequest";
import {environment} from "../../environments/environment.prod";
import {Subject} from "rxjs";

const REGISTER = environment.apiUrl + '/createUser';
const LOGIN = environment.apiUrl + '/login';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = new Subject<boolean>();

  constructor(private http:HttpClient) {
    this.isLoggedIn.next(this.getToken());
  }
  // register user from server observable
  registerUser(user:User) {
    return this.http.post(REGISTER, user);
  }
  // login user from server observable
  loginUser(user:LoginRequest) {
    return this.http.post(LOGIN, user);
  }
  // create method to store user in localStorage and token in sessionStorage
  storeUserData(token:string, user:User) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  getToken():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }else{
      return false;
    }
  }



}
