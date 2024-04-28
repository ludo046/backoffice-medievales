import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCampementComponent } from './home-campement.component';

describe('HomeCampementComponent', () => {
  let component: HomeCampementComponent;
  let fixture: ComponentFixture<HomeCampementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCampementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCampementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
