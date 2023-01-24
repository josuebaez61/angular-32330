import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseDetailPageComponent } from './pages/course-detail-page/course-detail-page.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseDetailPageComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
  ]
})
export class CoursesModule { }
