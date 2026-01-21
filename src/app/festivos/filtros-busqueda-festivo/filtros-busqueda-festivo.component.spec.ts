import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaFestivoComponent } from './filtros-busqueda-festivo.component';

describe('FiltrosBusquedaFestivoComponent', () => {
  let component: FiltrosBusquedaFestivoComponent;
  let fixture: ComponentFixture<FiltrosBusquedaFestivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaFestivoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaFestivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
