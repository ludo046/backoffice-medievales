import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTroupeComponent } from './modify-troupe.component';

describe('ModifyTroupeComponent', () => {
  let component: ModifyTroupeComponent;
  let fixture: ComponentFixture<ModifyTroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyTroupeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyTroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
