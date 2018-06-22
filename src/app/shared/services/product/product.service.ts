import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';

const url = 'http://light-it-04.tk/api';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProductsList(params = {}): Observable<any> {

    const settingQueryParams = ProductService.setQueryParams(params);

    return this.http.get<Product[]>(`${url}/adverts/`, {params: settingQueryParams});
  }

  public getProductDetail(productId): Observable<any> {
    return this.http.get<Product>(`${url}/adverts/${productId}/`);
  }

  private static setQueryParams(params): HttpParams {

    const localParams = new HttpParams({
      fromObject: params
    });

    return localParams;
  }

  public addToCart(productId): Observable<any> {

    const data = {
      basket: 1,
      product: productId,
      count: 1
    };

    return this.http.post<any>(`${url}/add_to_basket/`, data);
  }


  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
  }

}
