import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebStorageService } from "ngx-web-storage";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  vendor_details : any;
  notification_list:any;

  shop_logo : any = "http://54.212.108.156:3000/api/uploads/1615198599057.jpeg";
  shop_name : any = '';
  show_visible : boolean = false;

  constructor(
    private storage: WebStorageService,
    private _api: ApiService,

  ) { }

  ngOnInit() {
    this.vendor_details = this.storage.local.get('vendor_details');

    let login_status = this.storage.local.get('login_status');
    if(login_status == null){
      this.show_visible = false;
    }else{
      this.show_visible = true;
      this.notificationlist(this.vendor_details._id);
      this.notificationupdate(1);
    }




  }

 notificationlist(datas){
   let c = {
    "vendor_id": datas
}
    this._api.notification_list(c).subscribe(
      (response: any) => {
        this.notification_list  = response.Data.notification_list;
        // this.vendor_details = this.storage.local.get('vendor_details');
        this.shop_logo = this.vendor_details.shop_logo;
        this.shop_name = this.vendor_details.shop_name;
      }
      );
  }
  notificationupdate(id) {
    this._api.notification_update(id);
    }


}
