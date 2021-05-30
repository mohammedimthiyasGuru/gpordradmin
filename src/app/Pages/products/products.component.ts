import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from 'ngx-web-storage';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  toggle_button = true;

  Banner_toggle_button = true;
  banner_id = '';
  banner_ref = '';


  daysboolean: string = 'true';

  Categ_toggle_button = true;
  Categ_id = '';
  Categ_ref = '';

  selectedAudio1 : any;
  Banner: any = 'http://54.212.108.156:3000/api/uploads/1615198845556.jpeg';
  title : any = '';
  vendor_id :any = '';
  banner_list : any ;

  ////Cate//////
  cat_title : any = '';
  cat_descri : any = '';
  cat_image_path : any = 'http://54.212.108.156:3000/api/uploads/1615202125189.jpeg';
  cat_show_status : any = true;
  cat_time_service : any = [];
  selectedAudio2 : any;
  cate_list : any;
  links : any = '';

  cat_day_setting_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  cat_day_setting_arr1 = [];

  cat_day_setting: string = 'allday';
  cat_time_start: string = '00:00';
  cat_time_end : string = '23:00';

  time_check = false;




  cmon = false;
  ctue = false;
  cwed = false;
  cthu = false;
  cfri = false;
  cstr = false;
  csun = false;


  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private storage: WebStorageService,
    private toastr: ToastrService,
    private _api: ApiService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {

  let vendor_detailss = this.storage.local.get('vendor_details');

    this.links = 'http://ordr.macinc.in/#/home/'+ vendor_detailss.shop_link_name;


    this.routes.params.subscribe(params => {
      let d = params['id']; // (+) converts string 'id' to a number
      console.log('this id: ' + d);
      this.storage.local.set('vendor_id_item',d); // storing in local storage
      this.vendor_id = d;
      let b = {
        _id: d
      }
      this._api.fetch_vendor_banner(b).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.banner_list = response.Data;
          console.log(this.banner_list);
        }
      );


      let a = {
        _id: d
      }
      this._api.fetch_vendor_cat(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.cate_list = response.Data;
          console.log(this.cate_list);

        }
      );


    });

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
      if((height !== 200) && (width !== 450)){
        this.toastr.clear();
        this.toastr.warning("Please upload the valid height and widht. 200 X 450");
      }else {
        this.spinner.show();
    this.selectedAudio1 = event.target.files[0];
    console.log(this.selectedAudio1)
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        // this.Banner = reader.result as string;
        this.addfiles3();

        // console.log(this.Pic)
      };
    }
  }
    }
  }


  onchangeday(data){
   console.log(data);
   if(data == 'manually'){
    this.daysboolean = 'false';
    this.cat_day_setting_arr1 = [
      {Name:'Monday',status:false},
      {Name:'Tuesday',status:false},
      {Name:'Wednesday',status:false},
      {Name:'Thursday',status:false},
      {Name:'Friday',status:false},
      {Name:'Saturday',status:false},
      {Name:'Sunday',status:false},
    ];
   }else{
    this.daysboolean = 'true';
   }
   if(data == 'montofri'){
     this.cat_day_setting_arr = [];
     this.cat_day_setting_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
   }else if(data == 'sattosun'){
    this.cat_day_setting_arr = [];
    this.cat_day_setting_arr = ['Saturday', 'Sunday'];
   }else if(data == 'allday'){
    this.cat_day_setting_arr = [];
    this.cat_day_setting_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
   }




  }

  onsingleday(data,index){
   console.log(data,index);
   if(this.cat_day_setting_arr1[index - 1].status == false){
    this.cat_day_setting_arr1[index - 1].status = true;
   }else{
    this.cat_day_setting_arr1[index - 1].status = false;
   }
  }

  addfiles1()
{
  this.Save1();
}


endtimes(datas){
  console.log(datas);
  let d = this.cat_time_start.split(':');
  let e = datas.split(':');
  console.log(d[0]);
  console.log(e[0]);
  if(+e[0] <= +d[0]){
    console.log("true");
    this.toastr.clear();
        this.toastr.warning("end time should be greater start time");

    this.time_check = true;
  }else{
    console.log("false");
    this.time_check = false;
  }


}
Save2(){
  let check = 0;
  let message = '';
  if(this.title == ''){
    check = 1;
    message = 'Enter the banner title';
  }
  if(this.Banner == 'http://54.212.108.156:3000/api/uploads/1615198845556.jpg'){
    check = 1;
    message = 'Upload the banner image';
  }
  if(check == 1){
    this.toastr.clear();
        this.toastr.error(message);
  }else{
    this.addfiles1();
  }
}


