import { Component } from '@angular/core';
import { WebStorageService } from "ngx-web-storage";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  vendor_details : any;
  show_visible : boolean = false;

  constructor(
    private storage: WebStorageService,
  ) {
    this.vendor_details = this.storage.local.get('vendor_details');
    let login_status = this.storage.local.get('login_status');
    console.log(login_status);
    if(login_status == null){
      this.show_visible = false;
    }else{
      this.show_visible = true;
    }
   }


  title = 'ordradmin';
}
