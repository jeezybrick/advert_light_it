import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../shared/models/product.model';
import { Image } from '../../shared/models/image.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product: Product;
  public slideImage: Image = new Image();
  public indexOfCurrentImage = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.slideImage = this.product.images[this.indexOfCurrentImage];
  }

  public previousImage(): void {
    if (this.indexOfCurrentImage < 1) {
      return;
    }
    this.indexOfCurrentImage --;
    this.slideImage = this.product.images[this.indexOfCurrentImage];
  }

  public nextImage(): void {

    if (this.indexOfCurrentImage === this.product.images.length - 1) {
      return;
    }

    this.indexOfCurrentImage++;
    this.slideImage = this.product.images[this.indexOfCurrentImage];
  }

}
