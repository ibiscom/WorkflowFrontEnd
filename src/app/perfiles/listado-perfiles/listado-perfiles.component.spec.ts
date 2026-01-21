import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPerfilesComponent } from './listado-perfiles.component';

describe('ListadoPerfilesComponent', () => {
  let component: ListadoPerfilesComponent;
  let fixture: ComponentFixture<ListadoPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPerfilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
