import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbSearchService, NbMenuItem } from '@nebular/theme';

@Component({
	selector: 'ngx-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
	value = '';
	title = 'HttpService';
	data = [];
	url = 'http://localhost:3000/search';

	// items:NbMenuItem[] = [
	//   {
	//     link: "edit",
	//   },
	// ];

	constructor(
		private searchService: NbSearchService,
		private httpClient: HttpClient
	) {
		this.searchService.onSearchSubmit().subscribe((data: any) => {
			this.value = data.term;
			console.log('seacrh button clicked', data.term);
			// send the term to our webserver
			this.httpClient.get(this.url).subscribe((res: []) => {
				this.data = res;
			});
			// receive the results
			// populate the list
		});
	}

	ngOnInit() {}
}
