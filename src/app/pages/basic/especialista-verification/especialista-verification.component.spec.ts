import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaVerificationComponent } from './especialista-verification.component';

describe('EspecialistaVerificationComponent', () => {
  let component: EspecialistaVerificationComponent;
  let fixture: ComponentFixture<EspecialistaVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistaVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistaVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
