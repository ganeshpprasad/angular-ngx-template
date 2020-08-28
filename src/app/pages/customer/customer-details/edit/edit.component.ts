import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-customer-details',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor() {}

  items: NbMenuItem[] = [
    {
      title: '',
      icon: 'close-outline',
      link: '/',
    },
  ];
  ngOnInit() {}
}
