import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesPatronComponent } from './acciones-patron.component';

describe('AccionesPatronComponent', () => {
  let component: AccionesPatronComponent;
  let fixture: ComponentFixture<AccionesPatronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesPatronComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesPatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

