import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoActividadPendientePorResponsableComponent } from './listado-actividadpendienteporresponsable.component';

describe('ListadoActividadPendientePorResponsableComponent', () => {
  let component: ListadoActividadPendientePorResponsableComponent;
  let fixture: ComponentFixture<ListadoActividadPendientePorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoActividadPendientePorResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoActividadPendientePorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

