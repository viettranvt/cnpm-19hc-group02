import { Component, Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Constant } from './constants';
import { ApiUrl } from './web-api-parameter';
//idasgg

@Injectable()
export class WebApi {
    constructor(
        private _http: HttpClient,
        @Inject(APP_BASE_HREF) private _baseHref: string
    ) {
        this._baseHref = this.generateBaseHref();
    }

    generateBaseHref(): string {
        let returnHref: string;
        returnHref = window['_app_base'] || '/';
        return returnHref;
    }

    private rootEndPoint(): string {
        const endP = this._baseHref;
        let returnString = '';
        if (endP === '/') {
            returnString = endP;
        } else {
            returnString = endP + '/';
        }
        return returnString;
    }

    private headersContent(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'accessToken': localStorage.getItem(Constant.TOKEN_KEY)
        });
    }

    //getWijmo

    get<T>(url: string, params?) {
        console.log(params);
        return this._http.get<T>(ApiUrl.server + url, {
            headers: this.headersContent(), params: params
        });
    }

    post<T>(url: string, body: any, enableHeader = true) {
        return this._http.post<T>(ApiUrl.server + url, body, enableHeader ? { headers: this.headersContent() } : {});
    }



    put<T>(url: string, body: any) {
        return this._http.put<T>(ApiUrl.server + url, body, { headers: this.headersContent() });
    }

    delete<T>(url: string, body: any) {
        const options = {
            headers: this.headersContent(),
            body: body,
        }
        return this._http.delete<T>(ApiUrl.server + url, options);
    }
}