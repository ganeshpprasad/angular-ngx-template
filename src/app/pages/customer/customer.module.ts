import { CustomerSearchModule } from './customer-search/customer-search.module';
import { CustomerDetailModule } from './customer-details/customer-details.module';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { RouterModule } from '@angular/router';

import { NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
@NgModule({
	imports: [
		NbCardModule,
		CustomerRoutingModule,
		CustomerDetailModule,
		CustomerSearchModule,
	],
	declarations: [CustomerComponent],
})
export class CustomerModule {}
