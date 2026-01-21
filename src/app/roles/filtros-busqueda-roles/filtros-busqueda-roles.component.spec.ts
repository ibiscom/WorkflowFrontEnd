import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaRolesComponent } from './filtros-busqueda-roles.component';

describe('FiltrosBusquedaRolesComponent', () => {
  let component: FiltrosBusquedaRolesComponent;
  let fixture: ComponentFixture<FiltrosBusquedaRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaRolesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
