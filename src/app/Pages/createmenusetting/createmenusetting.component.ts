import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WebStorageService } from "ngx-web-storage";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createmenusetting',
  templateUrl: './createmenusetting.component.html',
  styleUrls: ['./createmenusetting.component.css']
})
export class CreatemenusettingComponent implements OnInit {

  times : string = '1';
  other_time_visible = false;
  other_start_time : string = '01:00';
  other_end_time : string = '23:00';


  dates : string = '4';
  other_dates_visible = false;
  other_day_array = [];

  item_day_setting_arr1 = [];
  item_day_setting_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  daysboolean: 'true';

  item_day_setting : string = 'allday';

  item_time_start : string = '06:00';
  item_time_end : string = '12:00';
  vendor_details : any;


  final_datas = [];


  selected_data = [];


  imon = false;
  itue = false;
  iwed = false;
  ithu = false;
  ifri = false;
  istr = false;
  isun = false;



  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: WebStorageService,
    private _api: ApiService,
    private toastr: ToastrService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.other_time_visible = false;
    this.other_dates_visible = false;
    this.vendor_details = this.storage.local.get('vendor_details');
    console.log(this.vendor_details);
    let a = {
      _id: this.vendor_details._id
    }
    console.log(a);
    this._api.fetch_menu_setting(a).subscribe(
      (response: any) => {
        let g = 0;
        console.log(g);
        console.log(response.Data);
         let final_data = [];
         for(let a = 0 ; a < response.Data.length ; a ++){
           let con1 = response.Data[a];
              if(a == 0){
                console.log(g++);
                let c = {
                  Cat_id : con1.catagories_id._id,
                  Cat_name : con1.catagories_id.cat_title,
                  Item_details : [{
                    item_id : con1._id,
                    item_name : con1.item_title,
                  }]
                }
                final_data.push(c);
              }else{
                console.log(g++);
                let check = 0;
                    let da = final_data.length;
                    for(let d = 0 ; d < da ; d ++){
                      console.log(final_data[d].Cat_id,con1.catagories_id._id)
                       if(final_data[d].Cat_id == con1.catagories_id._id){
                         console.log('True');
                           check = 1;
                           let e = {
                            item_id : con1._id,
                            item_name : con1.item_title,
                           }
                        final_data[d].Item_details.push(e);
                       }
                       if(d == final_data.length - 1){
                         if(check == 0){
                          let c = {
                            Cat_id : con1.catagories_id._id,
                            Cat_name : con1.catagories_id.cat_title,
                            Item_details : [{
                              item_id : con1._id,
                              item_name : con1.item_title,
                            }]
                          }
                          final_data.push(c);
                         }
                       }
                    }
              }
              if(a == response.Data.length - 1){
                console.log(final_data);
                this.final_datas = final_data;
              }
         }


        // this.item_list = response.Data;
        // console.log(this.item_list);
      }
    );


  }


  onchangetime(data){
    if(data == '3'){
      this.other_time_visible = true;
    }else{
      this.other_time_visible = false;
      console.log(data);
      if(data == '2'){
        this.item_time_start = '12:00';
        this.item_time_end = '21:00';
      }else if(data == '1'){
        this.item_time_start = '06:00';
        this.item_time_end = '12:00';
      }
    }
  }


  onchangedate(data){
    if(data == '6'){
      this.other_dates_visible = true;
      this.other_day_array = [];
    }else{
      this.other_dates_visible = false;
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
    if(data == '6'){
      this.item_day_setting = 'manually';
      this.other_dates_visible = true;
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
      this.other_dates_visible = false;
    }
    if(data == '5'){
      this.item_day_setting = 'montofri';
      this.item_day_setting_arr = [];
      this.item_day_setting_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    }else if(data == '4'){
      this.item_day_setting = 'allday';
     this.item_day_setting_arr = [];
     this.item_day_setting_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }

    console.log(this.item_day_setting_arr);


   }


   updateaction(){
     console.log();
     if(this.item_day_setting == 'manually'){
      this.item_day_setting_arr = [];
      for(let a = 0 ; a < this.item_day_setting_arr1.length ; a++){
        if(this.item_day_setting_arr1[a].status == true){
          this.item_day_setting_arr.push(this.item_day_setting_arr1[a].Name);
        }
      }
    }
    console.log(this.item_time_start);
    console.log(this.item_time_end);
    console.log(this.item_day_setting);
    console.log(this.item_day_setting_arr);
    console.log(this.selected_data);
    if(this.selected_data.length == 0){
      this.toastr.clear();
      this.toastr.error("Please select the Items")

    }else{
      // update_time_date_time
      let a = {
        Item_details: this.selected_data,
        item_day_setting : this.item_day_setting_arr,
        item_time_start : this.item_time_start,
        item_time_end : this.item_time_end,
        item_day_type : this.item_day_setting,
      }
      console.log(a);
      this._api.update_date_time(a).subscribe(
        (response: any) => {
          this.toastr.clear();
      this.toastr.success("Date and Time Updated successfully")

          window.location.reload();
        }
      );
    }
   }

   Selecteditems(data1,data2){
    console.log(data1,data2);
    if(this.selected_data.length == 0){
       this.selected_data.push(data2);
    }else{
      let check = 0;
      let index = 0;
      let counts = this.selected_data.length;
      for(let a = 0 ; a < counts; a++){
          console.log(this.selected_data[a],data2);
          if(this.selected_data[a] == data2){
            check = 1;
            index = a;
            console.log('In');
          }
          if(a == this.selected_data.length - 1 ){
            console.log(check);
          if(check == 1){
            console.log("slice");
            this.selected_data.splice(index,1);
          } else{
            this.selected_data.push(data2);
          }
          }
      }
    }
    console.log(this.selected_data);
   }



}
