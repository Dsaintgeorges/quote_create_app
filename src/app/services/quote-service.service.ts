import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const CREATE_QUOTE_URL = environment.apiUrl+'/createQuote';
const RESULT = environment.apiUrl+'/result';
@Injectable({
  providedIn: 'root'
})
export class QuoteServiceService {

  constructor(private http:HttpClient) { }

  createQuote(jsonBody:any):Observable<any>{
    return this.http.post(CREATE_QUOTE_URL,jsonBody)
}

// download pdf file from server
downloadPdf():Observable<any>{
  return this.http.get(RESULT,{responseType:'blob'})
}

}
