import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPartenaireComponent } from './modify-partenaire.component';

describe('ModifyPartenaireComponent', () => {
  let component: ModifyPartenaireComponent;
  let fixture: ComponentFixture<ModifyPartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyPartenaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
