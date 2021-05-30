import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  vendor_details : any;
  email_id : string;

  constructor(
    private router: Router,
    private storage: WebStorageService,
    private http: HttpClient,
    private _api: ApiService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.vendor_details = this.storage.local.get('vendor_details');
    console.log(this.vendor_details);
  }

  resend(){
    if(this.email_id == undefined || this.email_id == ''){
      this.toastr.clear();
      this.toastr.error("Please enter all The Fields")
    }else {
    if(this.vendor_details.vendor_email == this.email_id){
      let a = {
        vendor_email: this.vendor_details.vendor_email
      }
      this._api.forgotpassword(a).subscribe(
        (response: any) => {
          this.toastr.clear();
          this.toastr.info("Password Send to your email id")
          this.router.navigateByUrl('login/'+this.vendor_details.shop_link_name);
        }
      );
    }else{
      this.toastr.clear();
      this.toastr.error("Account not available");

    }

  }
  }


  back(){
    this.router.navigateByUrl('login/'+this.vendor_details.shop_link_name);
  }



}
