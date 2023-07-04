import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = 'https://localhost:5001/';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) { }
  
  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }
/**
 * Función que muestra el error del get del Login
 * @param error 
 * @returns 
 */
  private handleError_Login(error: HttpErrorResponse): any {
    if (error.status == 404) {
      return throwError('Usuario no encontrado.');
    } else if (error.status == 401) {
      return throwError('Usuario no autorizado.');
    }
    
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
/**
 * Función que muestra el error del get de author
 * @param error 
 * @returns 
 */
private handleError_Author(error: HttpErrorResponse): any {
    if (error.status == 404) {
      return throwError('Usuario no encontrado.');
    } else if (error.status == 401) {
      return throwError('Usuario no autorizado.');
    }
    
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
}
/**
 * Función que muestra el error del get de Users
 * @param error 
 * @returns 
 */  
  private handleError_Users(error: HttpErrorResponse): any {
    if (error.status == 404) {
      return throwError('Usuario no encontrado.');
    } else if (error.status == 401) {
      return throwError('Usuario no autorizado.');
    }
    
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
/**
 * Función que muestra el error del get de Libros
 * @param error 
 * @returns 
 */
  private handleError_Books(error: HttpErrorResponse): any {
    if (error.status == 404) {
      return throwError('Usuario no encontrado.');
    } else if (error.status == 401) {
      return throwError('Usuario no autorizado.');
    }
    
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
/**
 * Funcion que muestra el error de la BooksAuthors
 * @param error 
 * @returns 
 */
private handleError_BooksAuthors(error: HttpErrorResponse): any {
    if (error.status == 404) {
      return throwError('Usuario no encontrado.');
    } else if (error.status == 401) {
      return throwError('Usuario no autorizado.');
    }
    
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
}
/**
 * Funcion que muestra el error de la sincronizacion
 * @param error 
 * @returns 
 */
private handleError_Syncronize(error: HttpErrorResponse): any {
    if (error.status == 404) {
      return throwError('Usuario no encontrado.');
    } else if (error.status == 401) {
      return throwError('Usuario no autorizado.');
    }
    
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
/**
 * Función que consume el API de logueo
 * @param userName Nombre de Usuario
 * @param passWord Password del Usuario
 * @returns 
 */
  getToken(userName: string, passWord: string): Observable<any> {

    const params = new HttpParams().set("userName", userName).set("passWord", passWord);
   
    return this.http.get(endpoint + 'login', {params}).pipe(
      map(this.extractData),
      catchError(this.handleError_Login)
    );
  }


/**
 * Función que cuenta cuantos libros hay en la base de datos
 * @param token JWT Jason Web Token para validar la consulta de los libros
 * @returns 
 */
  getCountBooks(token: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })

    return this.http.get(endpoint + 'Books/Count', {headers}).pipe(
      map(this.extractData),
      catchError(this.handleError_Books)
    );
  }
/**
 * Función que cuenta cuantos usuarios hay en la base de datos
 * @param token JWT Jason Web Token para validar la consulta de los usuarios
 * @returns 
 */
  getCountUsers(token: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    return this.http.get(endpoint + 'Login/UsersCount',{headers}).pipe(
      map(this.extractData),
      catchError(this.handleError_Users)
    );
  }
  /**
 * Función que cuenta cuantos Autores hay en la base de datos
 * @param token JWT Jason Web Token para validar la consulta de los Authors
 * @returns 
   */
  getCountAuthors(token: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    return this.http.get(endpoint + 'Authors/Count',{headers}).pipe(
      map(this.extractData),
      catchError(this.handleError_Author)
    );
  }
  postSyncronize(token: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    return this.http.get(endpoint + 'Authors/Sync',{headers}).pipe(
      map(this.extractData),
      catchError(this.handleError_Syncronize)
    );
  }
  
  getBooksAuthors(token: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    return this.http.get(endpoint + 'Books/Authors',{headers}).pipe(
      map(this.extractData),
      catchError(this.handleError_BooksAuthors)
    );
  }
/**
 * Función que consume el API de logueo
 * @param origin Nombre de Usuario
 * @param destination Password del Usuario
  * @param numeroMaxVuelos Password del Usuario
 * @returns 
 */
JourneyGet(origin: string, destination: string, numeroMaxVuelos: string): Observable<any> {

  const params = new HttpParams().set("origin", origin).set("destination", destination).set("numeroMaxVuelos", numeroMaxVuelos);
 
  return this.http.get(endpoint + 'Journey', {params}).pipe(
    map(this.extractData),
    catchError(this.handleError_Journey)
  );
}

/**
 * Función que muestra el error del get del Login
 * @param error 
 * @returns 
 */
private handleError_Journey(error: HttpErrorResponse): any {
  if (error.status == 404) {
    return throwError('Usuario no encontrado.');
  } else if (error.status == 401) {
    return throwError('Usuario no autorizado.');
  }
}

}
