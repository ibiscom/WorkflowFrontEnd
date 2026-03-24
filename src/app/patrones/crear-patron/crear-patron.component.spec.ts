import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPatronComponent } from './crear-patron.component';

describe('CrearPatronComponent', () => {
  let component: CrearPatronComponent;
  let fixture: ComponentFixture<CrearPatronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPatronComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

