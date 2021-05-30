import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  total_amount : number = 0;
  orderlist : any;
  vendor_details : any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: WebStorageService,
    private _api: ApiService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("Notificaiont");
    this.vendor_details = this.storage.local.get('vendor_details');
    console.log(this.vendor_details);
      let c = {
      "vendor_id": this.vendor_details._id
      }
     console.log("Notifiaontssdfdf",c);
     this._api.all_notification(c).subscribe(
      (response: any) => {
        console.log(response.Data);
        this.orderlist = response.Data.notification_list;
        console.log(this.orderlist);
        this.total_amount = response.Data.notification_list;
        for(let a = 0 ; a < this.orderlist.length ; a ++){
          this.total_amount = response.Data.notification_code;
        }
      }
    );
  }


  openorders(data){


   console.log(data.title);
   var booking_id = data.title.split(" ");
   console.log(booking_id[booking_id.length - 1]);
    let c = {
    "Booking_id": booking_id[booking_id.length - 1]
    }
  //  console.log("Notifiaontssdfdf",c);
   this._api.ordr_by_ordrid(c).subscribe(
    (response: any) => {
    console.log(response.Data);
    this.storage.local.set('order_details',response.Data);
    this.router.navigateByUrl('/ordr/view_signle_order');
    }
  );





  }

}
