import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/internal/operators';

import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {

  private searchText$ = new Subject<string>();
  public products: Product[] = [];
  public searchText = '';
  public isProductsLoading = true;
  private subscriptions: Subscription[] = [];

  constructor(private productService: ProductService) {
  }

  public ngOnInit() {

    this.subscriptions.push(this.searchText$.pipe(
      debounceTime(500),
      // distinctUntilChanged(),
      switchMap((productTheme) => {
          return this.productService.getProductsList({theme: productTheme});
        }
      )
    ).subscribe((data: Product[]) => {
      this.products = data;
      this.isProductsLoading = false;
    }));

  }

  public ngOnDestroy(): void {

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public search(): void {
    this.isProductsLoading = true;
    this.searchText$.next(this.searchText);
  }

  public resetSearchResults(): void {
    this.searchText = '';
    this.products = [];
  }

}
