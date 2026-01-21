import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoIdentificacionComponent } from './crear-tipo-identificacion.component';

describe('CrearTipoIdentificacionComponent', () => {
  let component: CrearTipoIdentificacionComponent;
  let fixture: ComponentFixture<CrearTipoIdentificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoIdentificacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearTipoIdentificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
