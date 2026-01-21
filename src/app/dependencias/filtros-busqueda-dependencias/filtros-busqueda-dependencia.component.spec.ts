import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltrosBusquedaDependenciaComponent } from './filtros-busqueda-dependencia.component';

describe('FiltrosBusquedaDependenciaComponent', () => {
  let component: FiltrosBusquedaDependenciaComponent;
  let fixture: ComponentFixture<FiltrosBusquedaDependenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaDependenciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
