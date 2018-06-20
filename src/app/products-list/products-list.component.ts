import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/internal/operators';

import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public products: Product[] = [];
  public isProductsListLoading = true;

  constructor(private productService: ProductService) { }

  public ngOnInit() {

    this.productService.getProductsList()
      .pipe(
        finalize(() => {
          this.isProductsListLoading = false;
        }),
      )
      .subscribe((results) => {
          this.products = results;
        },
        (error) => {
          console.log(error);
        });

  }

}
