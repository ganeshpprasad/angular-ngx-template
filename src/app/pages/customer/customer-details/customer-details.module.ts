import { RouterModule } from '@angular/router';
import { CustomerDetailRoutingModule } from './customer-details-routing.module';
import { EditComponent } from './edit/edit.component';
import { CustomerDetailsComponent } from './customer-details.component';

import { NbMenuModule } from '@nebular/theme';
import {
	NbCardModule,
	NbSearchModule,
	NbLayoutModule,
	NbButtonModule,
	NbIconModule,
	NbListModule,
	NbUserModule,
} from '@nebular/theme';

import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
	imports: [
		NbCardModule,
		NbSearchModule,
		NbLayoutModule,
		NbButtonModule,
		NbIconModule,
		NbListModule,
		NbUserModule,
		Ng2SmartTableModule,
		NbMenuModule,
		CustomerDetailRoutingModule,

		RouterModule,
	],

	declarations: [CustomerDetailsComponent, EditComponent],
})
export class CustomerDetailModule {}
