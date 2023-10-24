import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs'
import { WjFlexGrid } from '@grapecity/wijmo.angular2.grid';
import { CellType, CellRangeEventArgs, CellRange, DataMap, Row } from '@grapecity/wijmo.grid'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComFnc } from 'src/app/Common/com-fnc/com-fnc.service';
import { ConfirmationDialogService } from 'src/app/Common/confirmation-dialog/confirmation-dialog.service';
import { AppParamConfig } from 'src/app/app.paramconfig';
import { ApplicationParam } from 'src/app/Common/web-api-parameter';
import { ComFooterComponent, FUNC_BUTTON_TEXT } from 'src/app/Common/com-footer/com-footer.component';
import { ComWaittingService } from 'src/app/Common/com-waitting/com-waitting.service';
import { WjComboBox } from '@grapecity/wijmo.angular2.input';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/Common/models/user.model';

@Component({
  selector: 'app-UpdateCustomer',
  templateUrl: './UpdateCustomer.component.html',
  styleUrls: ['./UpdateCustomer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('ddlCustomerID', { static: true }) private _ddlCustomerID: WjComboBox;
  @ViewChild('sprInfoCustomer', { static: true }) private _sprInfoCustomer: WjFlexGrid;
  @ViewChild(ComFooterComponent) private _ComFooter: ComFooterComponent;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Cập nhật thông tin';
  readonly GamenId = 'UpdateCustomer';

  public BT_FUNC1_NAME: string;
  public BT_FUNC2_NAME: string;
  public BT_FUNC3_NAME: string;

  private _ActiveCell: Cell;
  private ListCustomer: Customer[];

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
    this._sprInfoCustomer.itemsSource = [];
    this.BT_FUNC1_NAME = FUNC_BUTTON_TEXT.Close;
    this.BT_FUNC2_NAME = FUNC_BUTTON_TEXT.Refresh;
    this.BT_FUNC3_NAME = FUNC_BUTTON_TEXT.Update;
    this.ListCustomer = [];
    this.F_INIT_WJCOMBOBOX();
    this.F_INIT_GRID();
  }

  private F_INIT_WJCOMBOBOX() {
    this._ddlCustomerID.itemsSource = [];
    this._ComFnc.SetWjComboEvent([this._ddlCustomerID]);

    this._ddlCustomerID.selectedIndexChanged.addHandler((e: any) => {
      if (e.isDroppedDown || e.focus) {
        if (this._ddlCustomerID.itemsSource.length === 0) {
          this._ddlCustomerID.text = '';
        } else {
          this._sprInfoCustomer.itemsSource = [];
        }
      }
    });
  }

  private F_INIT_GRID() {
    this._sprInfoCustomer.autoGenerateColumns = false;
    this._sprInfoCustomer.headersVisibility = 1;
    this._sprInfoCustomer.allowResizing = 0;
    this._sprInfoCustomer.allowDragging = 0;
    this._sprInfoCustomer.alternatingRowStep = 0;
    this._sprInfoCustomer.columnHeaders.rows.defaultSize = 28;
    this._sprInfoCustomer.rows.defaultSize = 28;
    this._sprInfoCustomer.keyActionEnter = 3;

    this.FormatItemGrid();
  }

  private FormatItemGrid() {
    this._sprInfoCustomer.itemFormatter = (panel: { cellType: CellType }, r: any, c: any, cell: { style: any }) => {
      if (panel.cellType === CellType.ColumnHeader) {
        const cellStyle = cell.style;
        cellStyle.setProperty('text-align', 'center');
      }
    }
  }

  private F_SET_DATA_FORM() {
    this.I_GET_INFO_CUSTOMER();
  }

  private I_GET_INFO_CUSTOMER() {
    this._WaittingService.show(this._AppElementRef);
    this.ListCustomer = [];
    this._UserService.getUsers()
      .subscribe(
        result => {
          if (result.message !== '') {
            const listdta = result.users;
            if (listdta.length > 0) {
              this.I_SET_INFO_CUSTOMER(listdta);
            }
            this._WaittingService.hide();
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

  private I_SET_INFO_CUSTOMER(data: any) {
    const _Arr: Customer[] = [];
    const _ArrayDDL = [];
    data.sort((a, b) => (a.id - b.id));
    data.forEach(DataInfo => {
      _Arr.push(new Customer(String(DataInfo.id), DataInfo.fullName, DataInfo.address, DataInfo.phoneNumber, DataInfo.identityId, DataInfo.identityType));
      if (DataInfo.id < 10) {
        _ArrayDDL.push(new DDLItem(String(DataInfo.id), '00' + String(DataInfo.id) + ' : ' + DataInfo.fullName));
      } else {
        _ArrayDDL.push(new DDLItem(String(DataInfo.id), '0' + String(DataInfo.id) + ' : ' + DataInfo.fullName));
      }
    });
    this.ListCustomer = _Arr;
    this._ddlCustomerID.itemsSource = _ArrayDDL;
    this.SetCellFocus(0, 0);
  }

  private I_SET_CUSTOMER_FOR_ID() {
    const ListData = this.ListCustomer;
    this._sprInfoCustomer.itemsSource = ListData.filter(e => e.ID === this._ddlCustomerID.selectedValue);
    this.SetCellFocus(0, 0);
  }

  private CheckInput(): boolean {
    let _Arr: Customer[] = [];
    _Arr = this._sprInfoCustomer.itemsSource;
    const isErr = true;
    for (let i = 0; i < _Arr.length; i++) {
      const dataUpdate = _Arr[i];
      if (dataUpdate.ISDELETE === false) {
        if (!dataUpdate.FULLNAME) {
          this._DialogService.showError('Vui lòng nhập Họ tên', 'Họ tên', true)
            .finally(() => {
              this.SetCellFocus(i, 1);
            });
          return isErr;
        }

        if (!dataUpdate.ADDRESS) {
          this._DialogService.showError('Vui lòng nhập Địa chỉ', 'Địa chỉ', true)
            .finally(() => {
              this.SetCellFocus(i, 2);
            });
          return isErr;
        }

        if (!dataUpdate.PHONENUMBER) {
          this._DialogService.showError('Vui lòng nhập Số điện thoại', 'Số điện thoại', true)
            .finally(() => {
              this.SetCellFocus(i, 3);
            });
          return isErr;
        }

        if (!dataUpdate.IDENTITYID) {
          this._DialogService.showError('Vui lòng nhập Số CMND hoặc số Hộ chiếu', 'Số CMND/Hộ chiếu', true)
            .finally(() => {
              this.SetCellFocus(i, 4);
            });
          return isErr;
        }
      }
    }

    return !isErr;
  }

  private SetCellFocus(row: number, col: number) {
    this._sprInfoCustomer.focus();
    this._sprInfoCustomer.select(new CellRange(row, col), true);
  }

  BT_FUNC1_Click() {
    this._ActiveModal.close(true);
  }

  BT_FUNC2_Click() {
    this.I_GET_INFO_CUSTOMER();
  }

  BT_FUNC3_Click() {
    if (!this.CheckInput()) {
      let _Arr: Customer[] = [];
      _Arr = this._sprInfoCustomer.itemsSource;
      for (let i = 0; i < _Arr.length; i++) {
        const dataTmp = _Arr[i];
        if (dataTmp.ISDELETE === false) {
          const dataUpdate = new User();
          dataUpdate.id = Number(dataTmp.ID);
          dataUpdate.fullName = dataTmp.FULLNAME;
          dataUpdate.address = dataTmp.ADDRESS;
          dataUpdate.phoneNumber = dataTmp.PHONENUMBER;
          dataUpdate.identityId = dataTmp.IDENTITYID
          this._WaittingService.show(this._AppElementRef);
          this._UserService.updateUser(dataUpdate.toUserUpdate())
            .subscribe(
              result => {
                if (result.message !== '') {
                  this._DialogService.showSuccess(result.message)
                    .finally(() => {
                      this.I_GET_INFO_CUSTOMER();
                    });
                  this._WaittingService.hide();
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
        } else {
          this._WaittingService.show(this._AppElementRef);
          this._UserService.deleteUser(Number(dataTmp.ID))
            .subscribe(
              result => {
                if (result.message !== '') {
                  this._DialogService.showSuccess(result.message)
                    .finally(() => {
                      this.I_GET_INFO_CUSTOMER();
                    });
                  this._WaittingService.hide();
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
    }
  }

  Search() {
    this.I_SET_CUSTOMER_FOR_ID();
  }
}

class Cell {
  constructor(
    public row: number = -1,
    public col: number = -1
  ) { }
}

class DDLItem {
  constructor(
    public sCode: string = '',
    public sName: string = '',
  ) { }
}

class Customer {
  constructor(
    public ID: string = '',
    public FULLNAME: string = '',
    public ADDRESS: string = '',
    public PHONENUMBER: string = '',
    public IDENTITYID: string = '',
    public IDENTITYTYPE: string = '',
    public ISDELETE: boolean = false
  ) { }
}