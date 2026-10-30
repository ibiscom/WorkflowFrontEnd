import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoActividadRealizadaPorResponsableComponent } from './listado-actividadrealizadaporresponsable.component';

describe('ListadoActividadRealizadaPorResponsableComponent', () => {
  let component: ListadoActividadRealizadaPorResponsableComponent;
  let fixture: ComponentFixture<ListadoActividadRealizadaPorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoActividadRealizadaPorResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoActividadRealizadaPorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

