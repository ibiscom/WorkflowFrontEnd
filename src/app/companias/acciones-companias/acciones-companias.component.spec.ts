import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesCompaniasComponent } from './acciones-companias.component';

describe('AccionesCompaniasComponent', () => {
  let component: AccionesCompaniasComponent;
  let fixture: ComponentFixture<AccionesCompaniasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesCompaniasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesCompaniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
