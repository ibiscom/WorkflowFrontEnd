import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaGruposComponent } from './filtros-busqueda-grupos.component';

describe('FiltrosBusquedaGruposComponent', () => {
  let component: FiltrosBusquedaGruposComponent;
  let fixture: ComponentFixture<FiltrosBusquedaGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaGruposComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
