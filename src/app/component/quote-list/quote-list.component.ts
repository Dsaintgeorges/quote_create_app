import {Component, OnInit} from '@angular/core';
import {QuoteServiceService} from "../../services/quote-service.service";
import {QuoteList} from "../../models/quoteList";

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  quotes: QuoteList[];

  constructor(private quoteService: QuoteServiceService) {
  }

  ngOnInit(): void {
    this.getQuotes();
  }

  // get list of all pdf quotes
  getQuotes() {
    const user = JSON.parse(<string>sessionStorage.getItem('user'));
    console.log(user);
    this.quoteService.getAllPdf(user.id).subscribe((data) => {
        console.log(data, 'data');
        this.quotes = data;
      },
      (error) => {
        console.log(error);
      });
  }

  download(quote: any) {
    this.quoteService.downloadPdf(quote).subscribe(
      (data) => {
        console.log(data);
        const file = new Blob([data], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      (error) => {
        console.log(error);
      });
  }
}
