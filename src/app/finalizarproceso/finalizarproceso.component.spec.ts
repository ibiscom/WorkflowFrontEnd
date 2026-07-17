import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarprocesoComponent } from './finalizarproceso.component';

describe('FinalizarprocesoComponent', () => {
  let component: FinalizarprocesoComponent;
  let fixture: ComponentFixture<FinalizarprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarprocesoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinalizarprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

