import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsPageComponent } from './students-page.component';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentModalComponent } from '../../components/student-modal/student-modal.component';

fdescribe('StudentsPageComponent', () => {
  let component: StudentsPageComponent;
  let fixture: ComponentFixture<StudentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsPageComponent],
      imports: [SharedModule, MatTableModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create user button should open StudentModalComponent', () => {
    const btn = fixture.debugElement.query(By.css('button.test-create-user-button')).nativeElement as HTMLButtonElement;
    btn.click()
    const openDialogs = component.dialogService.openDialogs;
    expect(openDialogs.length).toBeGreaterThan(0)
    const modalOpened = openDialogs[0]
    expect(modalOpened.componentInstance instanceof StudentModalComponent).toBe(true);
  })
});
