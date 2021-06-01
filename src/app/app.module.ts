import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { WebStorageModule } from "ngx-web-storage";
import { FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { SignupComponent } from './Pages/signup/signup.component';
import { ForgotpasswordComponent } from './Pages/forgotpassword/forgotpassword.component';
import { VendorlistComponent } from './Pages/vendorlist/vendorlist.component';
import { AddvendorComponent } from './Pages/addvendor/addvendor.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './Pages/footer/footer.component';
import { HeaderComponent } from './Pages/header/header.component';
import { SidemenuComponent } from './Pages/sidemenu/sidemenu.component';
import { NotificationOrder } from './Pages/notification.order/notification.order';
import { NotificationsComponent } from './Pages/notifications/notifications.component';
import { ProductsComponent } from './Pages/products/products.component';
import { ItemsComponent } from './Pages/items/items.component';
import { ViewvendorprofileComponent } from './Pages/viewvendorprofile/viewvendorprofile.component';
import { ViewvendorordersComponent } from './Pages/viewvendororders/viewvendororders.component';
import { ViewvendorpaymentComponent } from './Pages/viewvendorpayment/viewvendorpayment.component';
import { ViewvendoradditemComponent } from './Pages/viewvendoradditem/viewvendoradditem.component';
import { EditvendorComponent } from './Pages/editvendor/editvendor.component';
import { AddexpComponent } from './Pages/expensive/addexp/addexp.component';
import { AdditemexpComponent } from './Pages/expensive/additemexp/additemexp.component';
import { VendormangerComponent } from './Pages/vendormanger/vendormanger.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MenusettingComponent } from './Pages/menusetting/menusetting.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";

import { ToastrModule } from 'ngx-toastr';
import { NotificationListComponent } from './Pages/notification-list/notification-list.component';
import { TableqrcodeComponent } from './Pages/tableqrcode/tableqrcode.component';
import { CreatemenusettingComponent } from './Pages/createmenusetting/createmenusetting.component';
import { MenulistComponent } from './Pages/menulist/menulist.component';

@NgModule({
  declarations: [
    AppComponent,
    DasboardComponent,
    OrderComponent,
    ExpensesComponent,
    ManageComponent,
    MenuComponent,
    OrderDetailComponent,
    ViewSingleOrderComponent,
    PaymentComponent,
    SinglePaymentComponent,
    LoginpageComponent,
    SignupComponent,
    ForgotpasswordComponent,
    VendorlistComponent,
    AddvendorComponent,
    FooterComponent,
    HeaderComponent,
    SidemenuComponent,
    NotificationsComponent,
    ProductsComponent,
    ItemsComponent,
    ViewvendorprofileComponent,
    ViewvendorordersComponent,
    NotificationOrder,
    ViewvendorpaymentComponent,
    ViewvendoradditemComponent,
    EditvendorComponent,
    AddexpComponent,
    AdditemexpComponent,
    VendormangerComponent,
    MenusettingComponent,
    NotificationListComponent,
    TableqrcodeComponent,
    CreatemenusettingComponent,
    MenulistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularEditorModule,
    NgxQRCodeModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    WebStorageModule.forRoot()
    
  ],

 
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //declarations: [App],
})
export class AppModule { }
