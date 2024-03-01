import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRegistryComponent } from './users-registry.component';

describe('UsersRegistryComponent', () => {
  let component: UsersRegistryComponent;
  let fixture: ComponentFixture<UsersRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
