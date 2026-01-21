import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiemposMaximosComponent } from './tiempos-maximos-sesiones.component';

describe('TiemposMaximosComponent', () => {
  let component: TiemposMaximosComponent;
  let fixture: ComponentFixture<TiemposMaximosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiemposMaximosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TiemposMaximosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
