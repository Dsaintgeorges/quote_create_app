import { Component, OnInit } from '@angular/core';
import {Lines, Quote} from "../../models/quote";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {QuoteServiceService} from "../../services/quote-service.service";

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
            total: this.formBuilder.control(x.total)
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
    this.data.linesArray = form.lines;
    this.calculateTotal();
    this.quoteService.createQuote(this.data).subscribe(
      (data:any) => console.log(data)
    )
  }

  calculateTotal() {
    let total = 0;
    this.data.linesArray.forEach(x => {
      total += x.total
    })
    this.data.totalHt = total;
    this.data.tva = total * 0.21;
    this.data.totalTtc = total + this.data.tva;
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
    }));
    let line = new Lines();
    line.total = 0;
    line.quantity = 0;
    line.description = "";
    line.reference = "";
    line.unitPrice = 0;
    this.data.linesArray.push(line)
  }

  // function to download a pdf file from blob
  downloadPdf() {
    this.quoteService.downloadPdf().subscribe(
      (data:any) => {
        const file = new Blob([data], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    )
  }

}
