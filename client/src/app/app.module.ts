import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, APP_BASE_HREF, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridMultirowModule } from '@grapecity/wijmo.angular2.grid.multirow';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjViewerModule } from '@grapecity/wijmo.angular2.viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WjNavModule } from '@grapecity/wijmo.angular2.nav';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRouterProviders, AppRoutingModule } from './app-routing.module';
import { AppParamConfig } from './app.paramconfig';
import { AppComponent } from './app.component';

//Common - Components
import { ComHeaderComponent } from './Common/com-header/com-header.component';
import { ComFooterComponent } from './Common/com-footer/com-footer.component';
import { ComWaittingComponent } from './Common/com-waitting/com-waitting.component';
import { ConfirmationDialogComponent } from './Common/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './Common/confirmation-dialog/confirmation-dialog.service';
import { ComFncComponent } from './Common/com-fnc/com-fnc.component';
import { PControlComponent } from './Components/ControlManagerment/PControl/PControl.component';
import { PControlService } from './Components/ControlManagerment/PControl/PControl.service';
import { WebApi } from './Common/web-api-action';
//service
import { StaffService } from './Service/staff.service';
import { AuthService } from './Service/auth.service';
import { ToastComponent } from './Common/toast/toast.component';
import { RoomService } from './Service/room.service';
//Component Login
import { LoginComponent } from './Components/ControlManagerment/Login/Login.component';
//Component Menu
import { HomeComponent } from './Components/ControlManagerment/Home/Home.component';
//Component Quản lý khách hàng
import { RegisterCustomerComponent } from './Components/CustomersManagerment/RegisterCustomer/RegisterCustomer.component';
import { UpdateCustomerComponent } from './Components/CustomersManagerment/UpdateCustomer/UpdateCustomer.component';
import { ListCustomerComponent } from './Components/CustomersManagerment/ListCustomer/ListCustomer.component';
import { PayBillComponent } from './Components/CustomersManagerment/PayBill/PayBill.component';
//Component Quản lý phòng
import { BookingRoomComponent } from './Components/RoomsManagerment/BookingRoom/BookingRoom.component';
import { ListRoomComponent } from './Components/RoomsManagerment/ListRoom/ListRoom.component';
//Component Quản lý dịch vụ
import { BookingFoodComponent } from './Components/ServicesManagerment/BookingFood/BookingFood.component';
import { ListFoodComponent } from './Components/ServicesManagerment/ListFood/ListFood.component';
import { CreatFoodComponent } from './Components/ServicesManagerment/CreatFood/CreatFood.component';
import { BookingServicesComponent } from './Components/ServicesManagerment/BookingServices/BookingServices.component';
//Component Quản lý cá nhân
import { UpdateUserComponent } from './Components/UsersManagerment/UpdateUser/UpdateUser.component';
import { ChangePasswordComponent } from './Components/UsersManagerment/ChangePassword/ChangePassword.component';
import { CreateUserComponent } from './Components/UsersManagerment/CreateUser/CreateUser.component';
import { ListUserComponent } from './Components/UsersManagerment/ListUser/ListUser.component';
//Component Thống kê doanh thu
import { RevenueStatisticsComponent } from './Components/ServicesManagerment/RevenueStatistics/RevenueStatistics.component';
//Component Thống kê doanh thu nhà hàng
import { RestaurantRevenueComponent } from './Components/ServicesManagerment/RestaurantRevenue/RestaurantRevenue.component';

//Services call api
import { FoodService } from './Service/food.service';
import { UserService } from './Service/user.service';
import { BookingService } from './Service/booking.service';
import { RoomServiceService } from './Service/room_service.service';
import { PermissionService } from './Service/permission.service';
import { RoomTypeService } from './Service/room_type.service';
import { OrderFoodService } from './Service/order_food.service';
import { PaymentService } from './Service/payment.service';
import { ReportsService } from './Service/report.service';
import { ExternalOrderFoodService } from './Service/external_order_food.service';

@NgModule({
  declarations: [
    AppComponent,
    ComHeaderComponent,
    ComFooterComponent,
    ComWaittingComponent,
    ConfirmationDialogComponent,
    ComFncComponent,
    PControlComponent,
    ToastComponent,
    //Login
    LoginComponent,
    //Menu
    HomeComponent,
    //QLKH
    RegisterCustomerComponent,
    UpdateCustomerComponent,
    ListCustomerComponent,
    PayBillComponent,
    //QLPH
    BookingRoomComponent,
    ListRoomComponent,
    //QLDV
    BookingFoodComponent,
    ListFoodComponent,
    CreatFoodComponent,
    BookingServicesComponent,
    //QLCN
    UpdateUserComponent,
    ChangePasswordComponent,
    CreateUserComponent,
    ListUserComponent,
    //QL Doanh thu
    RevenueStatisticsComponent,
    RestaurantRevenueComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    CdkTreeModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    AppRouterProviders,
    AppRoutingModule,
    HttpClientModule,
    WjGridModule,
    WjGridMultirowModule,
    WjInputModule,
    WjViewerModule,
    BrowserAnimationsModule,
    WjNavModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Title,
    WebApi,
    AppParamConfig,
    DatePipe,
    ConfirmationDialogService,
    PControlService,
    StaffService,
    AuthService,
    RoomService,
    FoodService,
    UserService,
    BookingService,
    RoomServiceService,
    PermissionService,
    RoomTypeService,
    OrderFoodService,
    PaymentService,
    ToastComponent, 
    ReportsService,
    ExternalOrderFoodService,
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
