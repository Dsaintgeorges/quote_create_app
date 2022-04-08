import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

const UPLOAD_URL = environment.apiUrl + '/upload-template';
const DOWNLOAD_URL = environment.apiUrl + '/download-template';
const GET_TEMPLATES = environment.apiUrl + '/get-templates';
const SET_DEFAULT = environment.apiUrl + '/set-default-template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) {
  }

  uploadTemplate(template: File, userId: string,name:string) {
    const formData = new FormData();
    formData.append('file', template);
    formData.append('userId', userId);
    formData.append('name',name);
    return this.http.post(UPLOAD_URL, formData);
  }

  getAllTemplates(userId:any) {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.http.get(GET_TEMPLATES, {params});
  }

  downloadTemplate(templateName:string){
    let params = new HttpParams();
    params = params.append('filename', templateName);
    return this.http.get(DOWNLOAD_URL, {params,responseType: 'blob'});
  }
  setDefaultTemplate(templateId:string,userId:string){
    let params = new HttpParams();
    params = params.append('templateId', templateId);
    params = params.append('userId', userId);
    return this.http.post(SET_DEFAULT, null,{params});
  }

}
