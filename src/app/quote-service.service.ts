import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuoteServiceService {

  constructor(private http:HttpClient) { }

  createQuote(jsonBody:any):Observable<any>{
    return this.http.post("http://localhost:8080/createQuote",jsonBody)
}
}
