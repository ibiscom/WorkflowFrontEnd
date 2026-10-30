import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarTrazabilidadComponent } from './consultartrazabilidad.component';

describe('ConsultarTrazabilidadComponent', () => {
  let component: ConsultarTrazabilidadComponent;
  let fixture: ComponentFixture<ConsultarTrazabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarTrazabilidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarTrazabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

