import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosBusquedaMigworkflowComponent } from './filtros-busqueda-migworkflow.component';

describe('FiltrosBusquedaMigworkflowComponent', () => {
  let component: FiltrosBusquedaMigworkflowComponent;
  let fixture: ComponentFixture<FiltrosBusquedaMigworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosBusquedaMigworkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosBusquedaMigworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
