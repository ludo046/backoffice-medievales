import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAnimationComponent } from './modify-animation.component';

describe('ModifyAnimationComponent', () => {
  let component: ModifyAnimationComponent;
  let fixture: ComponentFixture<ModifyAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
