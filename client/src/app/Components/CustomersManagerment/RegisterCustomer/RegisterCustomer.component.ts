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
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/Common/models/user.model';

@Component({
  selector: 'app-RegisterCustomer',
  templateUrl: './RegisterCustomer.component.html',
  styleUrls: ['./RegisterCustomer.component.css']
})
export class RegisterCustomerComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('fullname', { static: true }) private _fullname: WjInputMask;
  @ViewChild('address', { static: true }) private _address: WjInputMask;
  @ViewChild('phoneNumber', { static: true }) private _phoneNumber: WjInputMask;
  @ViewChild('identityId', { static: true }) private _identityId: WjInputMask;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Đăng ký thông tin';
  readonly GamenId = 'RegisterCustomer';

  public BT_FUNC1_NAME: string;
  public BT_FUNC2_NAME: string;
  public BT_FUNC3_NAME: string;

  private _ActiveCell: Cell;

  constructor(
    public elementRef: ElementRef,
    private _ActiveModal: NgbActiveModal,
    private _AppElementRef: ElementRef,
    private _ComFnc: ComFnc,
    private _DialogService: ConfirmationDialogService,
    private _AppParamConfig: AppParamConfig,
    private _WaittingService: ComWaittingService,
    private _UserService: UserService
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
    this.BT_FUNC2_NAME = FUNC_BUTTON_TEXT.AddNew;
    this.BT_FUNC3_NAME = FUNC_BUTTON_TEXT.Update;
    this.F_INIT_WJINPUTMASK();
  }

  private F_INIT_WJINPUTMASK() {
    this._fullname.value = '';
    this._address.value = '';
    this._phoneNumber.value = '';
    this._identityId.value = '';
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
      this._WaittingService.show(this._AppElementRef);
      const dataInsert = new User();
      dataInsert.fullName = this._fullname.value;
      dataInsert.address = this._address.value;
      dataInsert.phoneNumber = this._phoneNumber.value;
      dataInsert.identityId = this._identityId.value;
      this._UserService.createUser(dataInsert).subscribe(
        result => {
          if (result.message !== '') {
            this._WaittingService.hide();
            this._DialogService.showSuccess(result.message)
              .finally(() => {
                this.F_INIT_WJINPUTMASK();
              });
          }
        },
        err => {
          this._WaittingService.hide();
          this._DialogService.showError(err.error.message, '')
            .finally(() => {
              //
            });
        }
      );
    }
  }

  private CheckInput(): boolean {
    const isErr = true;

    if (this._fullname.value === '') {
      this._DialogService.showError('Vui lòng nhập Họ tên', 'Họ tên', true)
        .finally(() => {
          this._fullname.focus();
        });
      return isErr;
    }

    if (this._address.value === '') {
      this._DialogService.showError('Vui lòng nhập Địa chỉ', 'Địa chỉ', true)
        .finally(() => {
          this._address.focus();
        });
      return isErr;
    }

    if (this._phoneNumber.value === '') {
      this._DialogService.showError('Vui lòng nhập Số điện thoại', 'Số điện thoại', true)
        .finally(() => {
          this._phoneNumber.focus();
        });
      return isErr;
    }

    if (this._identityId.value === '') {
      this._DialogService.showError('Vui lòng nhập Số CMND hoặc số Hộ chiếu', 'Số CMND/Hộ chiếu', true)
        .finally(() => {
          this._identityId.focus();
        });
      return isErr;
    }

    return !isErr;
  }
}

class Cell {
  constructor(
    public row: number = -1,
    public col: number = -1
  ) { }
}
