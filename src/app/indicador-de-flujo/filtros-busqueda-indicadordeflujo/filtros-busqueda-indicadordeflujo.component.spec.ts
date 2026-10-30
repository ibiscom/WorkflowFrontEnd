import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaIndicadorDeFlujoComponent } from './filtros-busqueda-indicadordeflujo.component';

describe('FiltrosBusquedaIndicadorDeFlujoComponent', () => {
  let component: FiltrosBusquedaIndicadorDeFlujoComponent;
  let fixture: ComponentFixture<FiltrosBusquedaIndicadorDeFlujoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaIndicadorDeFlujoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaIndicadorDeFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

