import { CustomerComponent } from './customer.component';
import { NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
@NgModule({
	imports: [NbCardModule],
	declarations: [CustomerComponent],
})
export class CustomerModule {}
