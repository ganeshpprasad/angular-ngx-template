import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCableDetailsSearchComponent } from './main-cable-details-search.component';

describe('MainCableDetailsSearchComponent', () => {
  let component: MainCableDetailsSearchComponent;
  let fixture: ComponentFixture<MainCableDetailsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCableDetailsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCableDetailsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
