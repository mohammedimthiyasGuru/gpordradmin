import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-single-order',
  templateUrl: './view-single-order.component.html',
  styleUrls: ['./view-single-order.component.css']
})
export class ViewSingleOrderComponent implements OnInit {
  order_details: any;
  item_list : any;
  status : any;

  constructor(
    private router: Router,
    private storage: WebStorageService,
    private http: HttpClient,
    private _api: ApiService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.order_details = this.storage.local.get('order_details');
    console.log(this.order_details);
    this.item_list = this.order_details.Item_detals[0].Data;
    console.log(this.item_list);
    this.status = this.order_details.order_status;

  }


  Update_status(){
    let arrays = [];
    if(this.status == 'Delivered'){
       for(let a = 0 ; a < this.item_list.length; a ++){
         let qunt = this.item_list[a].quantity;
        let d = this.item_list[a].Item_id.Expensive;
        console.log(d);
                for(let b = 0 ; b < d.length ; b ++){
                     let dr = {
                       _id : d[b]._id,
                       Stock_Spend : d[b].Stock_Spend * qunt,
                     }
                     arrays.push(dr)
                }
                if(a == this.item_list.length - 1){
                  console.log(arrays);
                }
       }
    }
    else{
     let a = {
       _id : this.order_details._id,
       order_status :  this.status
     }
     console.log(a);
     this._api.orders_update(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        this.storage.local.set('order_details',response.Data);
        this.toastr.clear();
        this.toastr.success("Status Updated")
     
        this.ngOnInit();
      }
    );

  }

  }
}