Editbanner(datas){
  this.Banner_toggle_button = false;
  this.title = datas.title;
  this.banner_ref = datas.Image_path;
  this.Banner = datas.Image_path;
  this.banner_id = datas._id;
}

editbanneraction(){
  let check = 0;
  let message = '';
  if(this.title == ''){
    check = 1;
    message = 'Enter the banner title';
  }
  if(this.Banner == 'http://54.212.108.156:3000/api/uploads/1615198845556.jpg'){
    check = 1;
    message = 'Upload the banner image';
  }
  if(check == 1){
    this.toastr.clear();
    this.toastr.error(message);
  }else{

    if(this.banner_ref == this.Banner){
      let a = {
        '_id': this.banner_id,
        'vendor_id': this.vendor_id,
        'title': this.title,
        'link': '',
        'Image_path':  this.Banner,
        'Date_of_create': new Date(),
        'Status': true,
      }
      console.log(a);
      this._api.banner_edit(a).subscribe(
        (response: any) => {
          //  this.userList = response.Data;
          //  console.log(this.userList);
          this.toastr.clear();
          this.toastr.success("Banner Updated Successfully");

          this.ngOnInit();
          this.Banner = 'http://54.212.108.156:3000/api/uploads/1615198845556.jpg';
          this.title = '';
          this.Banner_toggle_button = true;
          // this.router.navigateByUrl('admin_panel/vendor_detail');
        }
        );
    }
else{
    const fd = new FormData();
    fd.append('sampleFile', this.selectedAudio1, this.selectedAudio1.name);
    console.log(fd)
    this.http.post('http://54.212.108.156:3000/upload', fd)
    .subscribe((res: any) => {
    console.log(res);
    this.Banner = res.Data;
    // this.Save1();
    let a = {
      '_id': this.banner_id,
      'vendor_id': this.vendor_id,
      'title': this.title,
      'link': '',
      'Image_path':  this.Banner,
      'Date_of_create': new Date(),
      'Status': true,
    }
    console.log(a);
    this._api.banner_edit(a).subscribe(
      (response: any) => {
        //  this.userList = response.Data;
        //  console.log(this.userList);

        this.toastr.clear();
        this.toastr.success("Banner Updated Successfully");
        this.ngOnInit();
        this.Banner = 'http://54.212.108.156:3000/api/uploads/1615198845556.jpg';
        this.title = '';
       this.Banner_toggle_button = true;
        // this.router.navigateByUrl('admin_panel/vendor_detail');
      }
      );
  });
}
  }







}

Save1(){
  let a = {
    'vendor_id': this.vendor_id,
    'title': this.title,
    'link': '',
    'Image_path':  this.Banner,
    'Date_of_create': new Date(),
    'Status': true,
  }
  console.log(a);
  this._api.banner_create(a).subscribe(
    (response: any) => {
      //  this.userList = response.Data;
      //  console.log(this.userList);
      this.toastr.clear();
     this.toastr.success("Banner Added Successfully");
      this.ngOnInit();
      this.Banner = 'http://54.212.108.156:3000/api/uploads/1615198845556.jpeg';
      this.title = '';
      // this.router.navigateByUrl('admin_panel/vendor_detail');
    }
    );
}




fileupload2(event){
  this.spinner.show();
  const URL = window.URL || window.webkitURL;
  const Img = new Image();
  const filesToUpload = (event.target.files);
  Img.src = URL.createObjectURL(filesToUpload[0]);
  Img.onload = (e: any) => {
    const height = e.path[0].height;
    const width = e.path[0].width;
    console.log(height,width);
    if((height !== 500) && (width !== 500)){
      this.toastr.clear();
          this.toastr.warning("Please upload the valid height and widht. 500 X 500");
    }else {

  this.selectedAudio2 = event.target.files[0];
  console.log(this.selectedAudio1)
  const reader = new FileReader();
  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.cat_image_path = reader.result as string;
      this.spinner.hide();
      this.addfiles2();
    };
  }

}
  }






}

addfiles3()
{

const fd = new FormData();
fd.append('sampleFile', this.selectedAudio1, this.selectedAudio1.name);
console.log(fd)

this.http.post('http://54.212.108.156:3000/upload', fd)
.subscribe((res: any) => {
console.log(res);
this.Banner = res.Data;
this.spinner.hide();

});
}


