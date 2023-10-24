import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PControlComponent } from './Components/ControlManagerment/PControl/PControl.component';
import { LoginComponent } from './Components/ControlManagerment/Login/Login.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'ControlManagerment/Login', pathMatch: 'full' },
  {
    path: 'ControlManagerment',
    children: [
      { path: 'Login', component: LoginComponent },
      { path: 'Home', component: HomeComponent },
      { path: 'PControl', component: PControlComponent }
    ]
  },
  {
    path: 'CustomersManagerment',
    children: [
      { path: 'RegisterCustomer', component: RegisterCustomerComponent },
      { path: 'UpdateCustomer', component: UpdateCustomerComponent },
      { path: 'ListCustomer', component: ListCustomerComponent },
      { path: 'PayBill', component: PayBillComponent },
    ]
  },
  {
    path: 'RoomsManagerment',
    children: [
      { path: 'BookingRoom', component: BookingRoomComponent },
      { path: 'ListRoom', component: ListRoomComponent }
    ]
  },
  {
    path: 'ServicesManagerment',
    children: [
      { path: 'BookingFood', component: BookingFoodComponent },
      { path: 'ListFood', component: ListFoodComponent },
      { path: 'CreatFood', component: CreatFoodComponent },
      { path: 'BookingServices', component: BookingServicesComponent },
      { path: 'RevenueStatistics', component: RevenueStatisticsComponent },
      { path: 'RestaurantRevenue', component: RestaurantRevenueComponent },
    ]
  },
  {
    path: 'UsersManagerment',
    children: [
      { path: 'UpdateUser', component: UpdateUserComponent },
      { path: 'ChangePassword', component: ChangePasswordComponent },
      { path: 'CreateUser', component: CreateUserComponent },
      { path: 'ListUser', component: ListUserComponent },
    ]
  },
  { path: '**', redirectTo: 'ControlManagerment/Error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const AppRouterProviders = [RouterModule.forRoot(routes)];
