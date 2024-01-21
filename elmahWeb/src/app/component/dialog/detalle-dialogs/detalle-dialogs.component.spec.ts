import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDialogsComponent } from './detalle-dialogs.component';

describe('DetalleDialogsComponent', () => {
  let component: DetalleDialogsComponent;
  let fixture: ComponentFixture<DetalleDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDialogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
