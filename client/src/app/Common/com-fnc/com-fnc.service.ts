import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { AppParamConfig } from 'src/app/app.paramconfig';
import { ApiUrl, PageType } from 'src/app/Common/web-api-parameter';
import { WebApi } from 'src/app/Common/web-api-action'
import { WjInputDate, WjComboBox } from '@grapecity/wijmo.angular2.input'

@Injectable({
  providedIn: 'root'
})

export class ComFnc {
  private readonly _C_TCol = String.fromCharCode(6);
  private readonly _C_TRow = String.fromCharCode(7);
  private readonly _C_TGroup = String.fromCharCode(9);
  private readonly _C_TextCol = String.fromCharCode(4) + 'A' + String.fromCharCode(4);
  private readonly _C_TextRow = String.fromCharCode(5) + 'A' + String.fromCharCode(5);

  constructor(
    private _WebApi: WebApi,
    private _Router: Router
  ) { }

  public setPageParamMap(key: string, value: any[], appParamConfig: AppParamConfig) {
    appParamConfig.paramMap.set(key, value);
  }

  public getPageParamMap(key: string, appParamConfig: AppParamConfig): any[] {
    return appParamConfig.paramMap.get(key);
  }

  public CallPControl(fromPageId: string, nextPageId: string, paramArray: any[], appParamConfig: AppParamConfig) {
    if (nextPageId === '' || nextPageId === 'ControlManagerment/Login') {
      appParamConfig.Application = null;
      appParamConfig.urlHistoryMap = new Map<string, string>();
      appParamConfig.paramMap = new Map<string, string[]>();
      appParamConfig.permission = '';
      appParamConfig.isSignIn = false;
      this._Router.navigate(['ControlManagerment/PControl', { id: nextPageId }]);
      return;
    }

    if (paramArray) {
      appParamConfig.paramMap.set(fromPageId, paramArray);
    }

    if (paramArray.length > 0 && paramArray[0] === PageType.SUB) {
      appParamConfig.urlHistoryMap.set(nextPageId, fromPageId);
      appParamConfig.paramMap.set(nextPageId, paramArray);
    } else if (paramArray.length > 0 && paramArray[0] === PageType.MAIN) {
      appParamConfig.paramMap.set('ControlManagerment/PControl_' + nextPageId, paramArray);
      appParamConfig.urlHistoryMap.set(nextPageId, fromPageId);
      appParamConfig.paramMap.set(nextPageId, paramArray);
      this._Router.navigate(['ControlManagerment/PControl', { id: nextPageId }]);
    }
  }

  public GET_BACK_URL(paramKey: string, appParamConfig: AppParamConfig): string {
    let rtnUrl = '';

    if (appParamConfig.urlHistoryMap) {
      rtnUrl = appParamConfig.urlHistoryMap.get(paramKey);
    }

    return rtnUrl;
  }

  public GO_BACK(paramKey: string, appParamConfig: AppParamConfig, isSubScreen: boolean = false) {
    if (!isSubScreen) {
      const goBackUrl = this.GET_BACK_URL(paramKey, appParamConfig);
      appParamConfig.pageTitle = '';
      this._Router.navigate(['ControlManagerment/PControl', { id: goBackUrl }]);
      appParamConfig.paramMap.delete('ControlManagerment/PControl_' + paramKey);
    }
  }

  public CloseWattingDialog() {
    let backDrop: any;
    let waitting: any;
    backDrop = document.getElementById('backdrop');
    waitting = document.getElementById('waitting');

    if (waitting && backDrop) {
      backDrop.classList.remove('waitting-show');
      waitting.classList.remove('waitting-show');

      backDrop = null;
      waitting = null;
    }
  }

  public SetWjComboEvent(wjComboList: any[]) {
    if (wjComboList) {
      wjComboList.forEach(wjCombo => {
        wjCombo.hostElement.addEventListener('mousedown', (e: KeyboardEvent) => {
          e.preventDefault();
          wjCombo.focus();
        });

        wjCombo.hostElement.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.keyCode === 46 || e.keyCode === 8 || e.keyCode === 17 || e.keyCode === 88) {
            e.returnValue = false;
          }
        });

        wjCombo.hostElement.addEventListener('drop', (e: KeyboardEvent) => {
          e.preventDefault();
          e.returnValue = false;
        })
      });
    }
  }

}
