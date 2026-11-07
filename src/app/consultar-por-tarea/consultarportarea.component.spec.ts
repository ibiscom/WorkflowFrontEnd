import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPorTareaComponent } from './consultarportarea.component';

describe('ConsultarPorTareaComponent', () => {
  let component: ConsultarPorTareaComponent;
  let fixture: ComponentFixture<ConsultarPorTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarPorTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarPorTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

