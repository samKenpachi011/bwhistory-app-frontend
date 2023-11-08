import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthnicGroupDetailComponent } from './ethnic-group-detail.component';

describe('EthnicGroupDetailComponent', () => {
  let component: EthnicGroupDetailComponent;
  let fixture: ComponentFixture<EthnicGroupDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EthnicGroupDetailComponent]
    });
    fixture = TestBed.createComponent(EthnicGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
