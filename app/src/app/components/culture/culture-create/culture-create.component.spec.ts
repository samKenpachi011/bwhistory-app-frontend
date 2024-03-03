import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultureCreateComponent } from './culture-create.component';

describe('CultureCreateComponent', () => {
  let component: CultureCreateComponent;
  let fixture: ComponentFixture<CultureCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CultureCreateComponent]
    });
    fixture = TestBed.createComponent(CultureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
