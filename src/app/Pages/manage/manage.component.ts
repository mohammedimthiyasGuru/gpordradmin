import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  res_id : string;
  manager_id : any;
  req_data : string;
  status : string;
  Date_of_approve : string;
  Date_of_register : string;
  attachment : string;
  request_id : string;

  vendor_details:any;

  approval_status : string;


  manager_name : string;
  manager_phone : string;
  manager_email : string;
  req_type : string;
  req_date : string;


  manager_list : any;



  htmlContent : string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: WebStorageService,
    private _api: ApiService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
    ) { }

  ngOnInit(): void {


    this.vendor_details = this.storage.local.get('vendor_details');

    console.log(this.vendor_details);
    this.res_id = this.vendor_details._id;
     let a = {
      res_id : this.vendor_details._id
     }

     this._api.requested_list_id(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        this.manager_list = response.Data;
        console.log(this.manager_list);
      }
    );

  }




















  editdata(data){
    console.log(data);
    this.request_id = data._id;
    this.manager_name =  data.manager_id.manager_name;
    this.manager_phone =  data.manager_id.manager_phone;
    this.manager_email =  data.manager_id.manager_email;
    this.htmlContent = data.req_data;
    this.attachment =  data.attachment;
    this.req_type =  data.req_type;
    this.req_date = data.req_date;

  }


  goToLink(url: string){

    if(url == undefined){
      this.toastr.clear();
      this.toastr.error("No file available")
    }else{
      console.log(url);
      window.open(url);
    }

}



  download(url, downloadName) {
    if(downloadName == undefined){
      this.toastr.clear();
      this.toastr.error("No file available")
    }else{
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = downloadName;
    a.click();
    document.body.removeChild(a);
    }
  }



  deleteactions(data){
    console.log(data);
    let a = {
      _id : data
     }
     this._api.requested_delete_id(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        this.toastr.clear();
        this.toastr.success("Deleted Successfully")
     ;
        this.ngOnInit();
      }
    );
  }




  apporval(){
     let a = {
       "_id" : this.request_id,
       "status": 'Approved',
       "Date_of_approve" : ""+new Date()
     }
     console.log(a);
     this._api.requested_edit_id(a).subscribe(
       (response: any) => {
        this.toastr.clear();
        this.toastr.success("Updated Successfully")
         
         this.ngOnInit();
       }
       );
   }


   Rejected(){
    let a = {
      "_id" : this.request_id,
      "status": 'Rejected',
      "Date_of_approve" : ""+new Date()
    }
    console.log(a);
    this._api.requested_edit_id(a).subscribe(
      (response: any) => { 
         this.toastr.clear();
        this.toastr.success("Updated Successfully")
     
        this.ngOnInit();
      }
      );
  }



  }




