import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesEntidadComponent } from './acciones-entidad.component';

describe('AccionesEntidadComponent', () => {
  let component: AccionesEntidadComponent;
  let fixture: ComponentFixture<AccionesEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesEntidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
