import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamModalComponent } from './create-team-modal.component';

describe('CreateTeamModalComponent', () => {
  let component: CreateTeamModalComponent;
  let fixture: ComponentFixture<CreateTeamModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeamModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
