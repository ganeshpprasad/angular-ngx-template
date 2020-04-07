import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailsTableRouteComponent } from './asset-details-table-route.component';

describe('AssetDetailsTableRouteComponent', () => {
  let component: AssetDetailsTableRouteComponent;
  let fixture: ComponentFixture<AssetDetailsTableRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDetailsTableRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailsTableRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
