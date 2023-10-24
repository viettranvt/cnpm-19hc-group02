import { Injectable } from '@angular/core';
import { Observable, of, Observer, observable } from 'rxjs';

import { AppParamConfig } from '../app.paramconfig';
import { ConfirmationDialogService } from '../Common/confirmation-dialog/confirmation-dialog.service';
import { ApiUrl, MethodName, DBResult } from '../Common/web-api-parameter';
import { WebApi } from '../Common/web-api-action';
import { ComFnc } from '../Common/com-fnc/com-fnc.service';

@Injectable({
  providedIn: 'root'
})

export class RZZLoginService {
  private readonly _DllName = 'RZZLogin.Login';
  private _Method = '';
  private _mCase = '';
  private _mOutp = '';
  private _mGetListData: any;

  private readonly _C_TCol = String.fromCharCode(6);
  private readonly _C_TRow = String.fromCharCode(7);
  private readonly _C_TGroup = String.fromCharCode(9);
  private readonly _C_TextCol = String.fromCharCode(4) + 'A' + String.fromCharCode(4);
  private readonly _C_TextRow = String.fromCharCode(5) + 'A' + String.fromCharCode(5);

  constructor(
    private _WebApi: WebApi,
    private _ComFnc: ComFnc,
    private _AppParamConfig: AppParamConfig,
    private _DialogService: ConfirmationDialogService
  ) { }

  private GetList(paraIn: string[]): Observable<DBResult> {
    this._Method = MethodName.GetList;
    const param = this._DllName + '.' + this._Method + String.fromCharCode(9) + paraIn.join(String.fromCharCode(6));
    return this.Execute(param);
  }

  private Execute(param: string): Observable<DBResult> {
    return Observable.create((observer: Observer<DBResult>) => {
      this._WebApi.post<DBResult>(param, ApiUrl.DoLogin).subscribe(
        result => {
          if (result.PRZZ_Status === false) {
            this._ComFnc.CloseWattingDialog();
            this._DialogService
              .showError(
                result.PRZZ_Message
                , ''
                , true
                // ,result.PRZZ_Message
              )
              .finally(() => {
                observer.error(result.PRZZ_Message);
                observer.complete();
              })
          } else {
            observer.next(result);
            observer.complete();
          }
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      )
    })
  }

  public DoLogin() { }

  public SetTextToList(mTextData: string): RZZLoginOutput[] {
    const outputList: RZZLoginOutput[] = [];
    //Code translate
    return outputList;
  }
}

export class RZZLoginOutput {
  Userid: string;
  Permissionid: string;
  Fullname: string;
}