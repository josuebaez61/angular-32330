import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [
    ProductsPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
