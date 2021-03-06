import { Component, OnInit } from '@angular/core';
import {TemplateService} from "../../services/template.service";
import * as moment from "moment"

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
templates:any;
  constructor(private templateService:TemplateService) { }

  ngOnInit(): void {
    this.getTemplateList();
  }

  getTemplateList(){
    const user = JSON.parse(<string>sessionStorage.getItem('user'));
    this.templateService.getAllTemplates(user.id).subscribe(
      data=>{
        console.log(data);
        this.templates=data;
      },
      error=>{
        console.log(error);
      }
    )
  }
  downloadTemplate(template:any){
    console.log(template);
    this.templateService.downloadTemplate(template.name).subscribe(
      (response)=>{
        console.log(response);
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(response)
        a.href = objectUrl
        a.download = 'template.odt'
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error=>{
        console.log(error);
      }
    )
  }

  convertDate(date:any) {
    return moment(date).format('DD-MM-YYYY-HH:mm');
  }
  setDefautltTemplate(template:any){
    const user  = JSON.parse(<string>sessionStorage.getItem('user'));
    this.templateService.setDefaultTemplate(template.id,user.id).subscribe(
      data=>{
        console.log(data);
        this.getTemplateList();
      },
      error=>{
        console.log(error);
      }
    )
  }
}
