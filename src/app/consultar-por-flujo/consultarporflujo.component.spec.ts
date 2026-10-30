import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPorFlujoComponent } from './consultarporflujo.component';

describe('ConsultarPorFlujoComponent', () => {
  let component: ConsultarPorFlujoComponent;
  let fixture: ComponentFixture<ConsultarPorFlujoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarPorFlujoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarPorFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

