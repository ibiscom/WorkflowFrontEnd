import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAtributoObjetowComponent } from './crear-atributo-objetow.component';

describe('CrearAtributoObjetowComponent', () => {
  let component: CrearAtributoObjetowComponent;
  let fixture: ComponentFixture<CrearAtributoObjetowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAtributoObjetowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearAtributoObjetowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

