import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCorporativosComponent } from './datos-corporativos.component';

describe('DatosCorporativosComponent', () => {
  let component: DatosCorporativosComponent;
  let fixture: ComponentFixture<DatosCorporativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosCorporativosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCorporativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
