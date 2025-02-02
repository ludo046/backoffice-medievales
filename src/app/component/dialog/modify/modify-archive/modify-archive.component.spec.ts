import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyArchiveComponent } from './modify-archive.component';

describe('ModifyArchiveComponent', () => {
  let component: ModifyArchiveComponent;
  let fixture: ComponentFixture<ModifyArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyArchiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
