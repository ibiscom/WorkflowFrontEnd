import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaIndicadorDeTareaComponent } from './filtros-busqueda-indicadordetarea.component';

describe('FiltrosBusquedaIndicadorDeTareaComponent', () => {
  let component: FiltrosBusquedaIndicadorDeTareaComponent;
  let fixture: ComponentFixture<FiltrosBusquedaIndicadorDeTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaIndicadorDeTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaIndicadorDeTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

