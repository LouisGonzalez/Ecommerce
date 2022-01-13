import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

const URL_ADMIN = 'https://adminecommerce.herokuapp.com/api'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  //Obtiene el status del interruptor manejado por Administracion
  getStatus(id: string): Observable<any> {
    let a = this.httpClient.get(`${URL_ADMIN}/switch/${id}`);
    return a;
  }

  //Envia el reporte de la transaccion realizada
  createReport(report: Report): Observable<any>{
    let a = this.httpClient.post(`${URL_ADMIN}/report`, report);
    return a;
  }
  
}
