import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMarcheComponent } from './home-marche.component';

describe('HomeMarcheComponent', () => {
  let component: HomeMarcheComponent;
  let fixture: ComponentFixture<HomeMarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMarcheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
