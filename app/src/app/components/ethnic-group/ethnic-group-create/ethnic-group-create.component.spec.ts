import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthnicGroupCreateComponent } from './ethnic-group-create.component';

describe('EthnicGroupCreateComponent', () => {
  let component: EthnicGroupCreateComponent;
  let fixture: ComponentFixture<EthnicGroupCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EthnicGroupCreateComponent]
    });
    fixture = TestBed.createComponent(EthnicGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
