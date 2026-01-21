import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesPerfilesComponent } from './acciones-perfiles.component';

describe('AccionesPerfilesComponent', () => {
  let component: AccionesPerfilesComponent;
  let fixture: ComponentFixture<AccionesPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesPerfilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
