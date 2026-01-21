import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaEventoinicioComponent } from './filtros-busqueda-eventoinicio.component';

describe('FiltrosBusquedaEventoinicioComponent', () => {
  let component: FiltrosBusquedaEventoinicioComponent;
  let fixture: ComponentFixture<FiltrosBusquedaEventoinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaEventoinicioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaEventoinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
