import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesTiposIdentificacionComponent } from './acciones-tipos-identificacion.component';

describe('AccionesTiposIdentificacionComponent', () => {
  let component: AccionesTiposIdentificacionComponent;
  let fixture: ComponentFixture<AccionesTiposIdentificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesTiposIdentificacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesTiposIdentificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