addfiles2()
{

const fd = new FormData();
fd.append('sampleFile', this.selectedAudio2, this.selectedAudio2.name);
console.log(fd)
this.http.post('http://54.212.108.156:3000/upload', fd)
.subscribe((res: any) => {
console.log(res);
this.cat_image_path = res.Data;

});
}




Deletebanner(data){
  let a = {
    Activity_id : data
  }
console.log('Delete');
this._api.banner_delete(a).subscribe(
  (response: any) => {
    //  this.userList = response.Data;
    //  console.log(this.userList);
    this.toastr.clear();
    this.toastr.success("Banner Deleted Successfully");

    this.ngOnInit();

    // this.router.navigateByUrl('admin_panel/vendor_detail');
  }
  );

}



DeleteCate(data){
  let a = {
    Activity_id : data
  }
this._api.cate_delete(a).subscribe(
  (response: any) => {
    //  this.userList = response.Data;
    //  console.log(this.userList);
    this.toastr.clear();
    this.toastr.success("category Deleted Successfully");


    this.ngOnInit();
    // this.router.navigateByUrl('admin_panel/vendor_detail');
  }
  );

}






Save_Cat(){

  if(this.cat_day_setting == 'manually'){
    this.cat_day_setting_arr = [];
    for(let a = 0 ; a < this.cat_day_setting_arr1.length ; a++){
      if(this.cat_day_setting_arr1[a].status == true){
        this.cat_day_setting_arr.push(this.cat_day_setting_arr1[a].Name);
      }
    }
  }

  console.log(this.cat_day_setting_arr);
  console.log(this.cat_time_start);
  console.log(this.cat_time_end);

  console.log(this.vendor_id,this.cat_title,this.cat_descri,this.cat_image_path,this.cat_show_status)
  let check = 0;
  if(this.vendor_id == ''){
    check = 1
  }
  if(this.cat_title == ''){
    check = 1
  }
  if(this.cat_descri == ''){
    check = 1
  }
  if(this.cat_image_path == ''){
    check = 1
  }
  if(this.cat_show_status == ''){
    check = 1
  }
  if(check == 1){
    this.toastr.clear();
    this.toastr.error("Please enter all the fields");


  }else{
   if(this.time_check == true){
    this.toastr.clear();
    this.toastr.error("end time should be greater start time");

   }else{




    let a = {
      'vendor_id': this.vendor_id,
      'cat_title': this.cat_title,
      'cat_descri': this.cat_descri,
      'cat_image_path':  this.cat_image_path,
      'cat_show_status': this.cat_show_status,
      'cat_time_service':  this.cat_time_service,
      'cat_time_end': this.cat_time_end,
      'cat_time_start': this.cat_time_start,
      'cat_day_setting' : this.cat_day_setting_arr,
      'cat_day_type' : this.cat_day_setting
    }
    console.log(a);
    this._api.cate_create(a).subscribe(
      (response: any) => {
        console.log(response);
        //  this.userList = response.Data;
        //  console.log(this.userList);
        this.toastr.clear();
    this.toastr.success("category Added Successfully");


        this.ngOnInit();
        this.cat_title = '';
        this.cat_descri = '';
        this.cat_image_path = 'http://54.212.108.156:3000/api/uploads/1615202125189.jpeg';
        this.cat_show_status = true;
        this.cat_day_setting_arr =  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.cat_day_setting_arr1 =  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.cat_day_setting = 'allday';
        this.cat_time_start = '00:00';
        this.cat_time_end = '24:00';
        this.time_check = false;
        this.daysboolean = 'true';
        // this.router.navigateByUrl('admin_panel/vendor_detail');


      }
      );

    }


  }
}



Showbanner(){
  this.toggle_button = true;
}

Showcatagories(){
  this.toggle_button = false;
}



