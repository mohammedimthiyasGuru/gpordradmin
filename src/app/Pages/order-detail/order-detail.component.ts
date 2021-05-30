import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderlist : any;

  timeLeft: number = 15;
  interval;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: WebStorageService,
    private _api: ApiService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._api.orders_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.orderlist = response.Data;
        console.log(this.orderlist);
      }
    );


    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        console.log('Sec');
      } else {
        this.timeLeft = 15;
        this._api.orders_list().subscribe(
          (response: any) => {
            console.log(response.Data);
            this.orderlist = response.Data;
            console.log(this.orderlist);
          }
        );
      }
    },10000);
  }


  openorders(data){
    this.storage.local.set('order_details',data);
    this.router.navigateByUrl('/ordr/view_signle_order');
  }

}
