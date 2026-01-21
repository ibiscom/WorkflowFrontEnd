import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaOperacionComponent } from './nueva-operacion.component';

describe('NuevaOperacionComponent', () => {
  let component: NuevaOperacionComponent;
  let fixture: ComponentFixture<NuevaOperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaOperacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
