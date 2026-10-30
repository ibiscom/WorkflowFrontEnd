import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPorObjetoComponent } from './consultarporobjeto.component';

describe('ConsultarPorObjetoComponent', () => {
  let component: ConsultarPorObjetoComponent;
  let fixture: ComponentFixture<ConsultarPorObjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarPorObjetoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarPorObjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

