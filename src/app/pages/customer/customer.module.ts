import { CustomerComponent } from './customer.component';
import { NbCardModule,NbSearchModule,NbLayoutModule,NbListModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
@NgModule({
	imports: [NbCardModule,NbSearchModule,NbLayoutModule,NbListModule],
	
	declarations: [CustomerComponent],
})
export class CustomerModule {}
