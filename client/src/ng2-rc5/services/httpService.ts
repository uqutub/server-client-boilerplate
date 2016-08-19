import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'; //for http request (rest API)
import {returnObjType} from '../helper/helper';
import {Observable} from 'rxjs';
import {serverAPI} from './config'


@Injectable()
export class HttpService {

    //contructor
    constructor(private http: Http) {

    }

	// cache for request is in process then handle once beacuse its cached, if not use then on clicks it send multiple requests
	// share for if multiple subscriber then it make single stream, if not use then it gives multiple stream to its subcribers,

    get(url: string): Observable<returnObjType> {
		return this.http.request(this.setUrl(url)).map(this.responseMap).cache().share();
	}

	post(url: string, obj: any): Observable<returnObjType> {
		return this.http.post(this.setUrl(url), JSON.stringify(obj), this.getHeader()).map(this.responseMap).cache().share();
	}

	put(url: string, obj: Object): Observable<returnObjType> {
		return this.http.put(this.setUrl(url), JSON.stringify(obj), this.getHeader()).map(this.responseMap).cache().share();
	}

	delete(url: string): Observable<returnObjType> {
		return this.http.delete(this.setUrl(url)).map(this.responseMap).cache().share();
	}

	private getHeader() {
		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let options: RequestOptions = new RequestOptions();
		options.headers = headers;

		return options;   
	}

	private setUrl(url){
		return serverAPI + url;
	}

	responseMap(res: Response): returnObjType {
		let response: returnObjType = res.json();	
		return response;
	}
	



}	//HttpService