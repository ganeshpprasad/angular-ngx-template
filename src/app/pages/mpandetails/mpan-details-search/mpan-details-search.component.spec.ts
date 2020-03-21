import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpanDetailsSearchComponent } from './mpan-details-search.component';

describe('MpanDetailsSearchComponent', () => {
  let component: MpanDetailsSearchComponent;
  let fixture: ComponentFixture<MpanDetailsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpanDetailsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpanDetailsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
