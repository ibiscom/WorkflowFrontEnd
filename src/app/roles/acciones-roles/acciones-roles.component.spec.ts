import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesRolesComponent } from './acciones-roles.component';

describe('AccionesRolesComponent', () => {
  let component: AccionesRolesComponent;
  let fixture: ComponentFixture<AccionesRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesRolesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
