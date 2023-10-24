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
import { RoomService } from 'src/app/Service/room.service';
import { Room } from 'src/app/Common/models/room.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ListRoom',
  templateUrl: './ListRoom.component.html',
  styleUrls: ['./ListRoom.component.css']
})
export class ListRoomComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('ddlRoomStatus', { static: true }) private _ddlRoomStatus: WjComboBox;
  @ViewChild('sprInfoRoom', { static: true }) private _sprInfoRoom: WjFlexGrid;
  // @ViewChild(ComFooterComponent) private _ComFooter: ComFooterComponent;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Danh sách phòng';
  readonly GamenId = 'ListRoom';

  public BT_FUNC1_NAME: string;
  public BT_FUNC2_NAME: string;
  public BT_FUNC3_NAME: string;
  private ListRooms: RoomDta[];
  private _ActiveCell: Cell;

  constructor(
    public elementRef: ElementRef,
    private _ActiveModal: NgbActiveModal,
    private _AppElementRef: ElementRef,
    private _ComFnc: ComFnc,
    private _DialogService: ConfirmationDialogService,
    private _AppParamConfig: AppParamConfig,
    private _WaittingService: ComWaittingService,
    private _RoomService: RoomService
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
    this.ListRooms = [];
    this._sprInfoRoom.itemsSource = [];
    this.BT_FUNC1_NAME = FUNC_BUTTON_TEXT.Close;
    this.BT_FUNC2_NAME = FUNC_BUTTON_TEXT.Refresh;
    this.BT_FUNC3_NAME = '';
    this.F_INIT_WJCOMBOBOX();
    this.F_INIT_GRID();
  }

  private F_INIT_WJCOMBOBOX() {
    this._ddlRoomStatus.itemsSource = [];
    this._ComFnc.SetWjComboEvent([this._ddlRoomStatus]);

    this._ddlRoomStatus.selectedIndexChanged.addHandler((e: any) => {
      if (e.isDroppedDown || e.focus) {
        if (this._ddlRoomStatus.itemsSource.length === 0) {
          this._ddlRoomStatus.text = '';
        } else {
          this._sprInfoRoom.itemsSource = [];
        }
      }
    });
  }

  private F_INIT_GRID() {
    this._sprInfoRoom.autoGenerateColumns = false;
    this._sprInfoRoom.headersVisibility = 1;
    this._sprInfoRoom.allowResizing = 0;
    this._sprInfoRoom.allowDragging = 0;
    //this._sprInfoRoom.allowSorting = false;
    this._sprInfoRoom.alternatingRowStep = 0;
    this._sprInfoRoom.columnHeaders.rows.defaultSize = 28;
    this._sprInfoRoom.rows.defaultSize = 28;
    this._sprInfoRoom.keyActionEnter = 3;
    this._sprInfoRoom.isReadOnly = true;

    this.FormatItemGrid();
  }

  private FormatItemGrid() {
    this._sprInfoRoom.itemFormatter = (panel: { cellType: CellType }, r: any, c: any, cell: { style: any }) => {
      if (panel.cellType === CellType.ColumnHeader) {
        const cellStyle = cell.style;
        cellStyle.setProperty('text-align', 'center');
      }
    }
  }

  private F_SET_DATA_FORM() {
    this.I_SET_STATUS_ROOM();
    this.I_GET_INFO_ROOM();
  }

  private I_SET_STATUS_ROOM() {
    this._ddlRoomStatus.itemsSource = [];
    const _Array = [];
    _Array.push(new DDLItem('0', 'Tất cả'));
    _Array.push(new DDLItem('1', 'Phòng chưa đặt'));
    _Array.push(new DDLItem('2', 'Phòng đã đặt'));
    this._ddlRoomStatus.itemsSource = _Array;
    this._ddlRoomStatus.selectedIndex = 0;
  }

  private I_GET_INFO_ROOM() {
    this._WaittingService.show(this._AppElementRef);
    this.ListRooms = [];
    this._RoomService.getAllRooms()
      .subscribe(
        result => {
          if (result.message === '') {
            const listdta = result.rooms;
            if(listdta.length > 0){
              this.I_SET_INFO_ROOM(listdta);
            }
            this._WaittingService.hide();
          } else {
            this._WaittingService.hide();
            this._DialogService.showError(result.message, '', true)
              .finally(() => {
                //
              });
          }
        },
        error => {
          this._WaittingService.hide();
          console.log(error);
        }
      );
  }

  private I_SET_INFO_ROOM(data: any[]) {
    const _Arr: RoomDta[] = [];
    data.forEach(DataInfo => {
      _Arr.push(new RoomDta(DataInfo.code, DataInfo.roomType.numOfBeds, DataInfo.roomType.view, DataInfo.roomType.price, DataInfo.isBooked));
    });
    this.ListRooms = _Arr;
  }

  private I_SET_ROOM_FOR_STATUS() {
    if (this._ddlRoomStatus.selectedValue === '0') {
      this._sprInfoRoom.itemsSource = this.ListRooms;
    } else if (this._ddlRoomStatus.selectedValue === '1') {
      this._sprInfoRoom.itemsSource = this.ListRooms.filter(e => e.ISBOOKED === false);
    } else {
      this._sprInfoRoom.itemsSource = this.ListRooms.filter(e => e.ISBOOKED === true);
    }
    this.SetCellFocus(0, 0);
  }

  private SetCellFocus(row: number, col: number) {
    this._sprInfoRoom.focus();
    this._sprInfoRoom.select(new CellRange(row, col), true);
  }

  BT_FUNC1_Click() {
    this._ActiveModal.close(true);
  }

  BT_FUNC2_Click() {
    this.I_SET_ROOM_FOR_STATUS();
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

class RoomDta {
  constructor(
    public ID: string = '',
    public NUMOFBEDS: number = 0,
    public VIEW: string = '',
    public PRICE: number = 0,
    public ISBOOKED: boolean = false
  ) { }
}