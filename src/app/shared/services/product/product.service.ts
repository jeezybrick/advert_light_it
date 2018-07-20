import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Product } from '../../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProductsList(params = {}): Observable<any> {

    const settingQueryParams = this.setQueryParams(params);

    return this.http.get<Product[]>(`${environment.light_it_api_url}/adverts/`, {params: settingQueryParams});
  }

  public getProductDetail(productId): Observable<any> {
    return this.http.get<Product>(`${environment.light_it_api_url}/adverts/${productId}/`);
  }

  private setQueryParams(params): HttpParams {

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

    return this.http.post<any>(`${environment.light_it_api_url}/add_to_basket/`, data);
  }


  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
  }

}
