import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoActividadRealizadaPorTareaComponent } from './listado-actividadrealizadaportarea.component';

describe('ListadoActividadRealizadaPorTareaComponent', () => {
  let component: ListadoActividadRealizadaPorTareaComponent;
  let fixture: ComponentFixture<ListadoActividadRealizadaPorTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoActividadRealizadaPorTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoActividadRealizadaPorTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

