import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  constructor(private http: HttpClient) { }




  forgotpassword(data){
    return this.http.post(this.apiUrl + 'vendordetails/forgotpassword', data);
  }

  createusers(data) {
    return this.http.post(this.apiUrl + 'userdetails/create', data);
  }

  fetchres_details(data) {
    return this.http.post(this.apiUrl + 'vendordetails/getting_shop_name', data);
  }


  user_list() {
    return this.http.get(this.apiUrl + 'userdetails/getlist');
  }

  orders_list() {
    return this.http.get(this.apiUrl + 'orderdetails/getlist');
  }


  orders_list_byid(data) {
    return this.http.post(this.apiUrl + 'orderdetails/getlist_id',data);
  }


  orders_update(data) {
    return this.http.post(this.apiUrl + 'orderdetails/edit', data);
  }

  expensive_update(data) {
    return this.http.post(this.apiUrl + 'expensivemng/update/expensive', data);
  }


  user_delete(id) {
    return this.http.post(this.apiUrl + 'userdetails/delete', id);
  }

  vendor_create(data) {
    return this.http.post(this.apiUrl + 'vendordetails/create', data);
  }

  vendor_edit(data) {
    return this.http.post(this.apiUrl + 'vendordetails/edit', data);
  }

  vendor_delete(data){
    return this.http.post(this.apiUrl + 'vendordetails/delete', data);
  }

  item_create(data) {
    return this.http.post(this.apiUrl + 'productitems/create', data);
  }

  item_edit(data) {
    return this.http.post(this.apiUrl + 'productitems/edit', data);
  }

  item_delete(data) {
    return this.http.post(this.apiUrl + 'productitems/delete', data);
  }

  cate_create (data){
    return this.http.post(this.apiUrl + 'productcatagories/create', data);
  }

  cate_edit (data){
    return this.http.post(this.apiUrl + 'productcatagories/edit', data);
  }

  cate_delete (data){
    return this.http.post(this.apiUrl + 'productcatagories/delete', data);
  }


  banner_create (data){
    return this.http.post(this.apiUrl + 'bannerdetails/create', data);
  }

  banner_edit (data){
    return this.http.post(this.apiUrl + 'bannerdetails/edit', data);
  }

  banner_delete (data){
    return this.http.post(this.apiUrl + 'bannerdetails/delete', data);
  }


  vendor_list() {
    return this.http.get(this.apiUrl + 'vendordetails/getlist');
  }


  fetch_vendor_cat (data){
    return this.http.post(this.apiUrl + 'productcatagories/getlist_id', data);
  }


  fetch_vendor_banner (data){
    return this.http.post(this.apiUrl + 'bannerdetails/getlist_id', data);
  }


  banner_list(data) {
    return this.http.post(this.apiUrl + 'bannerdetails/register', data);
  }


  catagories_list(data) {
    return this.http.post(this.apiUrl + 'productcatagories/register', data);
  }


  fetch_items_list (data){
    return this.http.post(this.apiUrl + 'productitems/getlist_id', data);
  }



  items_list(data) {
    return this.http.post(this.apiUrl + 'productitems/register', data);
  }


  expensive_create(data){

      return this.http.post(this.apiUrl + 'expensivemng/create', data);

  }


  expensive_list(data){
    return this.http.post(this.apiUrl + 'expensivemng/getlist_id', data);

}

expensive_delete(data){
  return this.http.post(this.apiUrl + 'expensivemng/delete', data);

}

expensive_edit(data){
  return this.http.post(this.apiUrl + 'expensivemng/edit', data);
}




manager_list_byid(data) {
  return this.http.post(this.apiUrl + 'manager/getlist_id',data);
}

manager_delete_byid(data) {
  return this.http.post(this.apiUrl + 'manager/delete',data);
}

manager_create(data) {
  return this.http.post(this.apiUrl + 'manager/create', data);
}

manager_edit(data) {
  return this.http.post(this.apiUrl + 'manager/edit_customer_id', data);
}


requested_list_id(data){
  return this.http.post(this.apiUrl + 'managerdata/getlist_id', data);
}


requested_delete_id(data){
  return this.http.post(this.apiUrl + 'managerdata/delete', data);
}


requested_edit_id(data) {
  return this.http.post(this.apiUrl + 'managerdata/edit_customer_id', data);
}


fetch_menu_setting(data){
  return this.http.post(this.apiUrl + 'productitems/getlist_id_menusetting', data);
}



update_date_time(data){
  return this.http.post(this.apiUrl + 'productitems/update_time_date_time', data);
}

all_notification(data) {
  return this.http.post(this.apiUrl + 'ordr_notification/get_all_notification',data);
}



notification_list(data) {
  return this.http.post(this.apiUrl + 'ordr_notification/get_notification', data);
}



notification_update(data) {
  return this.http.post(this.apiUrl + 'ordr_notification/update_notification_status', data);
}


ordr_by_ordrid(data) {
  return this.http.post(this.apiUrl + 'orderdetails/getlist_id', data);
}


table_details_create(id) {
  return this.http.post(this.apiUrl + 'ordr_table_details/create', id);
}

table_details_list(id) {
  return this.http.post(this.apiUrl + 'ordr_table_details/getlist_id', id);
}

table_details_delete(id) {
  return this.http.post(this.apiUrl + 'ordr_table_details/delete', id);
}

}

