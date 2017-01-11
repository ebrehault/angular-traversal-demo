import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Resolver } from './resolver';

@Injectable()
export class BasicHttpResolver extends Resolver {

  constructor(private http: Http) {
    super();
  }

  resolve(path: string): Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:8080/Plone' + path, { headers })
      .map(res => res.json());
  }
}