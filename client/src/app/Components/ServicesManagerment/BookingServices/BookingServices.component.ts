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
import { BookingService } from 'src/app/Service/booking.service';
import { Booking } from 'src/app/Common/models/booking';
import { RoomServiceService, OrderService } from 'src/app/Service/room_service.service';
import { FoodService } from 'src/app/Service/food.service';
import { Food } from 'src/app/Common/models/food.model';
import { OrderFoodService, OrderFood } from 'src/app/Service/order_food.service';
import { Service } from 'src/app/Common/models/service.model';

@Component({
  selector: 'app-BookingServices',
  templateUrl: './BookingServices.component.html',
  styleUrls: ['./BookingServices.component.css']
})
export class BookingServicesComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('ddlBookingID', { static: true }) private _ddlBookingID: WjComboBox;
  @ViewChild('sprInfoFood', { static: true }) private _sprInfoFood: WjFlexGrid;
  @ViewChild(ComFooterComponent) private _ComFooter: ComFooterComponent;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Đặt tiện ích';
  readonly GamenId = 'BookingServices';

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
    private _BookingService: BookingService,
    private _RoomServiceService: RoomServiceService,
    private _FoodService: FoodService,
    private _OrderFoodService: OrderFoodService
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
    this._sprInfoFood.itemsSource = [];
    this.BT_FUNC1_NAME = FUNC_BUTTON_TEXT.Close;
    this.BT_FUNC2_NAME = FUNC_BUTTON_TEXT.Refresh;
    this.BT_FUNC3_NAME = FUNC_BUTTON_TEXT.Update;
    this.F_INIT_WJCOMBOBOX();
    this.F_INIT_GRID();
  }

  private F_INIT_WJCOMBOBOX() {
    this._ComFnc.SetWjComboEvent([this._ddlBookingID]);

    this._ddlBookingID.selectedIndexChanged.addHandler((e: any) => {
      if (e.isDroppedDown || e.focus) {
        if (this._ddlBookingID.itemsSource.length === 0) {
          this._ddlBookingID.text = '';
        } else {
          this.I_GET_INFO_SERVICES();
        }
      }
    });
  }

  private F_INIT_GRID() {
    this._sprInfoFood.autoGenerateColumns = false;
    this._sprInfoFood.headersVisibility = 1;
    this._sprInfoFood.allowResizing = 0;
    this._sprInfoFood.allowDragging = 0;
    this._sprInfoFood.alternatingRowStep = 0;
    this._sprInfoFood.columnHeaders.rows.defaultSize = 28;
    this._sprInfoFood.rows.defaultSize = 28;
    this._sprInfoFood.keyActionEnter = 1;

    this.FormatItemGrid();
  }

  private FormatItemGrid() {
    this._sprInfoFood.itemFormatter = (panel: { cellType: CellType }, r: any, c: any, cell: { style: any }) => {
      if (panel.cellType === CellType.ColumnHeader) {
        const cellStyle = cell.style;
        cellStyle.setProperty('text-align', 'center');
      }
    }
  }

  private F_SET_DATA_FORM() {
    this.I_GET_ID_BOOKING();
    this.I_GET_INFO_SERVICES();
  }

  private I_GET_ID_BOOKING() {
    this._WaittingService.show(this._AppElementRef);
    this._ddlBookingID.itemsSource = [];
    this._BookingService.getBookings()
      .subscribe(
        result => {
          if (result.message !== '') {
            const listdta = result.bookings;
            if (listdta.length > 0) {
              this.I_SET_ID_BOOKING(listdta);
            }
            this._WaittingService.hide();
          }
        },
        err => {
          this._WaittingService.hide();
          this._DialogService.showError(err.error.message, '', true)
            .finally(() => {
              //
            });
        }
      );
  }

  private I_SET_ID_BOOKING(data: any[]) {
    const _ArrayDDL = [];
    data.forEach(DataInfo => {
      if (DataInfo.id < 10) {
        _ArrayDDL.push(new DDLItem(String(DataInfo.id), '00' + String(DataInfo.id) + ' : ' + DataInfo.user.fullName));
      } else {
        _ArrayDDL.push(new DDLItem(String(DataInfo.id), '0' + String(DataInfo.id) + ' : ' + DataInfo.user.fullName));
      }
    });
    this._ddlBookingID.itemsSource = _ArrayDDL;
  }

  private I_GET_INFO_SERVICES() {
    this._WaittingService.show(this._AppElementRef);
    this._sprInfoFood.itemsSource = [];
    this._RoomServiceService.getAllService()
      .subscribe(
        result => {
          if (result.message !== '') {
            const listdta = result.services;
            this.I_SET_INFO_SERVICES(listdta);
            this._WaittingService.hide();
          } else {
            this._WaittingService.hide();
          }
        },
        error => {
          this._WaittingService.hide();
          console.log(error);
        }
      );
  }

  private I_SET_INFO_SERVICES(data: Service[]) {
    const _Arr: ServiceDta[] = [];
    data.forEach(DataInfo => {
      _Arr.push(new ServiceDta(String(DataInfo.id), DataInfo.name, String(DataInfo.price), DataInfo.description));
    });
    this._sprInfoFood.itemsSource = _Arr;
    this.SetCellFocus(0, 0);
  }

  private SetCellFocus(row: number, col: number) {
    this._sprInfoFood.focus();
    this._sprInfoFood.select(new CellRange(row, col), true);
  }

  private CheckInput(): boolean {
    const isErr = true;

    if (this._ddlBookingID.itemsSource.length === 0) {
      this._DialogService.showError('Vui lòng đăng ký dịch vụ trước khi đặt tiện ích', 'Đặt phòng', true)
        .finally(() => {
          this._ddlBookingID.focus();
        });
      return isErr;
    }

    if (this._sprInfoFood.itemsSource.length === 0) {
      this._DialogService.showError('Danh sách tiện ích trống', 'Tiện ích', true)
        .finally(() => { });
      return isErr;
    }

    return !isErr;
  }

  BT_FUNC1_Click() {
    this._ActiveModal.close(true);
  }

  BT_FUNC2_Click() {
    this.I_GET_INFO_SERVICES();
  }

  BT_FUNC3_Click() {
    if (!this.CheckInput()) {
      let _Arr: ServiceDta[] = [];
      let _ArrUpdate: OrderService[] = [];
      _Arr = this._sprInfoFood.itemsSource;
      for (let i = 0; i < _Arr.length; i++) {
        const dataTmp = _Arr[i];
        if (dataTmp.NUMBERS !== '' && dataTmp.NUMBERS !== '0') {
          const dataUpdate = new OrderService();
          dataUpdate.serviceId = Number(dataTmp.ID);
          dataUpdate.number = Number(dataTmp.NUMBERS);
          _ArrUpdate.push(dataUpdate);
        }
      }

      if (_ArrUpdate.length > 0) {
        this._WaittingService.show(this._AppElementRef);
        this._RoomServiceService.bookService(Number(this._ddlBookingID.selectedValue), _ArrUpdate)
          .subscribe(
            result => {
              if (result.message !== '') {
                this._DialogService.showSuccess(result.message)
                  .finally(() => {
                    this.I_GET_INFO_SERVICES();
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

class ServiceDta {
  constructor(
    public ID: string = '',
    public NAME: string = '',
    public PRICE: string = '',
    public DESCRIPTION: string = '',
    public NUMBERS: string = ''
  ) { }
}