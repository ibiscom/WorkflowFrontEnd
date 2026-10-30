import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorDeTareaComponent } from './indicadordetarea.component';

describe('IndicadorDeTareaComponent', () => {
  let component: IndicadorDeTareaComponent;
  let fixture: ComponentFixture<IndicadorDeTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicadorDeTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndicadorDeTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

