import { LandingComponent } from './landing/landing.component';
import { CustomerComponent } from './customer/customer.component';
import { TariffComponent } from './tariff/tariff.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: 'customer',
				loadChildren: () =>
					import('./customer/customer.module').then(
						m => m.CustomerModule
					),
				//component: CustomerComponent,
			},
			{
				path: 'landing',
				component: LandingComponent,
			},
			{
				path: 'asset-details',
				// loadChildren: () =>
				// import('./asset-details/asset-details.module').then(
				// m => m.AssetDetailsModule
				// ),
				component: AssetDetailsComponent,
			},
			{
				path: 'tariffs',
				// loadChildren: () =>
				// import('./maincabledetails/maincabledetails.module').then(
				// m => m.MainCableDetailsModule
				// ),
				component: TariffComponent,
			},
			{
				path: '',
				redirectTo: 'landing',
				pathMatch: 'full',
			},
			{
				path: '**',
				// component: NotFoundComponent,
				component: LandingComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
