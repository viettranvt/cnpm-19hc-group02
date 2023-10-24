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
import { PaymentService, Info } from 'src/app/Service/payment.service';
import { Food } from 'src/app/Common/models/food.model';
import { PControlService } from '../../ControlManagerment/PControl/PControl.service';
import { WjInputMask } from '@grapecity/wijmo.angular2.input';
import { User } from 'src/app/Common/models/user.model';
import { Room } from 'src/app/Common/models/room.model';

@Component({
  selector: 'app-PayBill',
  templateUrl: './PayBill.component.html',
  styleUrls: ['./PayBill.component.css']
})
export class PayBillComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('ddlBookingID', { static: true }) private _ddlBookingID: WjComboBox;
  @ViewChild('ddlpaymentType', { static: true }) private _ddlpaymentType: WjComboBox;
  @ViewChild('sprInfoDetail', { static: true }) private _sprInfoDetail: WjFlexGrid;
  @ViewChild('notes', { static: true }) private _notes: WjInputMask;
  @ViewChild(ComFooterComponent) private _ComFooter: ComFooterComponent;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Thanh toán hóa đơn';
  readonly GamenId = 'PayBill';

  public BT_FUNC1_NAME: string;
  public BT_FUNC2_NAME: string;
  public BT_FUNC3_NAME: string;
  public fullName: string;
  public priceRoom: string;
  public priceFood: string;
  public priceServices: string;
  public priceTotal: string;

  public ishiddenfullName: boolean;
  public ishiddenpriceRoom: boolean;
  public ishiddenpriceFood: boolean;
  public ishiddenpriceServices: boolean;

  public isShow1: boolean;
  public isShow2: boolean;
  public isShow3: boolean;

  public infoCustomer: User;
  public infoRoom: Room;

  public timeUsed: number;

  private ListInfoFood: ItemDta[];
  private ListInfoServices: ItemDta[];

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
    //private _PControlService: PControlService,
    private _PaymentService: PaymentService,
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
    this.BT_FUNC3_NAME = FUNC_BUTTON_TEXT.PayBill;
    this.F_INIT_DATA();
    this.F_INIT_WJCOMBOBOX();
    this.F_INIT_GRID();
  }

  private F_INIT_WJCOMBOBOX() {
    this._ComFnc.SetWjComboEvent([this._ddlBookingID, this._ddlpaymentType]);

    this._ddlBookingID.selectedIndexChanged.addHandler((e: any) => {
      if (e.isDroppedDown || e.focus) {
        if (this._ddlBookingID.itemsSource.length === 0) {
          this._ddlBookingID.text = '';
        } else {
          this.F_INIT_DATA();
        }
      }
    });

    this._ddlpaymentType.selectedIndexChanged.addHandler((e: any) => {
      if (e.isDroppedDown || e.focus) {
        if (this._ddlpaymentType.itemsSource.length === 0) {
          this._ddlpaymentType.text = '';
        }
      }
    });
  }

  private F_INIT_DATA() {
    this.fullName = '';
    this.priceRoom = '';
    this.priceFood = '';
    this.priceServices = '';
    this.priceTotal = '';
    this._notes.value = '';
    this._ddlpaymentType.itemsSource = [];
    this.ListInfoFood = [];
    this.ListInfoServices = [];
    this._sprInfoDetail.itemsSource = [];

    this.ishiddenfullName = true;
    this.ishiddenpriceFood = true;
    this.ishiddenpriceRoom = true;
    this.ishiddenpriceServices = true;

    this.isShow1 = false;
    this.isShow2 = false;
    this.isShow3 = false;

    this.infoCustomer = new User();
    this.infoRoom = new Room();

    this.timeUsed = 0;
  }

  private F_INIT_GRID() {
    this._sprInfoDetail.autoGenerateColumns = false;
    this._sprInfoDetail.headersVisibility = 1;
    this._sprInfoDetail.allowResizing = 0;
    this._sprInfoDetail.allowDragging = 0;
    this._sprInfoDetail.alternatingRowStep = 0;
    this._sprInfoDetail.columnHeaders.rows.defaultSize = 28;
    this._sprInfoDetail.rows.defaultSize = 28;
    this._sprInfoDetail.keyActionEnter = 1;

    this.FormatItemGrid();
  }

  private FormatItemGrid() {
    this._sprInfoDetail.itemFormatter = (panel: { cellType: CellType }, r: any, c: any, cell: { style: any }) => {
      if (panel.cellType === CellType.ColumnHeader) {
        const cellStyle = cell.style;
        cellStyle.setProperty('text-align', 'center');
      }
    }
  }

  private F_SET_DATA_FORM() {
    this.I_GET_ID_BOOKING();
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

  private I_SET_PAYMENT_TYPE() {
    const _ArrayDDL = [];
    _ArrayDDL.push(new DDLItem('Tiền mặt', 'Tiền mặt'));
    _ArrayDDL.push(new DDLItem('Thẻ tín dụng', 'Thẻ tín dụng'));
    _ArrayDDL.push(new DDLItem('Ghi nợ', 'Thẻ ghi nợ'));
    this._ddlpaymentType.itemsSource = _ArrayDDL;
  }

  private I_GET_INFO_PAY_BILL() {
    this._WaittingService.show(this._AppElementRef);
    this._PaymentService.getBill(this._ddlBookingID.selectedValue)
      .subscribe(
        result => {
          if (result.message !== '') {
            this.I_SET_INFO_PAY_BILL(result.info);
            this._WaittingService.hide();
          }
        },
        error => {
          this._WaittingService.hide();
          console.log(error);
        }
      );
  }

  private I_SET_INFO_PAY_BILL(data: Info) {
    this.fullName = data.user.fullName;
    this.priceRoom = String(data.bookingInfo.price);
    this.priceFood = String(data.bookingFoods.totalBookingFoodsPrice);
    this.priceServices = String(data.services.totalServicesPrice);
    this.priceTotal = String(data.bill.amount) + '  (VNĐ)';
    this._notes.value = data.bill.notes;

    this.ishiddenfullName = false;
    this.ishiddenpriceFood = data.bookingFoods.totalBookingFoodsPrice === 0 ? true : false;
    this.ishiddenpriceRoom = data.bookingInfo.price === 0 ? true : false;
    this.ishiddenpriceServices = data.services.totalServicesPrice === 0 ? true : false;

    this.infoCustomer = data.user;
    this.infoRoom = data.room;

    this.timeUsed = data.bookingInfo.price / data.room.price;

    const _Arr: ItemDta[] = [];
    if (data.bookingFoods.bookingFoodsInfo.length > 0) {
      let idx = 1;
      data.bookingFoods.bookingFoodsInfo.forEach(DataInfo => {
        DataInfo.foods.forEach(DataDetail => {
          _Arr.push(new ItemDta(String(idx), DataDetail.food.name, String(DataDetail.food.price), String(DataDetail.number), String(DataDetail.totalFoodPrice), DataInfo.createdAt.substring(0, 10)));
          idx++;
        })
      });
    }
    this.ListInfoFood = _Arr;

    const _Arr2: ItemDta[] = [];
    if (data.services.servicesInfo.length > 0) {
      let idx = 1;
      data.services.servicesInfo.forEach(DataInfo => {
        _Arr2.push(new ItemDta(String(idx), DataInfo.name, String(DataInfo.price), String(DataInfo.number), String(DataInfo.totalServicePrice), ''));
        idx++;
      });
    }
    this.ListInfoServices = _Arr2;

    this.SetCellFocus(0, 0);
  }

  private SetCellFocus(row: number, col: number) {
    this._sprInfoDetail.focus();
    this._sprInfoDetail.select(new CellRange(row, col), true);
  }

  private CheckInput(): boolean {
    const isErr = true;

    if (this.fullName === '') {
      this._DialogService.showError('Chọn khách hàng', 'Hãy chọn khách hàng cần thanh toán', true)
        .finally(() => {
          this._ddlBookingID.focus();
        });
      return isErr;
    }

    if (this._notes.value === '') {
      this._DialogService.showError('Ghi chú rỗng!', 'Hãy nhập ghi chú trước khi thanh toán', true)
        .finally(() => {
          this._notes.focus();
        });
      return isErr;
    }

    return !isErr;
  }

  Search() {
    this.I_GET_INFO_PAY_BILL();
    this.I_SET_PAYMENT_TYPE();
  }

  ShowInfoDetail(flag: number) {
    switch (flag) {
      case 1:
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow3 = false;
        break;
      case 2:
        this.isShow1 = false;
        this.isShow2 = true;
        this.isShow3 = false;
        break;
      case 3:
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = true;
        this._sprInfoDetail.itemsSource = this.ListInfoFood;
        break;
      case 4:
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = true;
        this._sprInfoDetail.itemsSource = this.ListInfoServices;
        break;
      default:
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
    }
  }

  BT_FUNC1_Click() {
    this._ActiveModal.close(true);
  }

  BT_FUNC2_Click() {
    this.I_GET_INFO_PAY_BILL();
  }

  BT_FUNC3_Click() {
    if (!this.CheckInput()) {
      this._WaittingService.show(this._AppElementRef);
      this._PaymentService.pay(this._ddlBookingID.selectedValue, this._notes.value, this._ddlpaymentType.selectedValue)
        .subscribe(
          result => {
            if (result.message !== '') {
              this._WaittingService.hide();
              this._DialogService.showSuccess(result.message)
                .finally(() => { });
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

class ItemDta {
  constructor(
    public ID: string = '',
    public NAME: string = '',
    public PRICE: string = '',
    public NUMBERS: string = '',
    public TOTALPRICE: string = '',
    public DATEBOOK: string = ''
  ) { }
}