import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpanDetailsTableRouteComponent } from './mpan-details-table-route.component';

describe('MpanDetailsTableRouteComponent', () => {
  let component: MpanDetailsTableRouteComponent;
  let fixture: ComponentFixture<MpanDetailsTableRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpanDetailsTableRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpanDetailsTableRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
