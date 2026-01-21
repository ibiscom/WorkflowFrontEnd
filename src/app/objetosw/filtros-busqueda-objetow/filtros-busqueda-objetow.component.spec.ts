import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaObjetowComponent } from './filtros-busqueda-objetow.component';

describe('FiltrosBusquedaObjetowComponent', () => {
  let component: FiltrosBusquedaObjetowComponent;
  let fixture: ComponentFixture<FiltrosBusquedaObjetowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaObjetowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaObjetowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
