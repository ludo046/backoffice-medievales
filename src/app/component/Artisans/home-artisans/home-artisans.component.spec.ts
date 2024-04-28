import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArtisansComponent } from './home-artisans.component';

describe('HomeArtisansComponent', () => {
  let component: HomeArtisansComponent;
  let fixture: ComponentFixture<HomeArtisansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeArtisansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeArtisansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
