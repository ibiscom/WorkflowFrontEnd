import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaGrupoComponent } from './filtros-busqueda-grupo.component';

describe('FiltrosBusquedaGrupoComponent', () => {
  let component: FiltrosBusquedaGrupoComponent;
  let fixture: ComponentFixture<FiltrosBusquedaGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaGrupoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

