import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  // register user from server observable
  registerUser(user:User) {
    return this.http.post('http://localhost:8080/createUser', user);
  }



}
