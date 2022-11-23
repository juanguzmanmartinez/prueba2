import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class GenericService {
  constructor(private http: HttpClient) {}

  public genericGet<T>(
    endpoint: string,
    params: HttpParams = null,
    headers: HttpHeaders = new HttpHeaders(),
    // tslint:disable-next-line:ban-types
    body: Object = null
  ) {
    const options = { headers };
    // tslint:disable-next-line:no-string-literal
    if (body) {
      options['body'] = body;
    }
    // tslint:disable-next-line:no-string-literal
    if (params) {
      options['params'] = params;
    }
    return this.http
      .get<T>(endpoint, options)
      .pipe(tap(() => this.log(`Get ` + endpoint)));
  }

  public genericPost<T>(
    endpoint: string,
    // tslint:disable-next-line:ban-types
    body: Object,
    params: HttpParams = null,
    headers: HttpHeaders = new HttpHeaders()
  ) {
    const options = { headers };
    // tslint:disable-next-line:no-string-literal
    if (params) {
      options['params'] = params;
    }
    return this.http
      .post<T>(endpoint, body, options)
      .pipe(tap(() => this.log(`Post ` + endpoint)));
  }

  public genericPut<T>(
    endpoint: string,
    // tslint:disable-next-line:ban-types
    body: Object,
    headers: HttpHeaders = new HttpHeaders()
  ) {
    return this.http
      .put<T>(endpoint, body, { headers })
      .pipe(tap(() => this.log(`Put ` + endpoint)));
  }

  public genericDelete<T>(
    endpoint: string,
    headers: HttpHeaders = new HttpHeaders()
  ) {
    return this.http
      .delete<T>(endpoint, { headers })
      .pipe(tap(() => this.log(`Delete ` + endpoint)));
  }

  public genericPatch<T>(
    endpoint: string,
    // tslint:disable-next-line:ban-types
    body: Object = {},
    params: HttpParams = null,
    headers: HttpHeaders = new HttpHeaders()
  ) {
    const options = { headers };
    // tslint:disable-next-line:no-string-literal
    if (params) {
      options['params'] = params;
    }
    return this.http
      .patch<T>(endpoint, body, options)
      .pipe(tap(() => this.log(`Patch ` + endpoint)));
  }

  public genericPatchWithoutBody<T>(
    endpoint: string,
    params: HttpParams = null,
    headers: HttpHeaders = new HttpHeaders()
  ) {
    const options = { headers };
    // tslint:disable-next-line:no-string-literal
    if (params) {
      options['params'] = params;
    }
    return this.http
      .patch<T>(endpoint, {}, options)
      .pipe(tap(() => this.log(`Patch without body ` + endpoint)));
  }

  /** Log a HeroService message with the MessageService */
  public log(message: string, showLogs = environment.show_logs) {
    if (!showLogs) {
      return true;
    }
  }
}
