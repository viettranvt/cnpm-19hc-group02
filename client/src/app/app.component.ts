import { Component, ElementRef, Input, OnInit, Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppParamConfig } from './app.paramconfig';
import { WebApi } from './Common/web-api-action';
//ComFnc

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppParamConfig]
})
export class AppComponent implements OnInit {
  private callBackUrl: string;

  constructor(
    private _Router: Router,
    private _TitleService: Title,
    private _ElementRef: ElementRef,
    //private _ComFnc
    private _WebApi: WebApi,
    private _AppParamConfig: AppParamConfig
  ){
    this.callBackUrl = this._ElementRef.nativeElement.getAttribute('callBackUrl');
    this._TitleService.setTitle('DoAnCNPM');
  }

  ngOnInit(){
    let startUrl: string;
    startUrl = 'ControlManagerment/Login';

    if(this.callBackUrl !== '' && this._AppParamConfig.isSignIn
    && this._AppParamConfig.urlHistoryMap !== null
    && this._AppParamConfig.urlHistoryMap.get(this.callBackUrl) === this.callBackUrl){
      startUrl = this.callBackUrl;
    }else{
      this._AppParamConfig.Application = null;
      this._AppParamConfig.urlHistoryMap = new Map<string, string>();
      this._AppParamConfig.paramMap = new Map<string, string[]>();
      this._AppParamConfig.pageTitle = '';
      this._AppParamConfig.pageTitleStack = new Map<string, string>();
      this._AppParamConfig.userId = '';
      this._AppParamConfig.userNm = '';
      this._AppParamConfig.userpass = '';
      this._AppParamConfig.permission = '';
      this._AppParamConfig.isSignIn = false;
    }

    this._Router.navigate([startUrl]);

    //this._WebApi.
  }
}
