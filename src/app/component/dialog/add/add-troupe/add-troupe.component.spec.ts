import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTroupeComponent } from './add-troupe.component';

describe('AddTroupeComponent', () => {
  let component: AddTroupeComponent;
  let fixture: ComponentFixture<AddTroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTroupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
