import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  vendor_details: any = [];

  email_id : string;
  password: string;

  constructor(
    private router: Router,
    private storage: WebStorageService,
    private http: HttpClient,
    private _api: ApiService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
    ) {
      let count = this.storage.local.get('load_count');
      console.log(count);
      if(count == 1){
        window.location.reload();
        this.storage.local.set('load_count',0);
      }
      this.storage.local.clear();
      if(this.vendor_details.shop_logo == undefined){
        this.vendor_details.shop_logo = '';
      }
    this.routes.params.subscribe(params => {
      let d = params['id']; // (+) converts string 'id' to a number
      console.log('this id: ' + d);
      let a = {
        shop_link_name: d
      }
      this._api.fetchres_details(a).subscribe(
        (response: any) => {
          this.vendor_details = response.Data.Vendor_details;
          console.log(this.vendor_details);
          if(this.vendor_details == null){
          this.toastr.warning('Invalid URL');
          this.vendor_details = {
            shop_logo : "",
            shop_name : ""
          }
          }else{
            this.storage.local.set('vendor_details',this.vendor_details); // storing in local storage
          }
        }
      );
    });

   }


  ngOnInit(): void {
  }


  login(){

    if(this.email_id == '' || this.password == '' || this.email_id == undefined || this.password == undefined){
      this.toastr.error("Please enter all The Fields")
   }
   else{
    if(this.email_id == this.vendor_details.vendor_email && this.password == this.vendor_details.vendor_password){
      this.toastr.success("Login Successfully")
      this.storage.local.set('login_status',this.vendor_details);
      this.router.navigateByUrl('/ordr/Dashboard');
      this.storage.local.set('load_count',0);
      // window.location.reload();
    }else{
      this.toastr.error("Invalid Account")
    }
  }
  }

  clear() {
    this.storage.local.clear();
}

}
