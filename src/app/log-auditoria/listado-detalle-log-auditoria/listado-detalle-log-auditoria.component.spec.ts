import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDetalleLogAuditoriaComponent } from './listado-detalle-log-auditoria.component';

describe('ListadoDetalleLogAuditoriaComponent', () => {
  let component: ListadoDetalleLogAuditoriaComponent;
  let fixture: ComponentFixture<ListadoDetalleLogAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDetalleLogAuditoriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoDetalleLogAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
