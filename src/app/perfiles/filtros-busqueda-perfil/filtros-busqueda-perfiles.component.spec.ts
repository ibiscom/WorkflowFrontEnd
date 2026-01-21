import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaPerfilesComponent } from './filtros-busqueda-perfiles.component';

describe('FiltrosBusquedaPerfilesComponent', () => {
  let component: FiltrosBusquedaPerfilesComponent;
  let fixture: ComponentFixture<FiltrosBusquedaPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaPerfilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
