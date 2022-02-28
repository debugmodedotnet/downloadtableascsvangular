import { Component, OnInit } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'downloadcsv';
  products: Product[] = [];
  constructor() {

  }

  ngOnInit(): void {

    this.products = this.getProducts();

  }

  getProducts(): Product[] {
    return [
      {
        Id: "1",
        Title: "Pen",
        inStock: true,
        Price: 300,
        Quantity: 20
      },
      {
        Id: "2",
        Title: "Pencil",
        inStock: false,
        Price: 300,
        Quantity: 200
      },
      {
        Id: "3",
        Title: "Screw Driver",
        inStock: true,
        Price: 200,
        Quantity: 10
      },
      {
        Id: "4",
        Title: "Bat",
        inStock: true,
        Price: 4799,
        Quantity: 200
      }

    ]
  }

  downloadFile(data: any) {
    const replacer = (key:any, value:any) => (value === null ? '' : value);
    const header = Object.keys(data[0]);
    const csv = data.map((row:any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
  
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
