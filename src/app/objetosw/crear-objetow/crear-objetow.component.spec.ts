import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearObjetowComponent } from './crear-objetow.component';

describe('CrearObjetowComponent', () => {
  let component: CrearObjetowComponent;
  let fixture: ComponentFixture<CrearObjetowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearObjetowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearObjetowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
