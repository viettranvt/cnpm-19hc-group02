import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppParamConfig } from '../../app.paramconfig';
import { ComFnc } from '../../Common/com-fnc/com-fnc.service';
import { ApplicationParam } from '../web-api-parameter';

@Component({
  selector: 'app-com-footer',
  templateUrl: './com-footer.component.html',
  styleUrls: ['./com-footer.component.css'],
  providers: [DatePipe]
})
export class ComFooterComponent implements OnInit {
  @Input() private GAMEN_ID = '';
  @Input() private FUNC01_Text = '';
  @Input() private FUNC02_Text = '';
  @Input() private FUNC03_Text = '';
  @Input() private APP_PARAM: ApplicationParam;

  @Output() private FUNC01: EventEmitter<any> = new EventEmitter();
  @Output() private FUNC02: EventEmitter<any> = new EventEmitter();
  @Output() private FUNC03: EventEmitter<any> = new EventEmitter();

  BTN_FUNC_01: any;
  BTN_FUNC_02: any;
  BTN_FUNC_03: any;

  FUNC_01_Text: string;
  FUNC_02_Text: string;
  FUNC_03_Text: string;

  IdUser = '';
  DateNow = '';

  constructor(
    private _ElementRef: ElementRef,
    private _DatePipe: DatePipe,
    private _ComFnc: ComFnc,
    private _AppParamConfig: AppParamConfig
  ) { }

  @HostListener('window:keydown', ['$event'])
  private document_OnkeyDown(event: KeyboardEvent) {
    if (event.keyCode === 112 && this.BTN_FUNC_01.disabled) {
      event.returnValue = false;
    }
    if (event.keyCode === 113 && this.BTN_FUNC_02.disabled) {
      event.returnValue = false;
    }
    if (event.keyCode === 114 && this.BTN_FUNC_03.disabled) {
      event.returnValue = false;
    }
  }

  ngOnInit() {
    if (this.APP_PARAM) {
      this._AppParamConfig = this.APP_PARAM.AppParamConfig;
    }

    this.FUNC_01_Text = this.FUNC01_Text;
    this.FUNC_02_Text = this.FUNC02_Text;
    this.FUNC_03_Text = this.FUNC03_Text;

    this.IdUser = this._AppParamConfig.userId;
    this.DateNow = this._DatePipe.transform(Date.now(), 'dd/MM/yyyy');

    this.F_INIT_BTN();
  }

  private F_INIT_BTN() {
    this.BTN_FUNC_01 = this._ElementRef.nativeElement.querySelector('#BT_FUNC1');
    this.BTN_FUNC_02 = this._ElementRef.nativeElement.querySelector('#BT_FUNC2');
    this.BTN_FUNC_03 = this._ElementRef.nativeElement.querySelector('#BT_FUNC3');
  }

  BT_FUNC_01_Click() {
    this._AppParamConfig.pageTitleStack.delete(this.GAMEN_ID);
    if (this.FUNC01) {
      this.FUNC01.next();
    }
  }

  BT_FUNC_02_Click() {
    if (this.FUNC02) {
      this.FUNC02.next();
    }
  }

  BT_FUNC_03_Click() {
    if (this.FUNC03) {
      this.FUNC03.next();
    }
  }

  onMouseOver(targetObj: any) {
    if (targetObj.type === 'button') {
      if (!targetObj.disabled) {
        targetObj.classList.add('mouse-over');
      }
    }
  }

  onMouseOut(targetObj: any) {
    if (targetObj.type === 'button') {
      if (!targetObj.disabled) {
        targetObj.classList.remove('mouse-over');
      }
    }
  }
}

export enum FUNC_BUTTON_TEXT{
  Back = "Quay lại",
  Close = "Thoát",
  Refresh = "Tải lại",
  Update = "Cập nhật",
  AddNew = "Tạo mới",
  PayBill = "Thanh toán"
}
