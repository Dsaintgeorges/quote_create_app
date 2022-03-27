import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuoteServiceService} from "./quote-service.service";
import {Client, Lines, Quote} from "./models/quote";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'quoteCreator';
  createQuoteFormGroup:any;
  data: Quote = new Quote();
  lines = new FormArray([]);

  constructor(private formBuilder: FormBuilder, private quoteService: QuoteServiceService) {
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
        lines: this.formBuilder.array(
          this.data.linesArray.map(x => this.formBuilder.group({
            reference: this.formBuilder.control(x.reference),
            description: this.formBuilder.control(x.description),
            unitPrice: this.formBuilder.control(x.unitPrice),
            quantity: this.formBuilder.control(x.quantity),
            total:this.formBuilder.control(x.total)
          }))
        )
      }
    )
  }

  validate() {
    console.log(this.createQuoteFormGroup.value)
    const form = this.createQuoteFormGroup.value
    this.data.client.city = form.city;
    this.data.client.adressNumber = form.adressNumber;
    this.data.client.postalCode = form.postalCode;
    this.data.client.adressRoad = form.adressRoad;
    this.data.client.name = form.client;
    const lines = new Lines();
    lines.unitPrice = form.unitPrice;
    lines.total = form.total;
    lines.description = form.description;
    lines.quantity = form.quantity;
    lines.reference = form.reference;
    const array = []
    array.push(lines);
    this.data.linesArray = form.lines;
    this.calculateTotal();
    this.quoteService.createQuote(this.data).subscribe(
      (data) => console.log(data)
    )
  }

  calculateTotal() {
    let totalHt = 0;
    let totalTtc = 0;
    let tva = 0.21
    this.data.linesArray.forEach(
      (line) => {
        totalHt += line.unitPrice * line.quantity;
      }
    )
    this.data.totalHt = totalHt;
    this.data.tva = totalHt * tva
    this.data.totalTtc = totalHt + this.data.tva;
  }

  addLine() {
    // this const is used to add controle in formGroup dynamically
    const fa = (this.createQuoteFormGroup.get('lines')as FormArray);
    fa.push(this.formBuilder.group({
      reference: ['',Validators.required],
      description: ['',Validators.required],
      unitPrice: ['',Validators.required],
      quantity:['',Validators.required],
      total:['',Validators.required],
    }));
    let line = new Lines();
    line.total = 0;
    line.quantity = 0;
    line.description = "";
    line.reference = "";
    line.unitPrice = 0;
    this.data.linesArray.push(line)
  }
}
