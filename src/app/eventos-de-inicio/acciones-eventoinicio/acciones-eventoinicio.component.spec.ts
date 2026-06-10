import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesEventoInicioComponent } from './acciones-eventoinicio.component';  

describe('AccionesEventoInicioComponent', () => {
  let component: AccionesEventoInicioComponent;
  let fixture: ComponentFixture<AccionesEventoInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesEventoInicioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesEventoInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
