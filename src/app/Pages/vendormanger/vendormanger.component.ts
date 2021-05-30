import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendormanger',
  templateUrl: './vendormanger.component.html',
  styleUrls: ['./vendormanger.component.css']
})
export class VendormangerComponent implements OnInit {

  res_id : string;
  manager_name : string;
  manager_phone : string;
  manager_email : string;
  manager_password : string;
  Date_of_register : string = ""+new Date();
  vendor_details : any;
  manager_list : any;
  Banner_toggle_button = true;
  manager_id : string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: WebStorageService,
    private toastr: ToastrService,
    private _api: ApiService,
    private routes: ActivatedRoute
    ) { }

  ngOnInit(): void {


    this.vendor_details = this.storage.local.get('vendor_details');

    console.log(this.vendor_details);
    this.res_id = this.vendor_details._id;
     let a = {
      res_id : this.vendor_details._id
     }

     this._api.manager_list_byid(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        this.manager_list = response.Data;
        console.log(this.manager_list);
      }
    );

  }















  Save2(){
    console.log(
     this.res_id,
     this.manager_name,
     this.manager_phone,
     this.manager_email,
     this.manager_password,
     this.Date_of_register,
    );
    let check = 0;
    let emailcheck = 0;
    if(this.res_id == '' || this.res_id == undefined){
     check = 1;
    }
    if(this.manager_name == '' || this.manager_name == undefined){
     check = 1;
    }
    if(this.manager_phone == '' || this.manager_phone == undefined){
     check = 1;
    }
    if(this.manager_email == '' || this.manager_email == undefined){
     check = 1;
    }
    if(this.manager_password == '' || this.manager_password == undefined){
     check = 1;
    }
    if(this.Date_of_register == '' || this.Date_of_register == undefined){
     check = 1;
    }
    let regex =/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if( this.manager_email == "" || ! regex.test(this.manager_email)){
     emailcheck = 1;
     }
    if(check == 1){
      this.toastr.clear();
      this.toastr.error("Please enter all the fields")
   
    }else if(emailcheck == 1) {
      this.toastr.clear();
      this.toastr.error("Please enter Valid Email id")

    }
    else{
     let a = {
       "res_id": this.res_id,
       "manager_name" : this.manager_name,
       "manager_phone": this.manager_phone,
       "manager_email": this.manager_email,
       "manager_password": this.manager_password,
       "Date_of_register": this.Date_of_register,
     }
     console.log(a);
     this._api.manager_create(a).subscribe(
       (response: any) => {
        this.toastr.clear();
        this.toastr.success("Added Successfully")
        
         this.ngOnInit();
       }
       );
    }
   }

  editdata(data){
    console.log(data);
    this.manager_id = data._id;
    this.manager_name =  data.manager_name;
    this.manager_phone =  data.manager_phone;
    this.manager_email =  data.manager_email;
    this.manager_password =  data.manager_password;
    this.Date_of_register =  data.Date_of_register;
    this.Banner_toggle_button = false;
  }

  deleteactions(data){
    console.log(data);
    let a = {
      _id : data
     }
     this._api.manager_delete_byid(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        this.toastr.clear();
        this.toastr.success("Deleted Successfully")
        
        this.ngOnInit();
      }
    );
  }




  editbanneraction(){
    console.log(
     this.res_id,
     this.manager_name,
     this.manager_phone,
     this.manager_email,
     this.manager_password,
     this.Date_of_register,
    );
    let check = 0;
    let emailcheck = 0;
    if(this.res_id == '' || this.res_id == undefined){
     check = 1;
    }
    if(this.manager_name == '' || this.manager_name == undefined){
     check = 1;
    }
    if(this.manager_phone == '' || this.manager_phone == undefined){
     check = 1;
    }
    if(this.manager_email == '' || this.manager_email == undefined){
     check = 1;
    }
    if(this.manager_password == '' || this.manager_password == undefined){
     check = 1;
    }
    if(this.Date_of_register == '' || this.Date_of_register == undefined){
     check = 1;
    }
    let regex =/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if( this.manager_email == "" || ! regex.test(this.manager_email)){
     emailcheck = 1;
     }
    if(check == 1){
      this.toastr.clear();
      this.toastr.error("Please enter all the fields")

    }else if(emailcheck == 1) {
      this.toastr.clear();
      this.toastr.error("Please enter Valid Email id")

    }
    else{
     let a = {
       "_id" : this.manager_id,
       "res_id": this.res_id,
       "manager_name" : this.manager_name,
       "manager_phone": this.manager_phone,
       "manager_email": this.manager_email,
       "manager_password": this.manager_password,
       "Date_of_register": this.Date_of_register,
     }
     console.log(a);
     this._api.manager_edit(a).subscribe(
       (response: any) => {
        this.toastr.clear();
        this.toastr.success("Updated Successfully")
   
         this.Banner_toggle_button = true;
         this.ngOnInit();
       }
       );
    }
   }



  }




