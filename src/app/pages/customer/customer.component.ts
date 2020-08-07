import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  fruits:any[] = ['mango','apple','orange'];
  constructor() { }

  ngOnInit() {
  }

}
