import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../../../shared/models/product.model';
import { Image } from '../../../shared/models/image.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  public product: Product;
  public slideImage: Image = new Image();
  public indexOfCurrentImage = 0;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute) { }

  public ngOnInit() {

     this.subscriptions.push(this.route.params.subscribe(params => {

      this.slideImage = new Image();
      this.indexOfCurrentImage = 0;

      this.product = this.route.snapshot.data['product'];

      if (this.product.images.length) {
        this.slideImage = this.product.images[this.indexOfCurrentImage];
      }

    }));

  }

  public ngOnDestroy(): void {

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
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

  get userFullName() {

    if (!this.product.owner.first_name && !this.product.owner.last_name) {
      return 'No name user';
    }
    return `${ this.product.owner.first_name } ${ this.product.owner.last_name }`;
  }

}
