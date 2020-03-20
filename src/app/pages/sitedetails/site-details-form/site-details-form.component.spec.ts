import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDetailsFormComponent } from './site-details-form.component';

describe('SiteDetailsFormComponent', () => {
  let component: SiteDetailsFormComponent;
  let fixture: ComponentFixture<SiteDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
