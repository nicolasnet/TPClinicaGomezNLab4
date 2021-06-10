import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTurnosEspecialistasComponent } from './mis-turnos-especialistas.component';

describe('MisTurnosEspecialistasComponent', () => {
  let component: MisTurnosEspecialistasComponent;
  let fixture: ComponentFixture<MisTurnosEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisTurnosEspecialistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTurnosEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
