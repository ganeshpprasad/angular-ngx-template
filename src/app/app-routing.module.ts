import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@providers/services/auth-guard.service';

const routes: Routes = [
	{
		path: 'pages',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('app/pages/pages.module').then(m => m.PagesModule),
	},
	{
		path: 'auth',
		loadChildren: './pages/auth/auth.module#NgxAuthModule',
	},
	{ path: '', redirectTo: 'pages', pathMatch: 'full' },
	{ path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
	useHash: false,
};

@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
