import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";

@Component({
  selector: 'app-tableqrcode',
  templateUrl: './tableqrcode.component.html',
  styleUrls: ['./tableqrcode.component.css']
})
export class TableqrcodeComponent implements OnInit {

  orderlist : any;

  timeLeft: number = 15;
  interval;
  vendor_details : any;
  table_name  :number = 0;
  guillaumeNery = 'http://ordr.macinc.in/#/home/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: WebStorageService,
    private _api: ApiService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.table_name = 0;
    this.vendor_details = this.storage.local.get('vendor_details');
    console.log(this.vendor_details);
    let a = {
      vendor_id : this.vendor_details._id,
    }
    this._api.table_details_list(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        this.orderlist = response.Data;
        console.log(this.orderlist);
      }
    );


    clearInterval(this.interval);

  }


  openorders(data){
    this.storage.local.set('order_details',data);
    this.router.navigateByUrl('/ordr/view_signle_order');
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
}

  createtable(){
    this.vendor_details = this.storage.local.get('vendor_details');
    let c =  {
      vendor_id : this.vendor_details._id,
      table_name : this.table_name,
      table_link : 'http://ordr.macinc.in/#/home/'+ this.vendor_details.shop_link_name+'_'+this.table_name,
      Date_of_create : new Date(),
      Status : true
    }
    this._api.table_details_create(c).subscribe(
      (response: any) => {
        console.log(response.Data);
        alert(response.Message);
        this.ngOnInit();
      }
    );
  }

  delete(id){
    let c =  {
      _id : id
    }
    this._api.table_details_delete(c).subscribe(
      (response: any) => {
        console.log(response.Data);
        alert(response.Message);
        this.ngOnInit();
      }
    );
  }

}
