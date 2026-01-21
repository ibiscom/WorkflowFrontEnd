import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesObjetowComponent } from './acciones-objetow.component';

describe('AccionesObjetowComponent', () => {
  let component: AccionesObjetowComponent;
  let fixture: ComponentFixture<AccionesObjetowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesObjetowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesObjetowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
