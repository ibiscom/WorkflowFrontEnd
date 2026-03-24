import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaPatronComponent } from './filtros-busqueda-patron.component';

describe('FiltrosBusquedaPatronComponent', () => {
  let component: FiltrosBusquedaPatronComponent;
  let fixture: ComponentFixture<FiltrosBusquedaPatronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaPatronComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaPatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

