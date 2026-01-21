import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesEventoinicioComponent } from './acciones-eventoinicio.component';

describe('AccionesEventoinicioComponent', () => {
  let component: AccionesEventoinicioComponent;
  let fixture: ComponentFixture<AccionesEventoinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesEventoinicioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesEventoinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
