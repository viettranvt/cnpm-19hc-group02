import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { AppParamConfig } from '../../app.paramconfig';
import { ComFnc } from '../../Common/com-fnc/com-fnc.service';
import { ApplicationParam } from '../web-api-parameter';
import { PControlService } from '../../Components/ControlManagerment/PControl/PControl.service';

@Component({
  selector: 'app-com-header',
  templateUrl: './com-header.component.html',
  styleUrls: ['./com-header.component.css']
})
export class ComHeaderComponent implements OnInit {
  @Input() protected GAMEN_ID: string;
  @Input() protected PAGE_TITLE: string;
  @Input() protected APP_PARAM: ApplicationParam;
  @Input() protected ELE_REF: ElementRef;

  @Output() private CLOSE_FUNC: EventEmitter<any> = new EventEmitter();

  PageTitleText: string;

  constructor(
    private _ElementRef: ElementRef,
    private _ComFnc: ComFnc,
    private _AppParamConfig: AppParamConfig,
    private _PControlService: PControlService
  ) { }

  ngOnInit() {
    this.F_INIT_FORM();
  }

  private F_INIT_FORM() {
    if (this.APP_PARAM) {
      this._AppParamConfig = this.APP_PARAM.AppParamConfig;
    }

    this.SET_PAGE_TITLE();
  }

  BT_CLOSE_Click() {
    this._AppParamConfig.pageTitleStack.delete(this.GAMEN_ID);
    if (this.CLOSE_FUNC) {
      this.CLOSE_FUNC.next();
    }
  }

  SET_PAGE_TITLE(pageTitle: string = '') {
    if (pageTitle !== '') {
      this.PAGE_TITLE = pageTitle;
    }

    if (this.PAGE_TITLE !== undefined && this.PAGE_TITLE !== '') {
      this._AppParamConfig.pageTitleStack.set(this.GAMEN_ID, this.PAGE_TITLE);
    }

    this.PageTitleText = this.PAGE_TITLE ? this.PAGE_TITLE : '';
  }
}
