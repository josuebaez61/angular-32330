import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPageComponent } from './products-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../services/products.service';
import { ProductsServiceMock } from 'src/app/mocks/products.service.mock';

fdescribe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;
  let productService: ProductsService;
  let loadProductsSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsPageComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ProductsService,
          useClass: ProductsServiceMock,
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    loadProductsSpy = spyOn(productService, 'loadProducts').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario debe ser inválido si los campos están vacíos', () => {
    component.form.setValue({ description: '', name: '' });
    expect(component.form.invalid).toBeTrue();
  });

  it('Debe cargar los productos al iniciar el componente', () => {
    component.ngOnInit();
    expect(loadProductsSpy).toHaveBeenCalled();
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('Debe agregar correctamente un usuario', () => {
    const testingProductData = {
      name: 'TEST NAME',
      description: 'TEST DESCRIPTION',
    };
    component.form.patchValue(testingProductData)
    component.createProduct();
    expect(component.products.findIndex((p) => p.name === testingProductData.name)).toBeGreaterThanOrEqual(0)
  });
});
