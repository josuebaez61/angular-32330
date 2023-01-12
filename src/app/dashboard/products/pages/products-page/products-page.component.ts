import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/core/models';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  private destroyed$ = new Subject();

  constructor(public readonly productsService: ProductsService) {}
  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
  ngOnInit(): void {
    this.productsService.loadProducts();
    this.productsService.products$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((products) => this.products = products);
  }

  createProduct() {
    if (this.form.valid) {
      this.productsService.createProduct(this.form.value as Pick<Product, 'name' | 'description'>)
    } else {
      alert('Formulario Inválido')
    }
  }
}
