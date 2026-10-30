import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadRealizadaPorResponsableComponent } from './actividadrealizadaporresponsable.component';

describe('ActividadRealizadaPorResponsableComponent', () => {
  let component: ActividadRealizadaPorResponsableComponent;
  let fixture: ComponentFixture<ActividadRealizadaPorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadRealizadaPorResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadRealizadaPorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

