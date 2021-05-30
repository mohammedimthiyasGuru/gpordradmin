import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addexp',
  templateUrl: './addexp.component.html',
  styleUrls: ['./addexp.component.css']
})
export class AddexpComponent implements OnInit {

  toggle_button = true;
  vendor_id : any;
  banner_list : any;
  exptenstion_id = '';



  // ordr/productadd

  Title: String = '';
  QuantityType: String = "Kgs";
  Total: Number = 0;
  Spended: Number = 0;
  Balance: Number = 0;

  links : string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: WebStorageService,
    private _api: ApiService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
  ) {

    let a = this.storage.local.get('vendor_details');
    console.log(a);
    this.links = '/#/ordr/productadd/' + a._id;
  }



  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      let d = params['id']; // (+) converts string 'id' to a number
      console.log('this id: ' + d);
      this.vendor_id = d;
      let b = {
        Vendor_id: d
      }
      this._api.expensive_list(b).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.banner_list = response.Data;
          console.log(this.banner_list);
        }
      );





    });


  }





  onSearchChange(a){
    this.Balance = +this.Total - +this.Spended;
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
      "Activity_id":this.exptenstion_id,
      "Vendor_id": this.vendor_id,
      "Stock_name" : this.Title,
      "Stock_qtn_type": this.QuantityType,
      "Stock_total": this.Total,
      "Stock_Spend": this.Spended,
      "Stock_pending": this.Balance,

    }
    console.log(a);
    this._api.expensive_edit(a).subscribe(
      (response: any) => {
        this.toastr.clear();
        this.toastr.success("Update Successfully");
        this.ngOnInit();
   this.Title = '';
      this.QuantityType = 'Kgs';
  this.Total = 0;
     this.Spended = 0;
      this.Balance = 0;
      this.toggle_button = true;
      }
      );

    }
  }

  Deleteexpensive(data){
    let a = {
      Activity_id : data
    }
  console.log("Delete");
  this._api.expensive_delete(a).subscribe(
    (response: any) => {
      //  this.userList = response.Data;
      //  console.log(this.userList);
      this.toastr.clear();
      this.toastr.success("Expensive Deleted Successfully");
     
      this.ngOnInit();
      // this.router.navigateByUrl('admin_panel/vendor_detail');
    }
    );
  }
   addexpensive(){
    if(this.Title == ''){
      this.toastr.clear();
      this.toastr.error("Please enter the all the fields");
  
    }else {
    let a = {
      "Vendor_id": this.vendor_id,
      "Stock_name" : this.Title,
      "Stock_qtn_type": this.QuantityType,
      "Stock_total": this.Total,
      "Stock_Spend": this.Spended,
      "Stock_pending": this.Balance,

    }
    console.log(a);
    this._api.expensive_create(a).subscribe(
      (response: any) => {
        this.toastr.clear();
        this.toastr.success("Added Successfully");
        
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

}
