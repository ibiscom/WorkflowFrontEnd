import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetowComponent } from './objetow.component';

describe('ObjetowComponent', () => {
  let component: ObjetowComponent;
  let fixture: ComponentFixture<ObjetowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjetowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjetowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

