import { EditComponent } from './edit/edit.component';
import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'ngx-customer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './customer-details.component.html',
	styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
	fruit: String = 'mango';
	settings = {
		actions: false,

		hideHeader: false,

		columns: {
			id: {
				title: 'ID',
				filter: false,
			},
			name: {
				title: 'Full Name',
				filter: false,
			},
			username: {
				title: 'User Name',
				filter: false,
			},
			email: {
				title: 'Email',
				filter: false,
			},
		},
	};

	data = [
		{
			id: 1,
			name: 'Leanne Graham',
			username: 'Bret',
			email: 'Sincere@april.biz',
		},
		{
			id: 2,
			name: 'Ervin Howell',
			username: 'Antonette',
			email: 'Shanna@melissa.tv',
		},
		{
			id: 3,
			name: 'Nicholas DuBuque',
			username: 'Nicholas.Stanton',
			email: 'Rey.Padberg@rosamond.biz',
		},
	];

	items: NbMenuItem[] = [
		{
			title: 'Edit',
			icon: 'edit-outline',
			link: 'edit',
		},
	];
	constructor() {}

	ngOnInit() {}
}
