import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
@Input() text = "";
  constructor(private modal:NgbModal) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.modal.dismissAll();
    },1000);
  }

}
