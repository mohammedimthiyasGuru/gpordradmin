import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-additemexp',
  templateUrl: './additemexp.component.html',
  styleUrls: ['./additemexp.component.css']
})
export class AdditemexpComponent implements OnInit {

  toggle_button = true;
  vendor_id : any;
  banner_list : any;
  exptenstion_id = '';

  Expencive = [];

  vendor_ids : any;
  expensive_id = '';



  itemsdetails: any;

  Title: String = '';
  QuantityType: String = "Kgs";
  Total: Number = 0;
  Spended: Number = 0;
  Balance: Number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: WebStorageService,
    private toastr: ToastrService,
    private _api: ApiService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.itemsdetails = this.storage.local.get('item_details');
    console.log(this.itemsdetails);
    this.Expencive =  this.itemsdetails.Expensive;
    this.vendor_ids = this.storage.local.get('vendor_id_item');
    console.log( this.vendor_ids );
    console.log(this.itemsdetails);
      let b = {
        Vendor_id:  this.vendor_ids
      }
      this._api.expensive_list(b).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.banner_list = response.Data;
          console.log(this.banner_list);
          this
        }
      );








  }





  editexpensive(datas){
    this.toggle_button =  false;
    this.exptenstion_id = datas._id;
    this.Title = datas.Stock_name;
    this.QuantityType = datas.Stock_qtn_type;
    this.Total = datas.Stock_total;
    this.Spended = datas.Stock_Spend;
    this.Balance = datas.Stock_pending;
  }


  editexpensive_action(){
    if(this.Title == ''){
      this.toastr.clear();
      this.toastr.error("Please enter the all the fields");

    }else {
    let a = {
      "_id":this.itemsdetails._id,
      "Expensive": this.Expencive,
    }
    console.log(a);
    this._api.item_edit(a).subscribe(
      (response: any) => {
        this.toastr.clear();
        this.toastr.success("Updated Successfully");

        console.log(response.Data);
        this.storage.local.set('item_details',response.Data); // storing in local storage
        this.ngOnInit();
        this.Title = '';
        this.QuantityType = 'Kgs';
        this.Total = 0;
        this.Spended = 0;
        this.Balance = 0;
      }
      );
    }
  }

  Deleteexpensive(data){
    this.Title = this.Expencive[data];
   this.Expencive.splice(data ,1);
   console.log(this.Expencive);
   this.editexpensive_action();
  }

  onSearchChange1(datas){
    console.log(datas);
    for(let a = 0 ; a < this.banner_list.length; a++){
      if(this.banner_list[a].Stock_name == datas){
        this.QuantityType = this.banner_list[a].Stock_qtn_type;
        this.expensive_id = this.banner_list[a]._id;
      }
    }
  }

  addexpensive(){
    let a = {
      "_id": this.expensive_id,
      "Stock_name" : this.Title,
      "Stock_qtn_type": this.QuantityType,
      "Stock_total": this.Total,
      "Stock_Spend": this.Spended,
      "Stock_pending": this.Balance,
    }
    this.Expencive.push(a);
    this.editexpensive_action();
  }

}
