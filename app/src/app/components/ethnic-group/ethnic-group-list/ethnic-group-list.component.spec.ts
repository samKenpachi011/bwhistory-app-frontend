import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthnicGroupListComponent } from './ethnic-group-list.component';

describe('EthnicGroupListComponent', () => {
  let component: EthnicGroupListComponent;
  let fixture: ComponentFixture<EthnicGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EthnicGroupListComponent]
    });
    fixture = TestBed.createComponent(EthnicGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
