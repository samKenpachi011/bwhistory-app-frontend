import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultureDetailComponent } from './culture-detail.component';

describe('CultureDetailComponent', () => {
  let component: CultureDetailComponent;
  let fixture: ComponentFixture<CultureDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CultureDetailComponent]
    });
    fixture = TestBed.createComponent(CultureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
