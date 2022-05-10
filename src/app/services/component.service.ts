import { Injectable } from '@angular/core';
import {ConfirmComponent} from "../modal/confirm/confirm.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalType} from '../models/modalType';
@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private modalService:NgbModal) { }


  openModal(text:string,color:ModalType = ModalType.Success){
    const modal = this.modalService.open(ConfirmComponent, {
        size: 'sm',
        centered: true,
        windowClass: 'modal-rounded',
        animation: true,
      }
    );
    modal.componentInstance.text = text;
    modal.componentInstance.color = color
  }
}
