import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComFnc } from 'src/app/Common/com-fnc/com-fnc.service';
import { ConfirmationDialogService } from 'src/app/Common/confirmation-dialog/confirmation-dialog.service';
import { AppParamConfig } from 'src/app/app.paramconfig';
import { ApplicationParam } from 'src/app/Common/web-api-parameter';
import { ComFooterComponent, FUNC_BUTTON_TEXT } from 'src/app/Common/com-footer/com-footer.component';
import { ComWaittingService } from 'src/app/Common/com-waitting/com-waitting.service';
import { WjInputMask } from '@grapecity/wijmo.angular2.input';
import { StaffService } from 'src/app/Service/staff.service';

@Component({
  selector: 'app-ChangePassword',
  templateUrl: './ChangePassword.component.html',
  styleUrls: ['./ChangePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('username', { static: true }) private _username: WjInputMask;
  @ViewChild('passwordOld', { static: true }) private _passwordOld: WjInputMask;
  @ViewChild('passwordNew', { static: true }) private _passwordNew: WjInputMask;
  @ViewChild('confirmedPassword', { static: true }) private _confirmedPassword: WjInputMask;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Thay đổi mật khẩu';
  readonly GamenId = 'ChangePassword';

  public BT_FUNC1_NAME: string;
  public BT_FUNC2_NAME: string;
  public BT_FUNC3_NAME: string;

  constructor(
    public elementRef: ElementRef,
    private _ActiveModal: NgbActiveModal,
    private _AppElementRef: ElementRef,
    private _ComFnc: ComFnc,
    private _DialogService: ConfirmationDialogService,
    private _AppParamConfig: AppParamConfig,
    private _WaittingService: ComWaittingService,
    private _StaffService: StaffService
  ) { }

  ngOnInit() {
    try {
      this.F_INIT_DATA_FORM();
      this.F_SET_DATA_FORM();
    } catch (ex) {
      this._WaittingService.hide();
    }
  }

  private F_INIT_DATA_FORM() {
    if (this.APP_PARAM) {
      this._AppParamConfig = this.APP_PARAM.AppParamConfig;
      this._AppElementRef = this.APP_PARAM.AppElementRef;
    }
    this.BT_FUNC1_NAME = FUNC_BUTTON_TEXT.Close;
    this.BT_FUNC2_NAME = FUNC_BUTTON_TEXT.Refresh;
    this.BT_FUNC3_NAME = FUNC_BUTTON_TEXT.Update;
    this.F_INIT_WJINPUTMASK();
  }

  private F_INIT_WJINPUTMASK() {
    this._username.value = this._AppParamConfig.userId;
    this._passwordOld.value = '';
    this._passwordNew.value = '';
    this._confirmedPassword.value = '';
  }

  private F_SET_DATA_FORM() {
    //
  }

  BT_FUNC1_Click() {
    this._ActiveModal.close(true);
  }

  BT_FUNC2_Click() {
    this.F_INIT_WJINPUTMASK();
  }

  BT_FUNC3_Click() {
    if (!this.CheckInput()) {
      this._StaffService.changePassword(
        this._passwordOld.value,
        this._passwordNew.value,
        this._confirmedPassword.value)
        .subscribe(
          result => {
            if (result.message !== '') {
              this._DialogService.showSuccess(result.message)
                .finally(() => {
                  this.F_INIT_WJINPUTMASK();
                });
              this._WaittingService.hide();
            }
          },
          err => {
            this._WaittingService.hide();
            this._DialogService.showError(err.error.message, '')
              .finally(() => { });
          }
        );
    }
  }

  private CheckInput(): boolean {
    const isErr = true;

    if (this._passwordOld.value === '' || this._passwordOld.value !== this._AppParamConfig.userpass) {
      this._DialogService.showError('Mật khẩu không đúng!', 'Vui lòng nhập lại Mật khẩu', true)
        .finally(() => {
          this._passwordOld.focus();
        });
      return isErr;
    }

    if (this._passwordNew.value === '' || this._passwordNew.value.length < 8) {
      this._DialogService.showError('Mật khẩu không hợp lệ!', 'Vui lòng nhập Mật khẩu tối thiểu 8 ký tự', true)
        .finally(() => {
          this._passwordNew.focus();
        });
      return isErr;
    }

    if (this._confirmedPassword.value === '' || this._confirmedPassword.value !== this._passwordNew.value) {
      this._DialogService.showError('Mật khẩu không chính xác', 'Vui lòng nhập giống mật khẩu mới, tối thiểu 8 ký tự', true)
        .finally(() => {
          this._confirmedPassword.focus();
        });
      return isErr;
    }

    return !isErr;
  }
}
