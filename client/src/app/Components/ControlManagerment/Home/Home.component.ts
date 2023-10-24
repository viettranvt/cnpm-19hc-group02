import { Component, OnInit, Injector, ApplicationRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { WebApi } from 'src/app/Common/web-api-action';
import { ComFnc } from 'src/app/Common/com-fnc/com-fnc.service';
import { ConfirmationDialogService } from 'src/app/Common/confirmation-dialog/confirmation-dialog.service';
import { AppParamConfig } from 'src/app/app.paramconfig';
import { PControlService } from 'src/app/Components/ControlManagerment/PControl/PControl.service';
import { PageType, ApplicationParam } from 'src/app/Common/web-api-parameter';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly _PageTitle = 'PAGE HOME';
  private readonly _ProgramUrl = 'ControlManagerment/Home';
  public readonly GamenId = 'Home';
  PARAM_ARRAY: string[];
  APP_PARAM: ApplicationParam;
  LISTBUTTON: ListButton;

  constructor(
    private _Router: Router,
    private _TitleService: Title,
    private _Injector: Injector,
    private _ApplicationRef: ApplicationRef,
    private _AppElementRef: ElementRef,
    private _ElementRef: ElementRef,
    private _WebAPI: WebApi,
    private _ComFnc: ComFnc,
    private _DialogService: ConfirmationDialogService,
    private _PControlService: PControlService,
    private authService: AuthService,
    private _AppParamConfig: AppParamConfig
  ) {
    this._AppElementRef = this._Injector.get(this._ApplicationRef.componentTypes[0])._ElementRef;
    this._TitleService.setTitle(this._PageTitle);
  }

  ngOnInit(): void {
    this.I_INIT_DATA();
    this.SET_CONTROL_BUTTON();
  }

  private I_INIT_DATA() {
    this.PARAM_ARRAY = this._AppParamConfig.paramMap.get(this._ProgramUrl);
    this.APP_PARAM = new ApplicationParam();
    this.APP_PARAM.AppElementRef = this._AppElementRef;
    this.APP_PARAM.AppParamConfig = this._AppParamConfig;
    this.APP_PARAM.ApplicationRef = this._ApplicationRef;
    this.APP_PARAM.Injector = this._Injector;
    this._AppParamConfig.paramMap.set(this._ProgramUrl, this.PARAM_ARRAY);
  }

  private SET_CONTROL_BUTTON() {
    this.LISTBUTTON = new ListButton();
    if (this._AppParamConfig.permission === '0') {
      this.LISTBUTTON.RevenueStatistics = true;
      this.LISTBUTTON.RestaurantRevenue = true;
    } else if (this._AppParamConfig.permission === '1') {
      this.LISTBUTTON.UpdateUser = false;
    } else {
      this.LISTBUTTON.BookingRoom = false;
      this.LISTBUTTON.BookingServices = false;
      this.LISTBUTTON.ChangePassword = false;
      this.LISTBUTTON.PayBill = false;
      this.LISTBUTTON.RegisterCustomer = false;
      this.LISTBUTTON.UpdateCustomer = false;
      this.LISTBUTTON.UpdateUser = false;
    }
  }

  LogOut() {
    this.authService.logout();
    this._ComFnc.CallPControl(this._ProgramUrl, '', this.PARAM_ARRAY, this._AppParamConfig);
  }
  //QLKH
  GotoRegisterCustomer() {
    this._PControlService.ShowDialogPCtrl('RegisterCustomer', this.PARAM_ARRAY, this.APP_PARAM);
  }

  GotoEditCustomer() {
    this._PControlService.ShowDialogPCtrl('UpdateCustomer', this.PARAM_ARRAY, this.APP_PARAM);
  }

  GotoInfoCustomer() {
    this._PControlService.ShowDialogPCtrl('ListCustomer', this.PARAM_ARRAY, this.APP_PARAM);
  }

  GotoPayBill() {
    this._PControlService.ShowDialogPCtrl('PayBill', this.PARAM_ARRAY, this.APP_PARAM);
  }

  //QLPH
  GotoBookingRoom() {
    this._PControlService.ShowDialogPCtrl('BookingRoom', this.PARAM_ARRAY, this.APP_PARAM);
  }

  GotoListRooms() {
    this._PControlService.ShowDialogPCtrl('ListRoom', this.PARAM_ARRAY, this.APP_PARAM);
  }

  //QLDV
  GotoBookingFoods() {
    this._PControlService.ShowDialogPCtrl('BookingFood', this.PARAM_ARRAY, this.APP_PARAM);
  }

  GotoListFoods() {
    this._PControlService.ShowDialogPCtrl('ListFood', this.PARAM_ARRAY, this.APP_PARAM);
  }

  GotoBookingServices() {
    this._PControlService.ShowDialogPCtrl('BookingServices', this.PARAM_ARRAY, this.APP_PARAM);
  }

  //QLCN
  // GotoBookingFoods() {
  //   this._PControlService.ShowDialogPCtrl('UpdateUser', this.PARAM_ARRAY, this.APP_PARAM);
  // }

  GotoUpdateInfoUser() {
    this._PControlService.ShowDialogPCtrl('UpdateUser', this.PARAM_ARRAY, this.APP_PARAM);
  }

  GotoChangePassWrd() {
    this._PControlService.ShowDialogPCtrl('ChangePassword', this.PARAM_ARRAY, this.APP_PARAM);
  }

  GotoRevenueStatistics() {
    this._PControlService.ShowDialogPCtrl('RevenueStatistics', this.PARAM_ARRAY, this.APP_PARAM);
  }

  GotoRestaurantRevenue() {
    this._PControlService.ShowDialogPCtrl('RestaurantRevenue', this.PARAM_ARRAY, this.APP_PARAM);
  }
}

class ListButton {
  constructor(
    public RegisterCustomer: boolean = true,
    public UpdateCustomer: boolean = true,
    public ListCustomer: boolean = true,
    public PayBill: boolean = true,
    public BookingRoom: boolean = true,
    public ListRoom: boolean = true,
    public BookingFood: boolean = true,
    public ListFood: boolean = true,
    public BookingServices: boolean = true,
    public UpdateUser: boolean = true,
    public ChangePassword: boolean = true,
    public RevenueStatistics: boolean = false,
    public RestaurantRevenue: boolean = false
  ) { }
}