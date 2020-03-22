import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCableDetailsFormComponent } from './main-cable-details-form.component';

describe('MainCableDetailsFormComponent', () => {
  let component: MainCableDetailsFormComponent;
  let fixture: ComponentFixture<MainCableDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCableDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCableDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
