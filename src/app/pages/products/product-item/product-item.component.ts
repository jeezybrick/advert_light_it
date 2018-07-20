import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() public product: Product = new Product();

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  public addProductToCart(product): void {

    /*this.productService.addToCart(product)
      .subscribe(() => {

      });*/

  }

}
