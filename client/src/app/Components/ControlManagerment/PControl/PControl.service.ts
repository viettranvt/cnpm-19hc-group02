import { Injectable, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PageType, ApplicationParam } from 'src/app/Common/web-api-parameter';
//import PageNotFound
//Component Quản lý khách hàng
import { RegisterCustomerComponent } from '../../CustomersManagerment/RegisterCustomer/RegisterCustomer.component';
import { UpdateCustomerComponent } from '../../CustomersManagerment/UpdateCustomer/UpdateCustomer.component';
import { ListCustomerComponent } from '../../CustomersManagerment/ListCustomer/ListCustomer.component';
import { PayBillComponent } from '../../CustomersManagerment/PayBill/PayBill.component';
//Component Quản lý phòng
import { BookingRoomComponent } from '../../RoomsManagerment/BookingRoom/BookingRoom.component';
import { ListRoomComponent } from '../../RoomsManagerment/ListRoom/ListRoom.component';
//Component Quản lý dịch vụ
import { BookingFoodComponent } from '../../ServicesManagerment/BookingFood/BookingFood.component';
import { ListFoodComponent } from '../../ServicesManagerment/ListFood/ListFood.component';
import { CreatFoodComponent } from '../../ServicesManagerment/CreatFood/CreatFood.component';
import { BookingServicesComponent } from '../../ServicesManagerment/BookingServices/BookingServices.component';
//Component Quản lý cá nhân
import { UpdateUserComponent } from '../../UsersManagerment/UpdateUser/UpdateUser.component';
import { ChangePasswordComponent } from '../../UsersManagerment/ChangePassword/ChangePassword.component';
import { CreateUserComponent } from '../../UsersManagerment/CreateUser/CreateUser.component';
import { ListUserComponent } from '../../UsersManagerment/ListUser/ListUser.component';
//Component Thống kê doanh thu
import { RevenueStatisticsComponent } from '../../ServicesManagerment/RevenueStatistics/RevenueStatistics.component';
//Component Thống kê doanh thu nhà hàng
import { RestaurantRevenueComponent } from '../../ServicesManagerment/RestaurantRevenue/RestaurantRevenue.component';

@Injectable()

export class PControlService {
  constructor(
    private _modalService: NgbModal,
    private _Resolver: ComponentFactoryResolver
  ) { }

  GetComponent(pageId) {
    switch (pageId) {
      case 'RegisterCustomer':
        return RegisterCustomerComponent;
      case 'UpdateCustomer':
        return UpdateCustomerComponent;
      case 'ListCustomer':
        return ListCustomerComponent;
      case 'PayBill':
        return PayBillComponent;
      case 'BookingRoom':
        return BookingRoomComponent;
      case 'ListRoom':
        return ListRoomComponent;
      case 'BookingFood':
        return BookingFoodComponent;
      case 'ListFood':
        return ListFoodComponent;
      case 'CreatFood':
        return CreatFoodComponent;
      case 'BookingServices':
        return BookingServicesComponent;
      case 'RevenueStatistics':
        return RevenueStatisticsComponent;
      case 'RestaurantRevenue':
        return RestaurantRevenueComponent;  
      case 'UpdateUser':
        return UpdateUserComponent;
      case 'ChangePassword':
        return ChangePasswordComponent;
      case 'CreateUser':
        return CreateUserComponent;
      case 'ListUser':
        return ListUserComponent;
      default:
        return null;
    }
  }

  ShowDialogPCtrl(
    pageId: string,
    paramInput: string[],
    appParam: ApplicationParam,
    dialogWidth: 'default' | '900' | '850' | '800' | '750' | '700' | '650' | '600' = 'default'
  ): Promise<true> {
    let modalRef: NgbModalRef;
    modalRef = this._modalService.open(
      this._Resolver.resolveComponentFactory(this.GetComponent(pageId)).componentType,
      {
        backdrop: 'static', keyboard: false,
        windowClass: 'esc-dialog esc-modal-' + dialogWidth,
        backdropClass: 'esc-modal-backdrop'
      }
    );
    const mParam = [];
    if (paramInput) {
      if (paramInput.length <= 0 ||
        (paramInput[0].toUpperCase() !== PageType.MAIN
          && paramInput[0].toUpperCase() !== PageType.SUB)) {
        mParam.push(PageType.SUB);
      }
      paramInput.forEach(item => {
        mParam.push(item);
      });
    }
    modalRef.componentInstance.PARAM_ARRAY = mParam;
    modalRef.componentInstance.APP_PARAM = appParam;

    return modalRef.result;
  }

  // ShowDialogPCtrl(
  //   pageId: string,
  //   paramInput: string[],
  //   appParam: ApplicationParam,
  //   dialogWidth: 'default' | '900' | '850' | '800' | '750' | '700' | '650' | '600' = 'default'
  // ): Promise<true> {
  //   if (pageId.lastIndexOf('Component') < 0) {
  //     pageId = pageId + 'Component';
  //   }
  //   let modalRef: NgbModalRef;
  //   modalRef = this._modalService.open(
  //     this.GetFactoryComponent(pageId).componentType,
  //     {
  //       backdrop: 'static', keyboard: false,
  //       windowClass: 'esc-dialog esc-modal-' + dialogWidth,
  //       backdropClass: 'esc-modal-backdrop'
  //     }
  //   );
  //   const mParam = [];
  //   if (paramInput) {
  //     if (paramInput.length <= 0 ||
  //       (paramInput[0].toUpperCase() !== PageType.MAIN
  //         && paramInput[0].toUpperCase() !== PageType.SUB)) {
  //       mParam.push(PageType.SUB);
  //     }
  //     paramInput.forEach(item => {
  //       mParam.push(item);
  //     });
  //   }
  //   modalRef.componentInstance.PARAM_ARRAY = mParam;
  //   modalRef.componentInstance.APP_PARAM = appParam;

  //   return modalRef.result;
  // }

  // private GetFactoryComponent(componentName: string): ComponentFactory<any> {

  //   const factories = Array.from(this._Resolver['_factories'].keys());
  //   const factoryClass = <Type<any>>factories.find((x: any) => x.name === componentName);

  //   if (factoryClass) {
  //     return this._Resolver.resolveComponentFactory(factoryClass);
  //   } else {
  //     //return this._Resolver.resolveComponentFactory('RZZPageNotFoundComponent');
  //   }
  //   return this._Resolver.resolveComponentFactory(RegisterCustomerComponent);
  // }
}