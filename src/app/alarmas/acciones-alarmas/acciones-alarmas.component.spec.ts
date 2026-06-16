import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesAlarmaComponent } from './acciones-alarmas.component';

describe('AccionesAlarmaComponent', () => {
  let component: AccionesAlarmaComponent;
  let fixture: ComponentFixture<AccionesAlarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesAlarmaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesAlarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

