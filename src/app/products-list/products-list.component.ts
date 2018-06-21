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
  public isProductsListInitialLoading = true;
  public isProductsListLoading = true;
  private pagination = {
    limit: 20,
    offset: 0,
    finish: false
  };

  constructor(private productService: ProductService) { }

  public ngOnInit() {
    this.getProductsList();
  }

  private getProductsList(): void {

    this.isProductsListLoading = true;

     this.productService.getProductsList(this.pagination)
      .pipe(
        finalize(() => {
          this.isProductsListInitialLoading = false;
          this.isProductsListLoading = false;
        }),
      )
      .subscribe((data) => {
          this.products = this.products.concat(data.results);
          this.pagination.offset += this.pagination.limit;
          this.pagination.finish = !data.next;
        },
        (error) => {
          console.log(error);
        });
  }

  public onScroll(event: Event): void {
    console.log('scroll event', event);

    if (this.isProductsListLoading || this.pagination.finish) {
      return;
    }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('On Scroll Down');
      this.getProductsList();
    }
  }


}