Update_Cat_action(){

  if(this.cat_day_setting == 'manually'){
    this.cat_day_setting_arr = [];
    for(let a = 0 ; a < this.cat_day_setting_arr1.length ; a++){
      if(this.cat_day_setting_arr1[a].status == true){
        this.cat_day_setting_arr.push(this.cat_day_setting_arr1[a].Name);
      }
    }
  }

  console.log(this.cat_day_setting_arr);
  console.log(this.cat_time_start);
  console.log(this.cat_time_end);

  console.log(this.vendor_id,this.cat_title,this.cat_descri,this.cat_image_path,this.cat_show_status)
  let check = 0;
  if(this.vendor_id == ''){
    check = 1
  }
  if(this.cat_title == ''){
    check = 1
  }
  if(this.cat_descri == ''){
    check = 1
  }
  if(this.cat_image_path == ''){
    check = 1
  }
  if(this.cat_show_status == ''){
    check = 1
  }
  if(check == 1){
    this.toastr.clear();
    this.toastr.error("Please enter all the fields");

  }else{
    if(this.time_check == true){
      this.toastr.clear();
      this.toastr.error("end time should be greater start time");

     }else{
    let a = {
      '_id': this.Categ_id,
      'vendor_id': this.vendor_id,
      'cat_title': this.cat_title,
      'cat_descri': this.cat_descri,
      'cat_image_path':  this.cat_image_path,
      cat_show_status : this.cat_show_status,
      // this.cat_time_service = datas.cat_time_service;
      cat_day_setting : this.cat_day_setting,
      cat_time_start : this.cat_time_start,
      cat_time_end : this.cat_time_end,
    }
    console.log(a);
    this._api.cate_edit(a).subscribe(
      (response: any) => {
        //  this.userList = response.Data;
        //  console.log(this.userList);
        this.toastr.clear();
        this.toastr.success("category Updated Successfully");

        this.ngOnInit();
        this.cat_title = '';
        this.cat_descri = '';
        this.cat_image_path = 'http://54.212.108.156:3000/api/uploads/1615202125189.jpeg';
        this.cat_show_status = true;
        this.cat_day_setting_arr = [];
        this.cat_day_setting_arr1 = [];
        this.cat_day_setting = 'allday';
        this.cat_time_start = '00:00';
        this.cat_time_end = '24:00';
        this.time_check = false;
        this.daysboolean = 'true';
      }
      );
  }
}

}


edit_cat_as(datas){
  this.Categ_toggle_button = false;
  console.log('Cat',datas);
  this.Categ_id = datas._id;
  this.vendor_id = datas.vendor_id;
  this.cat_title = datas.cat_title;
  this.cat_descri = datas.cat_descri;
  this.cat_image_path = datas.cat_image_path;
  this.Categ_ref = datas.cat_image_path;
  this.cat_show_status = datas.cat_show_status;
  // this.cat_time_service = datas.cat_time_service;
  this.cat_day_setting = datas.cat_day_type;
  this.cat_time_start = datas.cat_time_start;
  this.cat_time_end = datas.cat_time_end;

  if(this.cat_day_setting == 'manually'){
    this.cmon = false;
    this.ctue = false;
    this.cwed = false;
    this.cthu = false;
    this.cfri = false;
    this.cstr = false;
    this.csun = false;
    this.daysboolean = 'false';
    this.cat_day_setting_arr1 = [
      {Name:'Monday',status:false},
      {Name:'Tuesday',status:false},
      {Name:'Wednesday',status:false},
      {Name:'Thursday',status:false},
      {Name:'Friday',status:false},
      {Name:'Saturday',status:false},
      {Name:'Sunday',status:false},
    ];
    for(let a = 0 ; a < datas.cat_day_setting.length;a ++){
      for(let b = 0 ; b < this.cat_day_setting_arr1.length ; b ++){
        if(datas.cat_day_setting[a] == this.cat_day_setting_arr1[b].Name){
          this.cat_day_setting_arr1[b].status = true;
          console.log(datas.cat_day_setting[a]);

          if(datas.cat_day_setting[a] === 'Monday'){
            this.cmon = true;
          }
          if(datas.cat_day_setting[a] === 'Tuesday'){
            this.ctue = true;
          }
          if(datas.cat_day_setting[a] === 'Wednesday'){
            this.cwed = true;
          }
          if(datas.cat_day_setting[a] === 'Thursday'){
            this.cthu = true;
          }
          if(datas.cat_day_setting[a] === 'Friday'){
            this.cfri = true;
          }
          if(datas.cat_day_setting[a] === 'Saturday'){
            this.cstr = true;
          }
          if(datas.cat_day_setting[a] === 'Sunday'){
            this.csun = true;
          }
        }
      }
    }
   }






}


movetoexpn(){
 console.log(this.vendor_id);
 this.router.navigateByUrl('/ordr/vendor/exp/addexp/' + this.vendor_id);
}
}
