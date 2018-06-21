import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product/product.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {

    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Product> {
        const id = route.paramMap.get('id');
        return this.productService.getProductDetail(+id);
    }
}
