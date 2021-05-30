import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { formatDate } from '@angular/common';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {


  daysboolean: string = 'true';

  update_button = false;
  item_id = "";
  selectedAudio1 : any;



  item_list :  any;
  catagories_id = "";
  cart_type= "";
  item_title= "";
  item_descri= "";
  item_audio : any = "http://54.212.108.156:3000/api/uploads/2 Second Video.mp3";
  item_image : any = "http://54.212.108.156:3000/api/uploads/1615202125189.jpeg";
  item_nature_status = "Nature";
  item_tag_type = false;
  item_tag_name = "";
  Prices = 0;
  item_original_price = 0;
  item_discount_type = false;
  status = true;
  Order_information = "";
  Tax = 0;
  Delivery = 0;
  Status = true;

  item_ids: string;


  item_day_setting_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  item_day_setting_arr1 = [];

  item_day_setting: string = 'allday';
  item_time_start: string = '00:00';
  item_time_end : string = '23:00';

  time_check = false;

  imon = false;
  itue = false;
  iwed = false;
  ithu = false;
  ifri = false;
  istr = false;
  isun = false;


  constructor(
   private router: Router,
   private http: HttpClient,
   private _api: ApiService,
   private routes: ActivatedRoute,
   private toastr: ToastrService,
   private storage: WebStorageService,
  ) { }

  ngOnInit(): void {

    this.routes.params.subscribe(params => {
      let d = params['id']; // (+) converts string 'id' to a number
      console.log('this id: ' + d);
      this.catagories_id = d;
      let a = {
        _id: d
      }
      this._api.fetch_items_list(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.item_list = response.Data;
          console.log(this.item_list);
        }
      );
    });

  }

  endtimes(datas){
    console.log(datas);
    let d = this.item_time_start.split(':');
    let e = datas.split(':');
    console.log(d[0]);
    console.log(e[0]);
    if(+e[0] <= +d[0]){
      console.log("true");
      this.toastr.clear();
      this.toastr.warning("end time should be greater start time")

      this.time_check = true;
    }else{
      console.log("false");
      this.time_check = false;
    }


  }

  onsingleday(data,index){
    console.log(data,index);
    if(this.item_day_setting_arr1[index - 1].status == false){
     this.item_day_setting_arr1[index - 1].status = true;
    }else{
     this.item_day_setting_arr1[index - 1].status = false;
    }
   }


   onchangeday(data){
    console.log(data);
    if(data == 'manually'){
     this.daysboolean = 'false';
     this.item_day_setting_arr1 = [
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
      this.item_day_setting_arr = [];
      this.item_day_setting_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    }else if(data == 'sattosun'){
     this.item_day_setting_arr = [];
     this.item_day_setting_arr = ['Saturday', 'Sunday'];
    }else if(data == 'allday'){
     this.item_day_setting_arr = [];
     this.item_day_setting_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }




   }


  fileupload(event){
    this.selectedAudio1 = event.target.files[0];
    console.log(this.selectedAudio1)
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.item_image = reader.result as string;
       this.addfiles();
      };
    }
  }

