import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

import { Product } from '../../models/product.model';

const url = 'http://light-it-04.tk/api';

/*const params = new HttpParams({
      fromObject: {
        param1: 'value1',
        param2: 'value2',
      }
    });*/

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProductsList(): Observable<any> {
    return this.http.get<Product[]>(`${url}/adverts/`)
      .pipe(
        catchError(this.handleError<any>('updateHero'))
      );
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
