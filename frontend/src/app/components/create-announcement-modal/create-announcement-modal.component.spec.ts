import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouncementModalComponent } from './create-announcement-modal.component';

describe('CreateAnnouncementModalComponent', () => {
  let component: CreateAnnouncementModalComponent;
  let fixture: ComponentFixture<CreateAnnouncementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnnouncementModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnnouncementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
