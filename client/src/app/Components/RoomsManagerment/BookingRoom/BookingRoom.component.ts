import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComFnc } from 'src/app/Common/com-fnc/com-fnc.service';
import { ConfirmationDialogService } from 'src/app/Common/confirmation-dialog/confirmation-dialog.service';
import { AppParamConfig } from 'src/app/app.paramconfig';
import { ApplicationParam } from 'src/app/Common/web-api-parameter';
import { ComFooterComponent, FUNC_BUTTON_TEXT } from 'src/app/Common/com-footer/com-footer.component';
import { ComWaittingService } from 'src/app/Common/com-waitting/com-waitting.service';
import { WjComboBox, WjInputMask, WjInputDate } from '@grapecity/wijmo.angular2.input';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/Service/user.service';
import { RoomService } from 'src/app/Service/room.service';
import { BookingService } from 'src/app/Service/booking.service';
import { Room } from 'src/app/Common/models/room.model';
import { Booking } from 'src/app/Common/models/booking';

@Component({
  selector: 'app-BookingRoom',
  templateUrl: './BookingRoom.component.html',
  styleUrls: ['./BookingRoom.component.css']
})
export class BookingRoomComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('ddlCustomerID', { static: true }) private _ddlCustomerID: WjComboBox;
  @ViewChild('ddlRoomID', { static: true }) private _ddlRoomID: WjComboBox;
  @ViewChild('dateStart', { static: true }) private _dateStart: WjInputDate;
  @ViewChild('dateEnd', { static: true }) private _dateEnd: WjInputDate;
  @ViewChild('note', { static: true }) private _note: WjInputMask;
  @ViewChild(ComFooterComponent) private _ComFooter: ComFooterComponent;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Đăng ký đặt phòng';
  readonly GamenId = 'BookingRoom';

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
    private _DatePipe: DatePipe,
    private _UserService: UserService,
    private _RoomService: RoomService,
    private _BookingService: BookingService
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
    this.F_INIT_WIJMO();
  }

  private F_INIT_WIJMO() {
    this._ddlCustomerID.itemsSource = [];
    this._ddlRoomID.itemsSource = [];
    this._dateStart.value = new Date();
    this._dateEnd.value = new Date();
    this._note.value = '';
    this._ComFnc.SetWjComboEvent([this._ddlCustomerID, this._ddlRoomID]);
    this._dateStart.min = new Date();
    this._dateEnd.min = new Date();

    this._ddlCustomerID.selectedIndexChanged.addHandler((e: any) => {
      if (e.isDroppedDown || e.focus) {
        if (this._ddlCustomerID.itemsSource.length === 0) {
          this._ddlCustomerID.text = '';
        }
      }
    });

    this._ddlRoomID.selectedIndexChanged.addHandler((e: any) => {
      if (e.isDroppedDown || e.focus) {
        if (this._ddlRoomID.itemsSource.length === 0) {
          this._ddlRoomID.text = '';
        }
      }
    });
  }

  private F_SET_DATA_FORM() {
    this.I_GET_ID_CUSTOMER();
    this.I_GET_ID_ROOM();
  }

  private I_GET_ID_CUSTOMER() {
    this._WaittingService.show(this._AppElementRef);
    this._UserService.getUsers()
      .subscribe(
        result => {
          if (result.message !== '') {
            const listdta = result.users;
            if (listdta.length > 0) {
              this.I_SET_ID_CUSTOMER(listdta);
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

  private I_SET_ID_CUSTOMER(data: any) {
    const _ArrayDDL = [];
    data.sort((a, b) => (a.id - b.id));
    data.forEach(DataInfo => {
      if (DataInfo.id < 10) {
        _ArrayDDL.push(new DDLItem(String(DataInfo.id), '00' + String(DataInfo.id) + ' : ' + DataInfo.fullName));
      } else {
        _ArrayDDL.push(new DDLItem(String(DataInfo.id), '0' + String(DataInfo.id) + ' : ' + DataInfo.fullName));
      }
    });
    this._ddlCustomerID.itemsSource = _ArrayDDL;
  }

  private I_GET_ID_ROOM() {
    this._WaittingService.show(this._AppElementRef);
    this._RoomService.getAllRooms()
      .subscribe(
        result => {
          if (result.message === '') {
            const listdta = result.rooms;
            if (listdta.length > 0) {
              this.I_SET_ID_ROOM(listdta);
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

  private I_SET_ID_ROOM(data: any[]) {
    const _ArrayDDL = [];
    data.forEach(DataInfo => {
      if (DataInfo.isBooked === false) {
        if (DataInfo.id < 10) {
          _ArrayDDL.push(new DDLItem(String(DataInfo.id), '00' + String(DataInfo.id) + ' : ' + DataInfo.roomType.numOfBeds + ' giường ngủ'));
        } else {
          _ArrayDDL.push(new DDLItem(String(DataInfo.id), '0' + String(DataInfo.id) + ' : ' + DataInfo.roomType.numOfBeds + ' giường ngủ'));
        }
      }
    });
    this._ddlRoomID.itemsSource = _ArrayDDL;
  }

  BT_FUNC1_Click() {
    this._ActiveModal.close(true);
  }

  BT_FUNC2_Click() {
    if (this._ddlCustomerID.itemsSource.length > 0) {
      this._ddlCustomerID.selectedIndex = 0;
    }
    if (this._ddlRoomID.itemsSource.length > 0) {
      this._ddlRoomID.selectedIndex = 0;
    }
    this._dateStart.value = new Date();
    this._dateEnd.value = new Date();
    this._note.value = '';
  }

  BT_FUNC3_Click() {
    if (!this.CheckInput()) {
      const dataUpdate = new Booking();
      dataUpdate.userId = Number(this._ddlCustomerID.selectedValue);
      dataUpdate.roomId = Number(this._ddlRoomID.selectedValue);
      dataUpdate.startDate = String(this._dateStart.value.getTime());
      dataUpdate.endDate = String(this._dateEnd.value.getTime());
      dataUpdate.description = this._note.value;

      this._BookingService.createUser(dataUpdate)
        .subscribe(
          result => {
            if (result.message !== '') {
              this._DialogService.showSuccess(result.message)
                .finally(() => { });
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

  private CheckInput(): boolean {
    const isErr = true;

    if (this._ddlCustomerID.itemsSource.length === 0) {
      this._DialogService.showError('Không có khách hàng nào được chọn', 'Vui lòng đăng ký thông tin khách hàng trước khi đặt phòng', true)
        .finally(() => {
          this._ddlCustomerID.focus();
        });
      return isErr;
    }

    if (this._ddlRoomID.itemsSource.length === 0) {
      this._DialogService.showError('Không có phòng trống', 'Hiện tại đang hết phòng, vui lòng chờ xử lý', true)
        .finally(() => {
          this._ddlRoomID.focus();
        });
      return isErr;
    }

    if (this._dateStart.value > this._dateEnd.value) {
      this._DialogService.showError('Ngày trả phòng < ngày đặt', 'Vui lòng chọn lại ngày trả phòng', true)
        .finally(() => {
          this._dateEnd.focus();
        });
      return isErr;
    }

    return !isErr;
  }
}

class DDLItem {
  constructor(
    public sCode: string = '',
    public sName: string = '',
  ) { }
}