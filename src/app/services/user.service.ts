import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/Users";
import {LoginRequest} from "../models/LoginRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  // register user from server observable
  registerUser(user:User) {
    return this.http.post('http://localhost:49160/createUser', user);
  }
  // login user from server observable
  loginUser(user:LoginRequest) {
    return this.http.post('http://localhost:49160/login', user);
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
