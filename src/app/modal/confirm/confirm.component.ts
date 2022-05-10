import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalType} from "../../models/modalType";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
@Input() text = "";
@Input() color:ModalType = ModalType.Success;
modalType = ModalType;
  constructor(private modal:NgbModal) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.modal.dismissAll();
    },1000);
  }

}
