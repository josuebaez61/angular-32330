import { BehaviorSubject, take } from 'rxjs';
import { Product } from '../core/models';
import { CreateProductData, IProductsService } from '../dashboard/products/services/products.service';

const FAKE_PRODUCTS: Product[] = [
  {
    id: "1",
    createdAt: new Date(),
    description: 'Lorem ipsum',
    name: 'Lorem'
  },
  {
    id: "2",
    createdAt: new Date(),
    description: 'Lorem ipsum',
    name: 'Lorem'
  }
]

export class ProductsServiceMock implements IProductsService {
  private products = new BehaviorSubject<Product[]>([]);
  public products$ = this.products.asObservable();

  loadProducts(): void {
    this.products.next(FAKE_PRODUCTS)
  }

  createProduct(data: CreateProductData) {
    this.products$.pipe(take(1)).subscribe(
      (products) => {
        const lastId = parseInt(products[products.length - 1]?.id) || 0;
        this.products.next([
          ...products,
          {
            id: String(lastId + 1),
            name: data.name ,
            description: data.description,
            createdAt: new Date(),
          }
        ])
      }
    )
  }
}