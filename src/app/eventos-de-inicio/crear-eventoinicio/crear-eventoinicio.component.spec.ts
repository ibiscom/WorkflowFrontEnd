import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEventoinicioComponent } from './crear-eventoinicio.component';

describe('CrearEventoinicioComponent', () => {
  let component: CrearEventoinicioComponent;
  let fixture: ComponentFixture<CrearEventoinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEventoinicioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearEventoinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
