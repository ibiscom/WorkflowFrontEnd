import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPorResponsableComponent } from './consultarporresponsable.component';

describe('ConsultarPorResponsableComponent', () => {
  let component: ConsultarPorResponsableComponent;
  let fixture: ComponentFixture<ConsultarPorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarPorResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarPorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

