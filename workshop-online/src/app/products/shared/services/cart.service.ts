import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const URL_ADMIN = 'https://adminecommerce.herokuapp.com/api/switch'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  invocateCart = new EventEmitter();
  invocateCart2 = new EventEmitter();

  invocateCart3 = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  onCartListen(data:Product){
    this.invocateCart.emit(data);
  }

  onCartListen2(data: number){
    this.invocateCart2.emit(data);
  }

  deleteProducts(data: number){
    this.invocateCart3.emit(data);
  }

  getStatus(id:string): Observable<any> {
    let a = this.httpClient.get(`${URL_ADMIN}/${id}`);
    return a;
  }


}
