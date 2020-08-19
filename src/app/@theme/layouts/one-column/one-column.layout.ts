import { Component } from '@angular/core';

@Component({
	selector: 'ngx-one-column-layout',
	styleUrls: ['./one-column.layout.scss'],
	template: `
		<nb-layout windowMode>
			<nb-layout-header fixed>
				<ngx-header></ngx-header>
			</nb-layout-header>

			<nb-sidebar
				[compactedBreakpoints]="[
					'xs',
					'is',
					'sm',
					'md',
					'lg',
					'xl',
					'xxl'
				]"
				class="menu-sidebar"
				tag="menu-sidebar"
				responsive
			>
				<ng-content select="nb-menu"></ng-content>
			</nb-sidebar>

			<nb-layout-column class="small-top-padding">
				<ng-content select="router-outlet"></ng-content>
			</nb-layout-column>

			<nb-layout-footer fixed>
				<ngx-footer></ngx-footer>
			</nb-layout-footer>
		</nb-layout>
	`,
})
export class OneColumnLayoutComponent {}
