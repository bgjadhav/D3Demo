import { Injectable } from '@angular/core';
import {map, catchError} from "rxjs/operators";

import { Observable, throwError } from 'rxjs';
import { LineData } from './lineData';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {

  constructor(private http: Http) { }
    getData():Observable<any> {
    // TODO: send the message _after_ fetching the hero
    return  this.http.get("assets/test.json").pipe(
      map((e:Response)=> e.json()),
      catchError((e:Response)=> throwError(e))
    );
  }
    
}

export class ApiResponse<T> { 
  public Data: T;
}
