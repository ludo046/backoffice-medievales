import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePartenairesComponent } from './home-partenaires.component';

describe('HomePartenairesComponent', () => {
  let component: HomePartenairesComponent;
  let fixture: ComponentFixture<HomePartenairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePartenairesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePartenairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
