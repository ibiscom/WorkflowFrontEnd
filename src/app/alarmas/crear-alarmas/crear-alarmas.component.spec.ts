import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAtributoAlarmaComponent } from './crear-alarmas.component';

describe('CrearAtributoAlarmaComponent', () => {
  let component: CrearAtributoAlarmaComponent;
  let fixture: ComponentFixture<CrearAtributoAlarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAtributoAlarmaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearAtributoAlarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

