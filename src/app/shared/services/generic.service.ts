import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private http: HttpClient) {
  }

  public genericGetWithoutHeader<T>(endpoint: string, params: HttpParams = null) {
    const options = {};
    // tslint:disable-next-line:no-string-literal
    if (params) { options['params'] = params; }
    return this.http.get<T>(endpoint, options).pipe(
      tap(response => this.log(`Get ` + endpoint))
    );
  }


  public genericGet<T>(endpoint: string, params: HttpParams = null, headers: HttpHeaders) {
    const options = { headers };
    // tslint:disable-next-line:no-string-literal
    if (params) { options['params'] = params; }
    return this.http.get<T>(endpoint, options).pipe(
      tap(response => this.log(`Get ` + endpoint))
    );
  }

  /** Log a HeroService message with the MessageService */
  public log(message: string, showLogs = environment.show_logs) {
    if (!showLogs) {
      return true;
    }
  }

  // tslint:disable-next-line:ban-types
  public genericPatch<T>(endpoint: string, params: HttpParams = null, headers: HttpHeaders) {
    const options = { headers };
    // tslint:disable-next-line:no-string-literal
    if (params) { options['params'] = params; }
    return this.http.get<T>(endpoint, options).pipe(
      tap(response => this.log(`genericPatch ` + endpoint))
    );
  }

}
