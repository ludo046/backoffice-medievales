import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTroupesComponent } from './home-troupes.component';

describe('HomeTroupesComponent', () => {
  let component: HomeTroupesComponent;
  let fixture: ComponentFixture<HomeTroupesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTroupesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTroupesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
