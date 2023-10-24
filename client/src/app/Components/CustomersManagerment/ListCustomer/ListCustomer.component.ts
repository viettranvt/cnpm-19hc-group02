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
import { DatePipe } from '@angular/common'
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/Common/models/user.model';

@Component({
  selector: 'app-ListCustomer',
  templateUrl: './ListCustomer.component.html',
  styleUrls: ['./ListCustomer.component.css']
})
export class ListCustomerComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('sprInfoCustomer', { static: true }) private _sprInfoCustomer: WjFlexGrid;
  @ViewChild(ComFooterComponent) private _ComFooter: ComFooterComponent;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Danh sách khách hàng';
  readonly GamenId = 'ListCustomer';

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
    this._sprInfoCustomer.itemsSource = [];
    this.BT_FUNC1_NAME = FUNC_BUTTON_TEXT.Close;
    this.BT_FUNC2_NAME = FUNC_BUTTON_TEXT.Refresh;
    this.BT_FUNC3_NAME = '';

    this.F_INIT_GRID();
  }

  private F_INIT_GRID() {
    this._sprInfoCustomer.autoGenerateColumns = false;
    this._sprInfoCustomer.headersVisibility = 1;
    this._sprInfoCustomer.allowResizing = 0;
    this._sprInfoCustomer.allowDragging = 0;
    //this._sprInfoCustomer.allowSorting = false;
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
    this._UserService.getUsers()
      .subscribe(
        result => {
          if (result.message !== '') {
            const listdta = result.users;
            if(listdta.length > 0){
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
    data.sort((a, b) => (a.id - b.id));
    data.forEach(DataInfo => {
      _Arr.push(new Customer(String(DataInfo.id), DataInfo.fullName, DataInfo.address, DataInfo.phoneNumber, DataInfo.identityId, DataInfo.identityType));
    });
    this._sprInfoCustomer.itemsSource = _Arr;
    this.SetCellFocus(0, 0);
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
  }
}

class Cell {
  constructor(
    public row: number = -1,
    public col: number = -1
  ) { }
}

class Customer {
  constructor(
    public ID: string = '',
    public FULLNAME: string = '',
    public ADDRESS: string = '',
    public PHONENUMBER: string = '',
    public IDENTITYID: string = '',
    public IDENTITYTYPE: string = ''
  ) { }
}