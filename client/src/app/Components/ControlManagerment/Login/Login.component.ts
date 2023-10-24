import { Component, OnInit, AfterViewInit, ElementRef, Injector, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ConfirmationDialogService } from '../../../Common/confirmation-dialog/confirmation-dialog.service';
import { ComFnc } from '../../../Common/com-fnc/com-fnc.service'
import { AppParamConfig } from '../../../app.paramconfig'
import { WebApi } from '../../../Common/web-api-action'
import { AuthService } from 'src/app/Service/auth.service';
import { ToastComponent } from 'src/app/Common/toast/toast.component';
import { FoodService } from 'src/app/Service/food.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  private readonly _PageTitle = 'PAGE LOGIN';
  private readonly _ProgramUrl = 'ControlManagerment/Login';
  public readonly GamenId = 'Login';

  private _txtUser: any;
  private _txtPassWord: any;
  private _btnLogin: any;

  public userInfo: UserInfo;
  public isLogin: boolean;
  public errorMessage: string;

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
    private authService: AuthService,
    //Dialog
    //Waiting
    private _AppParamConfig: AppParamConfig,
    public toast: ToastComponent
    //_RZZService
  ) {
    this._AppElementRef = this._Injector.get(this._ApplicationRef.componentTypes[0])._ElementRef;
    this._TitleService.setTitle(this._PageTitle);
  }

  ngOnInit() {
    // if (this.authService.loggedIn) {
    //   const param = ['MAIN', '1'];
    //   this._AppParamConfig.paramMap.set(this._ProgramUrl, param);
    //   this._AppParamConfig.isSignIn = true;
    //   this._ComFnc.CallPControl(this._ProgramUrl, 'ControlManagerment/Home', param, this._AppParamConfig);
    // }

    this.errorMessage = "";
    this._AppParamConfig.pageTitle = this._PageTitle;
    this.userInfo = { userName: this._AppParamConfig.userId, password: '' };
    this.isLogin = false;
    this._txtUser = this._ElementRef.nativeElement.querySelector('#usr');
    this._txtPassWord = this._ElementRef.nativeElement.querySelector('#pwd');
    this._txtUser.focus();
    if (String(this._AppParamConfig.userId) !== '') {
      this._txtPassWord.focus();
    }
  }

  ngAfterViewInit() { }

  onUserKeyDownEnter() {
    this._txtPassWord.focus();
  }

  onPassKeyDownEnter() {
    this._btnLogin = this._ElementRef.nativeElement.querySelector('#btnLogin');
    this._btnLogin.focus();
  }

  onLoginClick() {
    if (!this.CheckInput()) {
      this.authService.login(
        this.userInfo.userName,
        this.userInfo.password
      ).subscribe(
        res => {
          const param = ['MAIN', '1'];
          this._AppParamConfig.paramMap.set(this._ProgramUrl, param);
          this._AppParamConfig.userId = this.userInfo.userName;
          this._AppParamConfig.userNm = this.authService.currentStaff.fullName;
          this._AppParamConfig.userpass = this.userInfo.password;
          if (this.authService.isManager) {
            this._AppParamConfig.permission = '0';
          } else if (this.authService.isReceptionist) {
            this._AppParamConfig.permission = '1';
          } else {
            this._AppParamConfig.permission = '2'
          }
          this._AppParamConfig.isSignIn = true;
          this._ComFnc.CallPControl(this._ProgramUrl, 'ControlManagerment/Home', param, this._AppParamConfig);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  private CheckInput(): boolean {
    if (this.userInfo.userName === '') {
      this._DialogService.showError('Vui lòng nhập Tên đăng nhập', 'Tên Đăng Nhập', true)
        .finally(() => {
          this._txtUser.focus();
        });
      return true;
    }

    if (this.userInfo.password === '') {
      this._DialogService.showError('Vui lòng nhập mật khẩu', 'Mật Khẩu', true)
        .finally(() => {
          this._txtPassWord.focus();
        });
      return true;
    }

    return false;
  }
}

class UserInfo {
  userName: string;
  password: string;
}