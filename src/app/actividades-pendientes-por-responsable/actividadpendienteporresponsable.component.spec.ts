import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadPendientePorResponsableComponent } from './actividadpendienteporresponsable.component';

describe('ActividadPendientePorResponsableComponent', () => {
  let component: ActividadPendientePorResponsableComponent;
  let fixture: ComponentFixture<ActividadPendientePorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadPendientePorResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadPendientePorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

