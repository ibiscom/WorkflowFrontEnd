import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesFestivoComponent } from './acciones-festivo.component';

describe('AccionesFestivoComponent', () => {
  let component: AccionesFestivoComponent;
  let fixture: ComponentFixture<AccionesFestivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesFestivoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesFestivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
