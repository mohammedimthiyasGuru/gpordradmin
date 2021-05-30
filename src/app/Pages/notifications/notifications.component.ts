import { Component, OnInit } from '@angular/core';
import { WebStorageService } from "ngx-web-storage";
import { ApiService } from '../../api.service';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  vendor_details : any;
  notification_list : any = [];
  notification_count : 0;
  notification_show = false;
  timeLeft: number = 5;
  interval;
  audio = new Audio();
  constructor(
    private storage: WebStorageService,
    private _api: ApiService,
  ) {
    this.vendor_details = this.storage.local.get('vendor_details');
    console.log(this.vendor_details);
    this.audio.src = "../../../assets/notification.mp3";
    clearInterval(this.interval);
    this.timeLeft = 5;
    this.startTimer();
   }


  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft);
        console.log(this.notification_count);
        if(this.notification_count !== 0){
          this.call_continue();
          console.log('calling');
          this.ngOnInit();
        }else{
          this.pauseTimer();
          console.log('calling');
          this.ngOnInit();
        }
      } else {
        this.timeLeft = 5;
      }
    },10000);
  }


  pauseTimer() {
    this.audio.pause();
  }

  shownotification(){
    if(this.notification_show == false){
      this.notification_show = true;
    }else{
      this.notification_show = false;
    }
  }




  ngOnInit(): void {
        this.vendor_details = this.storage.local.get('vendor_details');
        let c = {
          "vendor_id": this.vendor_details._id
          }
          this._api.notification_list(c).subscribe(
            (response: any) => {
              // console.log('response',response);
              this.notification_list  = response.Data.notification_list;
              console.log(this.notification_list);
              this.notification_count = this.notification_list.length;
              if(this.notification_count !== 0 ){
               this.notification_show = true;
              }
            }
            );
      }




       call_continue(){
        // let audio = new Audio();
        // audio.src = "../../../assets/notification.mp3";
        this.audio.load();
        this.audio.play();
       }



       notificationupdate(id) {
         let c = {
           _id : id,
           view_status : "Readed"
         }
         this._api.notification_update(c).subscribe(
          (response: any) => {
            this.ngOnInit();
          }
          );


         }



        //  back(){
        //   this.router.navigateByUrl('login/'+this.vendor_details.shop_link_name);
        // }

  }



