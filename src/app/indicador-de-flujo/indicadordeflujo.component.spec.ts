import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorDeFlujoComponent } from './indicadordeflujo.component';

describe('IndicadorDeFlujoComponent', () => {
  let component: IndicadorDeFlujoComponent;
  let fixture: ComponentFixture<IndicadorDeFlujoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicadorDeFlujoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndicadorDeFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

