import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionLogComponent } from './seleccion-log.component';

describe('SeleccionLogComponent', () => {
  let component: SeleccionLogComponent;
  let fixture: ComponentFixture<SeleccionLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionLogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
