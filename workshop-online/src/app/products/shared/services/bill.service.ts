import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill';
import { ProductBill } from '../models/product-bill';


const URL_1 = 'http://localhost:8080/api/bill'
const URL_2 = 'http://localhost:8080/api/product-bill'

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient) { }

  //Crea la factura
  add(bill: Bill): Observable<any>{
    let a = this.httpClient.post(`${URL_1}`, bill);
    return a;
  }

  addProduct(productBill: ProductBill): Observable<any> {
    let a = this.httpClient.post(`${URL_2}`, productBill);
    return a;
  }


  

}
