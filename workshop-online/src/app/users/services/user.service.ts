import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

//const URL = 'http://localhost:8080/api/user'
const URL = 'https://ecommerce-lb.herokuapp.com/api/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user = null;
  userSession: any;

  constructor(private httpClient: HttpClient) { }

  setUserSesion(val: boolean){
    this.userSession = val;
  }

  getIdentity(){
    let user = JSON.parse(localStorage.getItem('user')!);
    if(user != undefined){
        this.user = user;
    } else {
      this.user = null;
    }
    return this.user;
  }

  login(username: string, password: string): Observable<any> {
    let body = { username: username, password: password }

    let a = this.httpClient.post(`${URL}/login`, body);
    console.log('asdfasdf,  ',a, '  ',URL);
    return a;
  }

  //Crea un nuevo usuario
  add(user: User): Observable<any>{
    return this.httpClient.post(`${URL}`, user).pipe(
      catchError(this.handleError)
    )
  }


  //obtiene un usuario especifico mediante su id
  get(id: string): Observable<any>{
    return this.httpClient.get(`${URL}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  //envia una peticion tipo PUT (para poder actualizar elementos en la DB)
  update(user: User){
    return this.httpClient.put(`${URL}/${user.id}`, user).pipe(
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
