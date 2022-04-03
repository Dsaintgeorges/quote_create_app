import { Component, OnInit } from '@angular/core';
import {TemplateService} from "../../services/template.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css']
})
export class UploadTemplateComponent implements OnInit {
  error = false;
  uploadForm;
  file:any;
  constructor(private templateService:TemplateService,private fb:FormBuilder) {
    this.uploadForm = fb.group({
      'file':[null],
      'name':['',Validators.required]
    })
  }

  ngOnInit(): void {
  }
  changeFile(event:any){
    if(event.target.files[0].type !== 'application/vnd.oasis.opendocument.text'){
      alert('Le template doit imperativement etre au format .odt');
      this.error = true;
      return;
    }else{
      this.error = false;
    }
    this.file = event.target.files[0];
  }
  uploadTemplate() {
    console.log(this.file)
    let file = this.file;
    console.log(this.uploadForm.value.name)
    const user = JSON.parse(<string>sessionStorage.getItem('user'));
   this.templateService.uploadTemplate(file,user.id,this.uploadForm.value.name).subscribe(
     data => {
       console.log(data);
     },
     error => {
       console.log(error);
     }
   );
  }
}
