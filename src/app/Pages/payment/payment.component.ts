import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total_amount : number = 0;
  orderlist : any;

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

        for(let a = 0 ; a < this.orderlist.length ; a ++){
          this.total_amount = +this.total_amount + this.orderlist[a].Total_amount;
        }
      }
    );

  }


  openorders(data){
    this.storage.local.set('order_details',data);
    this.router.navigateByUrl('/ordr/view_signle_order');
  }

}
