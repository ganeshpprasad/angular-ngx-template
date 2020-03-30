import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailsSearchComponent } from './asset-details-search.component';

describe('AssetDetailsSearchComponent', () => {
  let component: AssetDetailsSearchComponent;
  let fixture: ComponentFixture<AssetDetailsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDetailsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
