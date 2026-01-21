import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesGruposComponent } from './acciones-grupos.component';

describe('AccionesGruposComponent', () => {
  let component: AccionesGruposComponent;
  let fixture: ComponentFixture<AccionesGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesGruposComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
