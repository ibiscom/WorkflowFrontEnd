import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesEntidadesComponent } from './acciones-entidades.component';

describe('AccionesEntidadComponent', () => {
  let component: AccionesEntidadesComponent;
  let fixture: ComponentFixture<AccionesEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesEntidadesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
