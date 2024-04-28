import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyArtisanComponent } from './modify-artisan.component';

describe('ModifyArtisanComponent', () => {
  let component: ModifyArtisanComponent;
  let fixture: ComponentFixture<ModifyArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyArtisanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
