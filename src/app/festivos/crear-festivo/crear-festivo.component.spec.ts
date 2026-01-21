import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFestivoComponent } from './crear-festivo.component';

describe('CrearFestivoComponent', () => {
  let component: CrearFestivoComponent;
  let fixture: ComponentFixture<CrearFestivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearFestivoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearFestivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
