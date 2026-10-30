import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaDistribuirtareaComponent } from './filtros-busqueda-distribuirtarea.component';

describe('FiltrosBusquedaDistribuirtareaComponent', () => {
  let component: FiltrosBusquedaDistribuirtareaComponent;
  let fixture: ComponentFixture<FiltrosBusquedaDistribuirtareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaDistribuirtareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaDistribuirtareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

