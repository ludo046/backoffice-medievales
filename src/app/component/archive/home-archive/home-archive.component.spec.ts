import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArchiveComponent } from './home-archive.component';

describe('HomeArchiveComponent', () => {
  let component: HomeArchiveComponent;
  let fixture: ComponentFixture<HomeArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeArchiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
