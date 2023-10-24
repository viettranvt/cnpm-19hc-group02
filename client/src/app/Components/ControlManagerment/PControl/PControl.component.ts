import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../../Common/confirmation-dialog/confirmation-dialog.service';
import { ComFnc } from '../../../Common/com-fnc/com-fnc.service';
import { AppParamConfig } from '../../../app.paramconfig';

@Component({
  selector: 'app-PControl',
  templateUrl: './PControl.component.html',
  styleUrls: ['./PControl.component.css']
})
export class PControlComponent implements OnInit {

  constructor(
    private _Router: Router,
    private _ActiveRouter: ActivatedRoute,
    private _ComFnc: ComFnc,
    private _DialogSerivce: ConfirmationDialogService,
    private _AppParamConfig: AppParamConfig
  ) { }

  ngOnInit() {
    const nextPageId = this._ActiveRouter.snapshot.paramMap.get('id');

    if (nextPageId && this._AppParamConfig.isSignIn) {
      const paramArray: any[] = this._AppParamConfig.paramMap.get('ControlManagerment/PControl_' + nextPageId);

      if (paramArray.length > 0) {
        this._AppParamConfig.paramMap.set(nextPageId, paramArray);
      }

      this._Router.navigate([nextPageId]);
    } else {
      this._Router.navigate(['']);
    }
  }

}
