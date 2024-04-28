import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCampementComponent } from './modify-campement.component';

describe('ModifyCampementComponent', () => {
  let component: ModifyCampementComponent;
  let fixture: ComponentFixture<ModifyCampementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyCampementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyCampementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
