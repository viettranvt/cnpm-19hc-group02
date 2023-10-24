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
import { WjComboBox, WjInputMask, WjInputDate } from '@grapecity/wijmo.angular2.input';
import { RoomService } from 'src/app/Service/room.service';
import { Room } from 'src/app/Common/models/room.model';
import { DatePipe } from '@angular/common';
import { ReportsService } from 'src/app/Service/report.service';

@Component({
  selector: 'app-RevenueStatistics',
  templateUrl: './RevenueStatistics.component.html',
  styleUrls: ['./RevenueStatistics.component.css']
})
export class RevenueStatisticsComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('ddlStatisticalType', { static: true }) private _ddlStatisticalType: WjComboBox;
  @ViewChild('sprStatistical', { static: true }) private _sprStatistical: WjFlexGrid;
  @ViewChild('dateStart', { static: true }) private _dateStart: WjInputDate;
  @ViewChild('dateEnd', { static: true }) private _dateEnd: WjInputDate;
  @ViewChild('bookingId', { static: true }) private _bookingId: WjInputMask;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Thống kê doanh thu';
  readonly GamenId = 'RevenueStatistics';

  public BT_FUNC1_NAME: string;
  public BT_FUNC2_NAME: string;
  public BT_FUNC3_NAME: string;
  private RevenueStatisticss: StatisticalDta[];
  private _ActiveCell: Cell;

  public isShow1: boolean;
  public isShow2: boolean;

  public sumRevenue: number;
  private totalPrice: number;

  constructor(
    public elementRef: ElementRef,
    private _ActiveModal: NgbActiveModal,
    private _AppElementRef: ElementRef,
    private _ComFnc: ComFnc,
    private _DialogService: ConfirmationDialogService,
    private _AppParamConfig: AppParamConfig,
    private _WaittingService: ComWaittingService,
    private _ReportsService: ReportsService,
    private _DatePipe: DatePipe,
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
    this.RevenueStatisticss = [];
    this._sprStatistical.itemsSource = [];
    this.BT_FUNC1_NAME = FUNC_BUTTON_TEXT.Close;
    this.BT_FUNC2_NAME = FUNC_BUTTON_TEXT.Refresh;
    this.BT_FUNC3_NAME = '';
    this.isShow1 = false;
    this.isShow2 = false;
    this.sumRevenue = 0;
    this.totalPrice = 0;
    this.F_INIT_WJCOMBOBOX();
    this.F_INIT_GRID();
  }

  private F_INIT_WJCOMBOBOX() {
    this._dateStart.value = new Date();
    this._dateEnd.value = new Date();
    this._bookingId.value = '';
    this._ddlStatisticalType.itemsSource = [];
    this._ComFnc.SetWjComboEvent([this._ddlStatisticalType]);

    this._ddlStatisticalType.selectedIndexChanged.addHandler((e: any) => {
      if (e.isDroppedDown || e.focus) {
        if (this._ddlStatisticalType.itemsSource.length === 0) {
          this._ddlStatisticalType.text = '';
        } else {
          this._dateStart.value = new Date();
          this._dateEnd.value = new Date();
          this._bookingId.value = '';
          this._sprStatistical.itemsSource = [];
          this.sumRevenue = 0;
          switch (this._ddlStatisticalType.selectedIndex) {
            case 0:
              this.isShow1 = false;
              this.isShow2 = false;
              break;
            case 1:
              this.isShow1 = true;
              this.isShow2 = false;
              break;
            case 2:
              this.isShow1 = false;
              this.isShow2 = true;
              break;
            default:
              this.isShow1 = false;
              this.isShow2 = false;
          }
        }
      }
    });
  }

  private F_INIT_GRID() {
    this._sprStatistical.autoGenerateColumns = false;
    this._sprStatistical.headersVisibility = 1;
    this._sprStatistical.allowResizing = 0;
    this._sprStatistical.allowDragging = 0;
    this._sprStatistical.alternatingRowStep = 0;
    this._sprStatistical.columnHeaders.rows.defaultSize = 28;
    this._sprStatistical.rows.defaultSize = 28;
    this._sprStatistical.keyActionEnter = 3;
    this._sprStatistical.isReadOnly = true;

    this.FormatItemGrid();
  }

  private FormatItemGrid() {
    this._sprStatistical.itemFormatter = (panel: { cellType: CellType }, r: any, c: any, cell: { style: any }) => {
      if (panel.cellType === CellType.ColumnHeader) {
        const cellStyle = cell.style;
        cellStyle.setProperty('text-align', 'center');
      }
    }
  }

  private F_SET_DATA_FORM() {
    this.I_SET_STATISTICAL_TYPE();
    this.I_GET_INFO_STATISTICAL();
  }

  private I_SET_STATISTICAL_TYPE() {
    this._ddlStatisticalType.itemsSource = [];
    const _Array = [];
    _Array.push(new DDLItem('0', 'Tất cả'));
    _Array.push(new DDLItem('1', 'Theo thời gian'));
    _Array.push(new DDLItem('2', 'Theo mã booking'));
    this._ddlStatisticalType.itemsSource = _Array;
    this._ddlStatisticalType.selectedIndex = 0;
  }

  private I_GET_INFO_STATISTICAL() {
    this._WaittingService.show(this._AppElementRef);
    this.RevenueStatisticss = [];
    this._sprStatistical.itemsSource = [];
    this.sumRevenue = 0;
    this._ReportsService.getReports()
      .subscribe(
        result => {
          if (result.message !== '') {
            const listdta = result.bookingsData;
            if (listdta.length > 0) {
              this.totalPrice = result.totalPrice;
              this.I_SET_INFO_STATISTICAL(listdta);
            }
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

  private I_SET_INFO_STATISTICAL(data: any[]) {
    const _Arr: StatisticalDta[] = [];
    for (let i = 0; i < data.length; i++) {
      const _ValIpt = data[i];
      if (i < 9) {
        _Arr.push(new StatisticalDta('00' + (i + 1), _ValIpt.bookingInfo.id, _ValIpt.user.fullName, _ValIpt.bookingInfo.startDate.substring(0, 10),
        _ValIpt.bookingInfo.endDate.substring(0, 10), _ValIpt.bookingInfo.price, _ValIpt.room.price, _ValIpt.bookingFoods.totalBookingFoodsPrice,
        _ValIpt.services.totalServicesPrice, _ValIpt.bill.amount, _ValIpt.bill.paymentType, _ValIpt.bill.notes));
      } else {
        _Arr.push(new StatisticalDta('0' + (i + 1), _ValIpt.bookingInfo.id, _ValIpt.user.fullName, _ValIpt.bookingInfo.startDate.substring(0, 10),
        _ValIpt.bookingInfo.endDate.substring(0, 10), _ValIpt.bookingInfo.price, _ValIpt.room.price, _ValIpt.bookingFoods.totalBookingFoodsPrice,
        _ValIpt.services.totalServicesPrice, _ValIpt.bill.amount, _ValIpt.bill.paymentType, _ValIpt.bill.notes));
      }
    }
    this.RevenueStatisticss = _Arr;
  }

  private I_SET_ROOM_FOR_STATUS() {
    if (this.RevenueStatisticss.length === 0) {
      this._DialogService.showError('Dữ liệu trống', '', true);
    } else {
      if (this._ddlStatisticalType.selectedIndex === 0) {
        this._sprStatistical.itemsSource = this.RevenueStatisticss;
        this.sumRevenue = this.totalPrice;
      } else if (this._ddlStatisticalType.selectedIndex === 1) {
        this.GET_STATISTICS_BY_DATE();
      } else {
        this.GET_STATISTICS_BY_BOOKING_ID();
      }
      this.SetCellFocus(0, 0);
    }
  }

  private GET_STATISTICS_BY_DATE(){
    if (this._dateStart.value > this._dateEnd.value) {
      this._DialogService.showError('Thời gian chọn không đúng', '', true)
        .finally(() => {
          this._dateEnd.focus();
        });
    } else {
      const listDta = this.RevenueStatisticss;
      const dateS = this._DatePipe.transform(this._dateStart.value, 'yyyy-MM-dd');
      const dateE = this._DatePipe.transform(this._dateEnd.value, 'yyyy-MM-dd');
      const dtaSelectS = listDta.filter(e => new Date(e.STARTDATE) >= new Date(dateS));
      const dtaSelectE = dtaSelectS.filter(e => new Date(e.ENDDATE) <= new Date(dateE));
      if (dtaSelectE.length === 0) {
        this._DialogService.showAlert('Không có data theo khoảng thời gian được chọn', '', 'Info')
          .finally(() => {
            this._dateEnd.focus();
          });
      } else {
        this._sprStatistical.itemsSource = dtaSelectE;
        this.sumRevenue = this.GET_TOTAL_PRICE(dtaSelectE);
      }
    }
  }

  private GET_STATISTICS_BY_BOOKING_ID(){
    if (!this._bookingId.value) {
      this._DialogService.showError('Nhập BookingID cần tìm', '', true)
        .finally(() => {
          this._bookingId.focus();
        });
    } else {
      const listDta = this.RevenueStatisticss;
      const dtaSelect = listDta.filter(e => Number(e.BOOKINGID) === Number(this._bookingId.value));
      if (dtaSelect.length === 0) {
        this._DialogService.showAlert('Không có data theo BookingID vừa nhập', '', 'Info')
          .finally(() => {
            this._bookingId.focus();
          });
      } else {
        this._sprStatistical.itemsSource = dtaSelect;
        this.sumRevenue = this.GET_TOTAL_PRICE(dtaSelect);
      }
    }
  }

  private GET_TOTAL_PRICE(listDta: StatisticalDta[]): number {
    let total = 0;
    listDta.forEach(DataInfo => {
      total += Number(DataInfo.TOTAL);
    })

    return total;
  }

  private SetCellFocus(row: number, col: number) {
    this._sprStatistical.focus();
    this._sprStatistical.select(new CellRange(row, col), true);
  }

  BT_FUNC1_Click() {
    this._ActiveModal.close(true);
  }

  BT_FUNC2_Click() {
    this.F_SET_DATA_FORM();
  }

  BT_FUNC3_Click() {
  }

  Search() {
    this.I_SET_ROOM_FOR_STATUS();
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

class StatisticalDta {
  constructor(
    public STT: string = '',
    public BOOKINGID: string = '',
    public CUSTOMERNAME: string = '',
    public STARTDATE: string = '',
    public ENDDATE: string = '',
    public ROOMID: string = '',
    public ROOMPRICE: string = '',
    public FOODPRICE: string = '',
    public SERVICESPRICE: string = '',
    public TOTAL: string = '',
    public PAYTYPE: string = '',
    public NOTE: string = '',
  ) { }
}