import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesResponsableComponent } from './acciones-responsable.component';

describe('AccionesResponsableComponent', () => {
  let component: AccionesResponsableComponent;
  let fixture: ComponentFixture<AccionesResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
