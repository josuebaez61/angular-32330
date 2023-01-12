import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, mergeMap, take, tap } from 'rxjs';
import { Product } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseUrl = 'https://63b738094d97e82aa3b78a1a.mockapi.io';
  private readonly products = new BehaviorSubject<Product[]>([])
  public readonly products$: Observable<Product[]>;
  constructor(private readonly httpClient: HttpClient) {
    this.products$ = this.products.asObservable();
  }

  loadProducts() {
    this.httpClient.get<Product[]>(`${this.baseUrl}/products`)
      .subscribe((products) => this.products.next(products));
  }

  createProduct(data: Pick<Product, 'name' | 'description'>) {
    this.products$
      .pipe(
        take(1),
        mergeMap(
          (currentProducts) =>
            this.httpClient.post<Product>(`${this.baseUrl}/products`, data)
              .pipe(
                tap(
                  (createdProduct => this.products.next([...currentProducts, createdProduct]))
                )
              )
        ),
      ).subscribe()
  }
}
