import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaLogAuditoriaComponent } from './filtros-busqueda-log-auditoria.component';

describe('FiltrosBusquedaLogAuditoriaComponent', () => {
  let component: FiltrosBusquedaLogAuditoriaComponent;
  let fixture: ComponentFixture<FiltrosBusquedaLogAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaLogAuditoriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaLogAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
