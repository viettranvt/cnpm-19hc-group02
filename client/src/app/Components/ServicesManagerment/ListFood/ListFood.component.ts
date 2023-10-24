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
import { FoodService } from 'src/app/Service/food.service';
import { Food } from 'src/app/Common/models/food.model';

@Component({
  selector: 'app-ListFood',
  templateUrl: './ListFood.component.html',
  styleUrls: ['./ListFood.component.css']
})
export class ListFoodComponent implements OnInit {
  @Input() PARAM_ARRAY: string[];
  @Input() APP_PARAM: ApplicationParam;
  @ViewChild('ddlTypeFood', { static: true }) private _ddlTypeFood: WjComboBox;
  @ViewChild('sprInfoFood', { static: true }) private _sprInfoFood: WjFlexGrid;
  @Output() FUNC01: EventEmitter<any> = new EventEmitter();

  readonly PageTitle = 'Danh sách món ăn';
  readonly GamenId = 'ListFood';

  public BT_FUNC1_NAME: string;
  public BT_FUNC2_NAME: string;
  public BT_FUNC3_NAME: string;
  private ListFoods: FoodDta[];
  private _ActiveCell: Cell;

  constructor(
    public elementRef: ElementRef,
    private _ActiveModal: NgbActiveModal,
    private _AppElementRef: ElementRef,
    private _ComFnc: ComFnc,
    private _DialogService: ConfirmationDialogService,
    private _AppParamConfig: AppParamConfig,
    private _WaittingService: ComWaittingService,
    private _FoodService: FoodService
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
    this.ListFoods = [];
    this.BT_FUNC1_NAME = FUNC_BUTTON_TEXT.Close;
    this.BT_FUNC2_NAME = FUNC_BUTTON_TEXT.Refresh;
    this.BT_FUNC3_NAME = '';
    this.F_INIT_WJCOMBOBOX();
    this.F_INIT_GRID();
  }

  private F_INIT_WJCOMBOBOX() {
    this._sprInfoFood.itemsSource = [];
    this._ddlTypeFood.itemsSource = [];
    this._ComFnc.SetWjComboEvent([this._ddlTypeFood]);

    this._ddlTypeFood.selectedIndexChanged.addHandler((e: any) => {
      if (e.isDroppedDown || e.focus) {
        if (this._ddlTypeFood.itemsSource.length === 0) {
          this._ddlTypeFood.text = '';
        } else {
          this._sprInfoFood.itemsSource = [];
        }
      }
    });
  }

  private F_INIT_GRID() {
    this._sprInfoFood.autoGenerateColumns = false;
    this._sprInfoFood.headersVisibility = 1;
    this._sprInfoFood.allowResizing = 0;
    this._sprInfoFood.allowDragging = 0;
    //this._sprInfoFood.allowSorting = false;
    this._sprInfoFood.alternatingRowStep = 0;
    this._sprInfoFood.columnHeaders.rows.defaultSize = 28;
    this._sprInfoFood.rows.defaultSize = 28;
    this._sprInfoFood.keyActionEnter = 3;
    this._sprInfoFood.isReadOnly = true;

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
    this.I_SET_TYPE_FOOD();
    this.I_GET_INFO_FOOD();
  }

  private I_SET_TYPE_FOOD() {
    this._ddlTypeFood.itemsSource = [];
    const _Array = [];
    _Array.push(new DDLItem('0', 'Tất cả'));
    _Array.push(new DDLItem('1', 'Cơm'));
    _Array.push(new DDLItem('2', 'Món khô'));
    _Array.push(new DDLItem('3', 'Món nước'));
    _Array.push(new DDLItem('4', 'Đồ uống'));
    this._ddlTypeFood.itemsSource = _Array;
    this._ddlTypeFood.selectedIndex = 0;
  }

  private I_GET_INFO_FOOD() {
    this._WaittingService.show(this._AppElementRef);
    this.ListFoods = [];
    this._FoodService.getAllFoods()
      .subscribe(
        result => {
          if (result.message === '') {
            const listdta = result.foods;
            this.I_SET_INFO_FOOD(listdta);
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

  private I_SET_INFO_FOOD(data: Food[]) {
    const _Arr: FoodDta[] = [];
    data.forEach(DataInfo => {
      _Arr.push(new FoodDta(String(DataInfo.id), DataInfo.name, DataInfo.group, DataInfo.group, String(DataInfo.price), DataInfo.description ));
    });
    this.ListFoods = _Arr;
  }

  private I_SET_FOOD_FOR_STATUS() {
    if (this._ddlTypeFood.selectedValue === '0') {
      this._sprInfoFood.itemsSource = this.ListFoods;
    } else if (this._ddlTypeFood.selectedValue === '1') {
      this._sprInfoFood.itemsSource = this.ListFoods.filter(e => e.GROUPID === 'Cơm');
    } else if (this._ddlTypeFood.selectedValue === '2') {
      this._sprInfoFood.itemsSource = this.ListFoods.filter(e => e.GROUPID === 'Món khô');
    } else if (this._ddlTypeFood.selectedValue === '3') {
      this._sprInfoFood.itemsSource = this.ListFoods.filter(e => e.GROUPID === 'Món nước');
    } else {
      this._sprInfoFood.itemsSource = this.ListFoods.filter(e => e.GROUPID === 'Đồ uống');
    }
    this.SetCellFocus(0, 0);
  }

  private SetCellFocus(row: number, col: number) {
    this._sprInfoFood.focus();
    this._sprInfoFood.select(new CellRange(row, col), true);
  }

  BT_FUNC1_Click() {
    this._ActiveModal.close(true);
  }

  BT_FUNC2_Click() {
    this.I_SET_FOOD_FOR_STATUS();
  }

  BT_FUNC3_Click() {
  }

  Search() {
    this.I_SET_FOOD_FOR_STATUS();
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

class FoodDta {
  constructor(
    public ID: string = '',
    public NAME: string = '',
    public GROUPID: string = '',
    public GROUPNM: string = '',
    public PRICE: string = '',
    public DESCRIPTION: string = ''
  ) { }
}