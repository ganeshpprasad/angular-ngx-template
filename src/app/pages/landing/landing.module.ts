import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing.component';
import {
	NbCardModule,
	NbSearchModule,
	NbListModule,
	NbMenuModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
@NgModule({
	imports: [
		NbCardModule,
		NbSearchModule,
		HttpClientModule,
		CommonModule,
		RouterModule,
		NbListModule,
		NbMenuModule,
	],
	declarations: [LandingComponent],
})
export class LandingModule {}
