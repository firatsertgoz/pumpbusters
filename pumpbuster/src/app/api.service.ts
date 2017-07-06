import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
    private baseUrl = 'http://localhost:5000';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getQuote(currencyName: string) {
        const url = `${this.baseUrl}/getmarketsummary?market=${currencyName}`
        return this.http
            .get(url)
            .toPromise()
            .then(response => {
                return response.json().response;
            })
            .catch(this.handleError);
    }

    getBalance(apiKey: string, currencyName) {
        const url = `${this.baseUrl}/getbalance?apiKey=${apiKey}&currencyName=${currencyName}`
        return this.http
            .get(url)
            .toPromise()
            .then(response => {
                return response.json().response;
            })
            .catch(this.handleError);
    }

}