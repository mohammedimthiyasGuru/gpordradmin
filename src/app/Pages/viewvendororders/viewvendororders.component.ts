import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";

@Component({
  selector: 'app-viewvendororders',
  templateUrl: './viewvendororders.component.html',
  styleUrls: ['./viewvendororders.component.css']
})
export class ViewvendorordersComponent implements OnInit {

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
    this.vendor_details = this.storage.local.get('vendor_details');

    console.log(this.vendor_details);
     let a = {
       _id : this.vendor_details._id
     }

    this._api.orders_list_byid(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        this.orderlist = response.Data;
        console.log(this.orderlist);
      }
    );

  }


  openorders(data){
    this.storage.local.set('order_details',data);
    this.router.navigateByUrl('/ordr/view_signle_order');
  }

}
