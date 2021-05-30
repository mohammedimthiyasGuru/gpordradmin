import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewvendorprofile',
  templateUrl: './viewvendorprofile.component.html',
  styleUrls: ['./viewvendorprofile.component.css']
})
export class ViewvendorprofileComponent implements OnInit {

  shop_name = "";
  shop_link_name = "";
  address = "";
  shop_number = "0";
  vendor_name = "";
  vendor_email = "";
  vendor_password = "";
  vendor_phone = '0';
  selectedAudio1:any;
  selectedAudio2:any;

  show_link : any;

  admin_link : any = 'http://ordradmin.macinc.in/#/login/';

  shoplogo: any = "http://54.212.108.156:3000/api/uploads/1615198599057.jpg";
  person_doc : any = "http://54.212.108.156:3000/api/uploads/1615198702647.jpg";

  status = true ;

  vendor_details : any;

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

    this.admin_link = this.admin_link + this.vendor_details.shop_link_name;


  this.shop_name = this.vendor_details.shop_name;
  this.shop_link_name = 'http://ordr.macinc.in/#/home/' + this.vendor_details.shop_link_name;
  this.address = this.vendor_details.address;
  this.shop_number =  this.vendor_details.shop_number;
  this.vendor_name = this.vendor_details.vendor_name;
  this.vendor_email = this.vendor_details.vendor_email;
  this.vendor_password = this.vendor_details.vendor_password;
  this.vendor_phone = this.vendor_details.vendor_phone;
  this.shoplogo = this.vendor_details.shop_logo;
  this.person_doc  = this.vendor_details.vendor_doc;




  }


  fileupload1(event){
    this.selectedAudio1 = event.target.files[0];
    console.log(this.selectedAudio1)
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.shoplogo = reader.result as string;
        // console.log(this.Pic)
      };
    }
    this.addfiles1();
  }



addfiles1()
{
  const fd = new FormData();
  fd.append('sampleFile', this.selectedAudio1, this.selectedAudio1.name);
  console.log(fd)
  this.http.post('http://54.212.108.156:3000/upload', fd)
  .subscribe((res: any) => {
  console.log(res);
  this.shoplogo = res.Data;
});
}



fileupload2(event){
  this.selectedAudio2 = event.target.files[0];
  console.log(this.selectedAudio2)
  this.addfiles2();
  const reader = new FileReader();
  if (event.target.files && event.target.files.length) {

    const [file] = event.target.files;

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.person_doc = reader.result as string;
      // console.log(this.Pic)
    };
  }
}



addfiles2()
{
const fd = new FormData();
fd.append('sampleFile', this.selectedAudio2, this.selectedAudio2.name);
console.log(fd)
this.http.post('http://54.212.108.156:3000/upload', fd)
.subscribe((res: any) => {
console.log(res);
this.person_doc = res.Data;
});
}

onSearchChange(datas){
   let strings =  datas.toLowerCase( );
   this.show_link = "http://ordr.macinc.in/#/home/"+strings.split(' ').join('_');
   this.shop_link_name = strings.split(' ').join('_');
}





  Save2(){
    let a = {
      "shop_logo": this.shoplogo,
      "shop_doc" : "",
      "vendor_doc": this.person_doc,
      "vendor_name": this.vendor_name,
      "shop_name": this.shop_name,
      "shop_link_name": this.shop_link_name,
      "vendor_email":  this.vendor_email,
      "vendor_password": this.vendor_password,
      "vendor_phone":  this.vendor_phone,
      "status": this.status,
      "map_link":  '',
      "lat":  '',
      "long": '',
      "address":  this.address,
      "shop_number":  this.shop_number,
      "shop_opening_time":  []
    }

    console.log(a);

    this._api.vendor_create(a).subscribe(
      (response: any) => {
        this.toastr.clear();
        this.toastr.success("Added Successfully")

        this.router.navigateByUrl('ordr/vendorlist');
      }
      );
  }

  Reset2(){

  }




  }




