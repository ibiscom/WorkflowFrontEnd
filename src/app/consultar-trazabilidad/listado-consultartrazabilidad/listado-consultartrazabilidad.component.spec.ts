import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoConsultarTrazabilidadComponent } from './listado-consultartrazabilidad.component';

describe('ListadoConsultarTrazabilidadComponent', () => {
  let component: ListadoConsultarTrazabilidadComponent;
  let fixture: ComponentFixture<ListadoConsultarTrazabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoConsultarTrazabilidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoConsultarTrazabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

