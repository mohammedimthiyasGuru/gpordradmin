import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editvendor',
  templateUrl: './editvendor.component.html',
  styleUrls: ['./editvendor.component.css']
})
export class EditvendorComponent implements OnInit {

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
  shoplogos : any;

  show_link : any;

  shoplogo: any = "http://54.212.108.156:3000/api/uploads/1615198599057.jpg";
  person_doc : any = "http://54.212.108.156:3000/api/uploads/1615198702647.jpg";

  status = true ;

  vendor_id : any;



  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: WebStorageService,
    private _api: ApiService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
    ) { }

  ngOnInit(): void {
    let vendor_details = this.storage.local.get('rest_details');
    console.log(vendor_details);
    this.shop_name = vendor_details.shop_name;
    this.show_link = vendor_details.shop_link_name;
    this.shoplogo = vendor_details.shop_logo;
    this.address = vendor_details.address;
    this.shop_number = vendor_details.shop_number;
    this.vendor_email = vendor_details.vendor_email;
    this.vendor_password = vendor_details.vendor_password;
    this.vendor_name = vendor_details.vendor_name;
    this.vendor_phone = vendor_details.vendor_phone;
    this.person_doc = vendor_details.vendor_doc;
    this.vendor_id = vendor_details._id;
  }


  fileupload1(event){

    const URL = window.URL || window.webkitURL;
    const Img = new Image();

    const filesToUpload = (event.target.files);
    Img.src = URL.createObjectURL(filesToUpload[0]);

    Img.onload = (e: any) => {


      const height = e.path[0].height;
      const width = e.path[0].width;

      console.log(height,width);

      if((height !== 512) && (width !== 512)){
        this.toastr.clear();
        this.toastr.warning("Please upload the valid height and widht. 512 X 512");

       this.shoplogos = '';
      }else {
        this.selectedAudio1 = event.target.files[0];
        console.log(this.selectedAudio1)
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.shoplogo = reader.result as string;
            // console.log(this.Pic)
            this.addfiles1();
          };
        }
      }
  }
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
   console.log(
    this.shop_name,
    this.show_link,
    this.shoplogo,
    this.address,
    this.shop_number,
    this.vendor_email,
    this.vendor_password,
    this.vendor_name,
    this.vendor_phone,
    this.person_doc,
   );
   let check = 0;
   let emailcheck = 0;
   if(this.shop_name == '' || this.shop_name == undefined){
    check = 1;
   }
   if(this.show_link == '' || this.show_link == undefined){
    check = 1;
   }
   if(this.shop_number == '' || this.shop_number == undefined){
    check = 1;
   }
   if(this.shoplogo == '' || this.shoplogo == undefined){
    check = 1;
   }
   if(this.vendor_email == '' || this.vendor_email == undefined){
    check = 1;
   }
   if(this.vendor_password == '' || this.vendor_password == undefined){
    check = 1;
   }
   if(this.vendor_name == '' || this.vendor_name == undefined){
    check = 1;
   }
   if(this.vendor_phone == '' || this.vendor_phone == undefined){
    check = 1;
   }
   if(this.person_doc == '' || this.person_doc == undefined){
    check = 1;
   }
   let regex =/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
   if( this.vendor_email == "" || ! regex.test(this.vendor_email)){
    emailcheck = 1;
    }
   if(check == 1){
    this.toastr.clear();
    this.toastr.error("Please enter all the fields");

   }else if(emailcheck == 1) {
    this.toastr.clear();
    this.toastr.error("Please enter Valid Email id");

   }
   else{
    let a = {
      "_id" :  this.vendor_id,
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
    this._api.vendor_edit(a).subscribe(
      (response: any) => {
        this.toastr.clear();
        this.toastr.success("Updated Successfully");

        this.router.navigateByUrl('ordr/vendorlist');
      }
      );
   }
  }

  Reset2(){

  }




  }




