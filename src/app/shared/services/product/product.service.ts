import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

import { Product } from '../../models/product.model';

const url = 'http://light-it-04.tk/api';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProductsList(params = {}): Observable<any> {

    const settingQueryParams = this.setQueryParams(params);

    return this.http.get<Product[]>(`${url}/adverts/`, {params: settingQueryParams})
      .pipe(
        catchError(this.handleError<any>('updateHero'))
      );
  }

  public getProductDetail(productId): Observable<any> {
    return this.http.get<Product>(`${url}/adverts/${productId}/`);
  }

  private setQueryParams(params): HttpParams {

    const localParams = new HttpParams({
      fromObject: params
    });

    return localParams;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
  }

}