addfiles()
{
const fd = new FormData();
fd.append('sampleFile', this.selectedAudio1, this.selectedAudio1.name);
console.log(fd)
this.http.post('http://54.212.108.156:3000/upload', fd)
.subscribe((res: any) => {
console.log(res);
this.item_image = res.Data;
});
}


  fileupload1(event){
    this.selectedAudio1 = event.target.files[0];
    console.log(this.selectedAudio1)
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
  this.item_audio = res.Data;
  });
  }

  Deleteitem(data){
   console.log(data);
   let a = {
    Activity_id : data
  }
console.log("Delete");
this._api.item_delete(a).subscribe(
  (response: any) => {
    //  this.userList = response.Data;
    //  console.log(this.userList);
    this.toastr.clear();
    this.toastr.success("Item Deleted Successfully")

    this.ngOnInit();

    // this.router.navigateByUrl('admin_panel/vendor_detail');
  }
  );


  }


  Creat_item(){

    if(this.item_day_setting == 'manually'){
      this.item_day_setting_arr = [];
      for(let a = 0 ; a < this.item_day_setting_arr1.length ; a++){
        if(this.item_day_setting_arr1[a].status == true){
          this.item_day_setting_arr.push(this.item_day_setting_arr1[a].Name);
        }
      }
    }

    // console.log(this.cat_day_setting_arr);
    // console.log(this.cat_time_start);
    // console.log(this.cat_time_end);


    let check = 0;
    let message = '';

    console.log(this.catagories_id,
      this.item_title,
      this.item_descri,
      this.item_audio,
      this.item_image,
      this.item_audio,
      this.item_image,
      this.item_nature_status,
      this.item_tag_name,
      this.Prices,
      this.status,
      this.Order_information,
      this.Tax,
      )
    if(this.catagories_id  == ''){
      check = 1;
    }
    if(this.item_title  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_descri  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_audio  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_image  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_nature_status  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_tag_name  == ''){
      this.item_tag_name  = '.';
    }
    if(this.Prices  == 0){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.Order_information  == ''){
      this.Order_information  = '.';
    }
    if(check == 1){
      this.toastr.clear();
      this.toastr.error(message)

    }else{
      let a = {
        "catagories_id": this.catagories_id,
        "cart_type": this.cart_type,
        "item_title": this.item_title,
        "item_descri": this.item_descri,
        "item_audio": this.item_audio,
        "item_image": this.item_image,
        "item_nature_status": this.item_nature_status,
        "item_tag_type": this.item_tag_type,
        "item_tag_name": this.item_tag_name,
        "Prices": this.Prices,
        "item_original_price": this.item_original_price,
        "item_discount_type": this.item_discount_type,
        "status": this.status,
        "Order_information": this.Order_information,
        "cart_count" : 0 ,
        "Tax" : this.Tax,
        "Delivery" : this.Delivery,
        "item_day_setting" : this.item_day_setting_arr,
        "item_time_start" : this.item_time_start,
        "item_time_end" : this.item_time_end,
        "item_day_type" : this.item_day_setting,
     }
     console.log(a);
       this._api.item_create(a).subscribe(
         (response: any) => {
           //  this.userList = response.Data;
           //  console.log(this.userList);
           this.toastr.clear();
           this.toastr.success("Item Added Successfully")

           this.ngOnInit();
           this.cart_type= "";
           this.item_title= "";
           this.item_descri= "";
           this.item_audio  = "http://54.212.108.156:3000/api/uploads/2 Second Video.mp3";
           this.item_image = "http://54.212.108.156:3000/api/uploads/1615202125189.jpeg";
           this.item_nature_status = "Nature";
           this.item_tag_type = false;
           this.item_tag_name = "";
           this.Prices = 0;
           this.item_original_price = 0;
           this.item_discount_type = false;
           this.status = true;
           this.Order_information = "";
           this.Tax = 0;
           this.Delivery = 0;
           this.Status = true;
          //  this.router.navigateByUrl('admin_panel/vendor_detail');
         }
         );

    }

  }


  AddExpenvies(data){
    this.storage.local.set('item_details',data); // storing in local storage
    this.router.navigateByUrl('/ordr/vendor/items/additemexp');
  }

  selectOption(datas){
  console.log(datas);
  console.log(this.item_discount_type);
  }


  edititems(data){
   console.log(data);
   this.update_button = true;
   this.item_ids =  data._id;
   this.cart_type= data.cart_type;
   this.item_title= data.item_title;
   this.item_descri= data.item_descri;
   this.item_audio  = data.item_audio;
   this.item_image = data.item_image;
   this.item_nature_status = data.item_nature_status;
   this.item_tag_type = data.item_tag_type;
   this.item_tag_name = data.item_tag_name;
   this.Prices = data.Prices;
   this.item_original_price = data.item_original_price;
   this.item_discount_type = data.item_discount_type;
   this.status = data.status;
   this.Order_information = data.Order_information;
   this.Tax = data.Tax;
   this.Delivery = data.Delivery;
   this.Status = data.Status;


   this.item_day_setting = data.item_day_type;
   this.item_time_start = data.item_time_start;
   this.item_time_end = data.item_time_end;

   if(this.item_day_setting == 'manually'){
     this.imon = false;
     this.itue = false;
     this.iwed = false;
     this.ithu = false;
     this.ifri = false;
     this.istr = false;
     this.isun = false;
     this.daysboolean = 'false';
     this.item_day_setting_arr1 = [
       {Name:'Monday',status:false},
       {Name:'Tuesday',status:false},
       {Name:'Wednesday',status:false},
       {Name:'Thursday',status:false},
       {Name:'Friday',status:false},
       {Name:'Saturday',status:false},
       {Name:'Sunday',status:false},
     ];
     for(let a = 0 ; a < data.item_day_setting.length;a ++){
       for(let b = 0 ; b < this.item_day_setting_arr1.length ; b ++){
         if(data.item_day_setting[a] == this.item_day_setting_arr1[b].Name){
           this.item_day_setting_arr1[b].status = true;
           console.log(data.item_day_setting[a]);
           if(data.item_day_setting[a] === 'Monday'){
             this.imon = true;
           }
           if(data.item_day_setting[a] === 'Tuesday'){
             this.itue = true;
           }
           if(data.item_day_setting[a] === 'Wednesday'){
             this.iwed = true;
           }
           if(data.item_day_setting[a] === 'Thursday'){
             this.ithu = true;
           }
           if(data.item_day_setting[a] === 'Friday'){
             this.ifri = true;
           }
           if(data.item_day_setting[a] === 'Saturday'){
             this.istr = true;
           }
           if(data.item_day_setting[a] === 'Sunday'){
             this.isun = true;
           }
         }
       }
     }
    }



  }


  editaction(){

    if(this.item_day_setting == 'manually'){
      this.item_day_setting_arr = [];
      for(let a = 0 ; a < this.item_day_setting_arr1.length ; a++){
        if(this.item_day_setting_arr1[a].status == true){
          this.item_day_setting_arr.push(this.item_day_setting_arr1[a].Name);
        }
      }
    }

    let check = 0;
    let message = '';

    console.log(this.catagories_id,
      this.item_title,
      this.item_descri,
      this.item_audio,
      this.item_image,
      this.item_audio,
      this.item_image,
      this.item_nature_status,
      this.item_tag_name,
      this.Prices,
      this.status,
      this.Order_information,
      this.Tax,
      )
    if(this.catagories_id  == ''){
      check = 1;
    }
    if(this.item_title  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_descri  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_audio  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_image  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_nature_status  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.item_tag_name  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.Prices  == 0){
      check = 1;
      message = 'Enter valid data in the fields'
    }
    if(this.Order_information  == ''){
      check = 1;
      message = 'Enter valid data in the fields'
    }


    if(check == 1){
      this.toastr.clear();
      this.toastr.error(message)

    }else{
      let a = {
        "_id": this.item_ids,
        "catagories_id": this.catagories_id,
        "cart_type": this.cart_type,
        "item_title": this.item_title,
        "item_descri": this.item_descri,
        "item_audio": this.item_audio,
        "item_image": this.item_image,
        "item_nature_status": this.item_nature_status,
        "item_tag_type": this.item_tag_type,
        "item_tag_name": this.item_tag_name,
        "Prices": this.Prices,
        "item_original_price": this.item_original_price,
        "item_discount_type": this.item_discount_type,
        "status": this.status,
        "Order_information": this.Order_information,
        "cart_count" : 0 ,
        "Tax" : this.Tax,
        "Delivery" : this.Delivery,
        "item_day_setting" : this.item_day_setting_arr,
        "item_time_start" : this.item_time_start,
        "item_time_end" : this.item_time_end,
        "item_day_type" : this.item_day_setting,
     }
       this._api.item_edit(a).subscribe(
         (response: any) => {
           console.log(response.Data);
           //  this.userList = response.Data;
           //  console.log(this.userList);
           this.toastr.clear();
           this.toastr.success("Item Updated Successfully")

           this.ngOnInit();
           this.cart_type= "";
           this.item_title= "";
           this.item_descri= "";
           this.item_audio  = "http://54.212.108.156:3000/api/uploads/2 Second Video.mp3";
           this.item_image = "http://54.212.108.156:3000/api/uploads/1615202125189.jpg";
           this.item_nature_status = "Nature";
           this.item_tag_type = false;
           this.item_tag_name = "";
           this.Prices = 0;
           this.item_original_price = 0;
           this.item_discount_type = false;
           this.status = true;
           this.Order_information = "";
           this.Tax = 0;
           this.Delivery = 0;
           this.Status = true;
           this.update_button = false;
          //  this.router.navigateByUrl('admin_panel/vendor_detail');
         }
         );
    }
  }

}
