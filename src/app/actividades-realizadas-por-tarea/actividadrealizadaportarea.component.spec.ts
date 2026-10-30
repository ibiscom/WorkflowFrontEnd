import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadRealizadaPorTareaComponent } from './actividadrealizadaportarea.component';

describe('ActividadRealizadaPorTareaComponent', () => {
  let component: ActividadRealizadaPorTareaComponent;
  let fixture: ComponentFixture<ActividadRealizadaPorTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadRealizadaPorTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadRealizadaPorTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

