import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosTomadosComponent } from './turnos-tomados.component';

describe('TurnosTomadosComponent', () => {
  let component: TurnosTomadosComponent;
  let fixture: ComponentFixture<TurnosTomadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosTomadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosTomadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
