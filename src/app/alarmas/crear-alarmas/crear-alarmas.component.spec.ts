import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlarmaComponent } from './crear-alarmas.component';

describe('CrearAlarmaComponent', () => {
  let component: CrearAlarmaComponent;
  let fixture: ComponentFixture<CrearAlarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAlarmaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearAlarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

