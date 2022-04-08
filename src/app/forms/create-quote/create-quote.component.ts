import { Component, OnInit } from '@angular/core';
import {Lines, Quote} from "../../models/quote";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {QuoteServiceService} from "../../services/quote-service.service";
import * as moment from "moment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmComponent} from "../../modal/confirm/confirm.component";
import {ComponentService} from "../../services/component.service";

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.css']
})
export class CreateQuoteComponent implements OnInit {

  title = 'quoteCreator';
  createQuoteFormGroup: any;
  data: Quote = new Quote();
  lines = new FormArray([]);

  constructor(private formBuilder: FormBuilder, private quoteService: QuoteServiceService,
              private componentService:ComponentService) {
  }

  ngOnInit() {

    // the lines is used with array of lines
    this.createQuoteFormGroup = this.formBuilder.group(
      {
        client: ['', Validators.required],
        adressRoad: ['', Validators.required],
        adressNumber: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        phone: ['', Validators.required],
        lines: this.formBuilder.array(
          this.data.linesArray.map(x => this.formBuilder.group({
            reference: this.formBuilder.control(x.reference),
            description: this.formBuilder.control(x.description),
            unitPrice: this.formBuilder.control(x.unitPrice),
            quantity: this.formBuilder.control(x.quantity),
            total: this.formBuilder.control(x.total),
            promo:this.formBuilder.control(x.promo)
          }))
        )
      }
    )
  }

  validate() {
    const form = this.createQuoteFormGroup.value
    this.data.client.city = form.city;
    this.data.client.adressNumber = form.adressNumber;
    this.data.client.postalCode = form.postalCode;
    this.data.client.adressRoad = form.adressRoad;
    this.data.client.name = form.client;
    this.data.linesArray = form.lines;
    this.data.client.phone = form.phone;
    this.calculateTotal();
    const user = JSON.parse(<string>sessionStorage.getItem('user'));
    this.data.date = moment().format('DD/MM/YYYY');
    this.data.pro = {
      name: user.username,
      address: user.address,
      zipcode: user.zipcode,
      city: user.city,
      email: user.email,
      phone: user.phone
    }
    this.data.userId = user.id;
    this.quoteService.createQuote(this.data).subscribe(
      (data:any) => console.log(data),
      (err) => console.log(err),
      ()=> {
        this.createQuoteFormGroup.reset()
        this.componentService.openModal("Devis créé avec succès")
      }
    )
  }


  calculateTotal() {
    let total = 0;
    let totalPromo = 0;
    this.data.linesArray.forEach(x => {
      x.total = x.unitPrice * x.quantity;
      total += x.total
      totalPromo += x.unitPrice * x.quantity * (x.promo/100);
    })
    total = total - totalPromo;
    this.data.totalHt = total;
    this.data.tva = total * 0.21;
    this.data.totalTtc = total + this.data.tva;
    this.data.totalPromo = totalPromo;
  }
  calculateTotalLine(index:number) {
    const line = this.createQuoteFormGroup.value.lines[index];
    this.createQuoteFormGroup.value.lines[index].total = line.unitPrice * line.quantity;
  }

  addLine() {
    // this const is used to add controle in formGroup dynamically
    const fa = (this.createQuoteFormGroup.get('lines') as FormArray);
    fa.push(this.formBuilder.group({
      reference: ['', Validators.required],
      description: ['', Validators.required],
      unitPrice: ['', Validators.required],
      quantity: ['', Validators.required],
      total: ['', Validators.required],
      promo: ['', Validators.required]
    }));
    let line = new Lines();
    line.total = 0;
    line.quantity = 0;
    line.description = "";
    line.reference = "";
    line.unitPrice = 0;
    line.promo = 0;
    this.data.linesArray.push(line)
  }



  deleteQuoteLine(index:any) {
    this.data.linesArray.splice(index,1);
  }
}
