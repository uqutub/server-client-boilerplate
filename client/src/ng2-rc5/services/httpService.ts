import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'; //for http request (rest API)
import {Observable} from 'rxjs';


@Injectable()
export class HttpService {

	private serverAPI: string;

    //contructor
    constructor(private http: Http) {
		this.serverAPI = "http://localhost:3000";
    }

    get(url: string): Observable<Response> {
		return this.http.request(this.setUrl(url));
	}

	post(url: string, obj: any): Observable<Response> {
		return this.http.post(this.setUrl(url), JSON.stringify(obj), this.getHeader());
	}

	put(url: string, obj: Object): Observable<Response> {
		return this.http.put(this.setUrl(url), JSON.stringify(obj), this.getHeader());
	}

	delete(url: string): Observable<Response> {
		return this.http.delete(this.setUrl(url));
	}

	private getHeader() {
		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let options: RequestOptions = new RequestOptions();
		options.headers = headers;

		return options;   
	}

	private setUrl(url){
		return this.serverAPI + url;
	}

}	//HttpService