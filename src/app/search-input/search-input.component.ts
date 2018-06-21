import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/internal/operators';
import { ProductService } from '../shared/services/product/product.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  private searchText$ = new Subject<string>();
  public products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
  }

  public ngOnInit() {

    this.products$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((productTheme) => {
        console.log(productTheme);
        return this.productService.getProductsList({theme: productTheme});
        }
      )
    );

  }

  public search(productTheme: string): void {
    console.log(productTheme);
    this.searchText$.next(productTheme);
  }

  public resetSearchResults(): void {
    this.products$ = null;
  }

}
