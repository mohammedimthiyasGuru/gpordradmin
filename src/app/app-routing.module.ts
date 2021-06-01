import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DasboardComponent } from './Pages/dasboard/dasboard.component';
import { OrderComponent } from './Pages/order/order.component';
import { ExpensesComponent } from './Pages/expenses/expenses.component';
import { ManageComponent } from './Pages/manage/manage.component';
import { MenuComponent } from './Pages/menu/menu.component';
import { OrderDetailComponent } from './Pages/order-detail/order-detail.component';
import { ViewSingleOrderComponent } from './Pages/view-single-order/view-single-order.component';
import { PaymentComponent } from './Pages/payment/payment.component';
import { SinglePaymentComponent } from './Pages/single-payment/single-payment.component';
import { LoginpageComponent } from './Pages/loginpage/loginpage.component';
import { ForgotpasswordComponent } from './Pages/forgotpassword/forgotpassword.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { AddvendorComponent } from './Pages/addvendor/addvendor.component';
import { VendorlistComponent } from './Pages/vendorlist/vendorlist.component';
import { ProductsComponent } from './Pages/products/products.component';
import { ItemsComponent } from './Pages/items/items.component';
import { ViewvendorprofileComponent } from './Pages/viewvendorprofile/viewvendorprofile.component';
import { ViewvendorordersComponent } from './Pages/viewvendororders/viewvendororders.component';
import { ViewvendorpaymentComponent } from './Pages/viewvendorpayment/viewvendorpayment.component';
import { ViewvendoradditemComponent } from './Pages/viewvendoradditem/viewvendoradditem.component';
import { EditvendorComponent } from './Pages/editvendor/editvendor.component';
import { NotificationOrder } from './Pages/notification.order/notification.order';

import { AddexpComponent } from './Pages/expensive/addexp/addexp.component';
import { AdditemexpComponent } from './Pages/expensive/additemexp/additemexp.component';
import { VendormangerComponent } from './Pages/vendormanger/vendormanger.component';
import { MenusettingComponent } from './Pages/menusetting/menusetting.component';
import * as moment from 'moment';
import { NotificationListComponent } from './Pages/notification-list/notification-list.component';
import { TableqrcodeComponent } from './Pages/tableqrcode/tableqrcode.component';
import { CreatemenusettingComponent } from './Pages/createmenusetting/createmenusetting.component';
import { MenulistComponent } from './Pages/menulist/menulist.component';

const routes: Routes = [
  {path: '', component: LoginpageComponent},
  {path: 'ordr/Dashboard', component: DasboardComponent},
  {path: 'ordr/orderKitchen', component: OrderComponent},
  {path: 'ordr/expenses', component: ExpensesComponent},
  {path: 'ordr/manage', component: ManageComponent},
  {path: 'ordr/menu', component: MenuComponent},
  {path: 'ordr/order_list', component: OrderDetailComponent},
  {path: 'ordr/view_signle_order', component: ViewSingleOrderComponent},
  {path: 'ordr/payment', component: PaymentComponent},
  {path: 'ordr/single_payment', component: SinglePaymentComponent},
  {path: 'login/:id', component: LoginpageComponent},
  {path: 'ordr/signup', component: SignupComponent},
  {path: 'ordr/forgotpassword', component: ForgotpasswordComponent},
  {path: 'ordr/addvendors', component: AddvendorComponent},
  {path: 'ordr/editvendors', component: EditvendorComponent},
  {path: 'ordr/vendorlist', component: VendorlistComponent},
  {path: 'ordr/productadd/:id', component: ProductsComponent},
  {path: 'ordr/items/:id', component: ItemsComponent},


  {path: 'ordr/vendor/additems', component: ViewvendoradditemComponent},
  {path: 'ordr/vendor/profile', component: ViewvendorprofileComponent},
  {path: 'ordr/vendor/orderlist', component: ViewvendorordersComponent},
  {path: 'ordr/vendor/paymentlist', component: ViewvendorpaymentComponent},
  {path: 'ordr/notificationorder', component: NotificationListComponent},



  {path: 'ordr/vendor/exp/addexp/:id', component: AddexpComponent},
  {path: 'ordr/vendor/items/additemexp', component: AdditemexpComponent},

  {path: 'ordr/vendor/managers', component: VendormangerComponent},

  {path: 'ordr/vendor/menusetting', component: MenusettingComponent},

  {path: 'ordr/vendor/tableqr', component: TableqrcodeComponent},

  {path: 'ordr/vendor/addmenu', component: CreatemenusettingComponent},
  {path: 'ordr/vendor/menulist', component: MenulistComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
