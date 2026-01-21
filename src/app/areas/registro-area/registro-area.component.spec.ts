import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAreaComponent } from './registro-area.component';

describe('RegistroAreaComponent', () => {
  let component: RegistroAreaComponent;
  let fixture: ComponentFixture<RegistroAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
