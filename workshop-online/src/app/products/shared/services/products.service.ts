import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const PRODUCTS_URL = 'http://localhost:8080/api/product'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any>{
    return this.httpClient.get(`${PRODUCTS_URL}`).pipe(
      catchError(this.handleError)
    );
  }

  //Crea un producto
  add(product: Product): Observable<any>{
    return this.httpClient.post(`${PRODUCTS_URL}`, product).pipe(
      catchError(this.handleError)
    );
  }

  //obtiene el id de un producto para editarlo
  get(id: string): Observable<any>{
    return this.httpClient.get(`${PRODUCTS_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //envia una peticion tipo PUT (para poder actualizar elementos en la DB)
  update(product: Product): Observable<any>{
    return this.httpClient.put(`${PRODUCTS_URL}/${product.id}`, product).pipe(
      catchError(this.handleError)
    );
  }

  //Elimina un producto de la tienda
  delete(id: string): Observable<any>{
    return this.httpClient.delete(`${PRODUCTS_URL}/${id}`).pipe(
      catchError(this.handleError)
    );    
  }

  //obtiene el listado de productos de un usuario
  getByUser(idUser: string): Observable<any>{
    return this.httpClient.get(`${PRODUCTS_URL}/user/${idUser}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log('Client error ', error.error.message);
    } else {
      console.log('Error status: ', error.status);
      console.log('Error: ', error.error);
    }
    return throwError('Cannot perform the request, please try again later');
  }

}
