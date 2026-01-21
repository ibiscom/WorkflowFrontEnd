import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaResponsableComponent } from './filtros-busqueda-responsable.component';

describe('FiltrosBusquedaResponsableComponent', () => {
  let component: FiltrosBusquedaResponsableComponent;
  let fixture: ComponentFixture<FiltrosBusquedaResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
