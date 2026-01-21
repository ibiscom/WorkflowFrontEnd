import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionVerDetalleLaComponent } from './seccion-ver-detalle-la.component';

describe('SeccionVerDetalleLaComponent', () => {
  let component: SeccionVerDetalleLaComponent;
  let fixture: ComponentFixture<SeccionVerDetalleLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionVerDetalleLaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeccionVerDetalleLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
