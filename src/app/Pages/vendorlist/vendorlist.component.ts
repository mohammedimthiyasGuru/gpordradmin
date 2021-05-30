import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@Component({
  selector: 'app-vendorlist',
  templateUrl: './vendorlist.component.html',
  styleUrls: ['./vendorlist.component.css']
})
export class VendorlistComponent implements OnInit {

  guillaumeNerySmallQR = 'http://ordr.macinc.in/#/home/';

  vendor_list : any;
  vendor_count : any = 0;




  constructor(
    private router: Router,
    private storage: WebStorageService,
    private http: HttpClient,
    private _api: ApiService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this._api.vendor_list().subscribe(
      (response: any) => {
        this.vendor_list = [];
         console.log(this.vendor_list);
         for(let a  = 0 ; a < response.Data.length; a ++){
          response.Data[a].map_link = 'http://ordradmin.macinc.in/#/login/' + response.Data[a].shop_link_name;
          response.Data[a].shop_link_name = 'http://ordr.macinc.in/#/home/' + response.Data[a].shop_link_name;
          this.vendor_list.push(response.Data[a]);
          this.vendor_count = this.vendor_list.length;
         }
         console.log(this.vendor_list);
      }

      );

  }


  editvendor(data){
    // ordr/editvendors
    this.storage.local.set('rest_details',data);
    this.router.navigateByUrl('/ordr/editvendors');
  }

  Deletevendor(data){
    let a = {
      Activity_id : data
    }
  console.log("Delete");
  this._api.vendor_delete(a).subscribe(
    (response: any) => {
      //  this.userList = response.Data;
      //  console.log(this.userList);
      this.toastr.clear();
      this.toastr.success("Vendor Deleted Successfully")
      this.ngOnInit();
      // this.router.navigateByUrl('admin_panel/vendor_detail');
    }
    );
  }


}
