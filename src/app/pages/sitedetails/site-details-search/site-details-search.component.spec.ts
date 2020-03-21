import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDetailsSearchComponent } from './site-details-search.component';

describe('SiteDetailsSearchComponent', () => {
  let component: SiteDetailsSearchComponent;
  let fixture: ComponentFixture<SiteDetailsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDetailsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDetailsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
