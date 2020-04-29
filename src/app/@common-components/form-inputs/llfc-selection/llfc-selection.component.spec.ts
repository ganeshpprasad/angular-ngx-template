import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlfcSelectionComponent } from './llfc-selection.component';

describe('LlfcSelectionComponent', () => {
  let component: LlfcSelectionComponent;
  let fixture: ComponentFixture<LlfcSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlfcSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlfcSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
