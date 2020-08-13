import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrvAccountComponent } from './srv-account.component';

describe('SrvAccountComponent', () => {
  let component: SrvAccountComponent;
  let fixture: ComponentFixture<SrvAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrvAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrvAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
