import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigworkflowComponent } from './migworkflow.component';

describe('MigworkflowComponent', () => {
  let component: MigworkflowComponent;
  let fixture: ComponentFixture<MigworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MigworkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MigworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
