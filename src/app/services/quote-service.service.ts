import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

const CREATE_QUOTE_URL = environment.apiUrl + '/createQuote';
const RESULT = environment.apiUrl + '/get-file';
const ALL_PDF = environment.apiUrl + '/get-all-pdf';

@Injectable({
  providedIn: 'root'
})
export class QuoteServiceService {

  constructor(private http: HttpClient) {
  }

  createQuote(jsonBody: any): Observable<any> {
    return this.http.post(CREATE_QUOTE_URL, jsonBody)
  }

// download pdf file from server
  downloadPdf(quote: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("filename", quote);
    return this.http.get(RESULT, {params,responseType: 'blob'})
  }

  getAllPdf(userId: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get(ALL_PDF, {params})
  }

}
