import { LandingComponent } from './landing.component';
import { NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
@NgModule({
	imports: [NbCardModule],
	declarations: [LandingComponent],
})
export class LandingModule {}
