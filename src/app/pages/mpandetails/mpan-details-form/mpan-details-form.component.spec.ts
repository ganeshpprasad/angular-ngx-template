import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpanDetailsFormComponent } from './mpan-details-form.component';

describe('MpanDetailsFormComponent', () => {
  let component: MpanDetailsFormComponent;
  let fixture: ComponentFixture<MpanDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpanDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpanDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
