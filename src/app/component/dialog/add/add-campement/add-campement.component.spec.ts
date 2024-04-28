import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampementComponent } from './add-campement.component';

describe('AddCampementComponent', () => {
  let component: AddCampementComponent;
  let fixture: ComponentFixture<AddCampementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCampementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCampementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
