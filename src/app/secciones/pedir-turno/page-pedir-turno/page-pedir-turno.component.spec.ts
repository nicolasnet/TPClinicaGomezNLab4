import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePedirTurnoComponent } from './page-pedir-turno.component';

describe('PagePedirTurnoComponent', () => {
  let component: PagePedirTurnoComponent;
  let fixture: ComponentFixture<PagePedirTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePedirTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePedirTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
