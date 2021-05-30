import { Component, OnInit } from '@angular/core';
import { WebStorageService } from "ngx-web-storage";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  vendor_details : any;
  show_visible : any = false;


  constructor( private storage: WebStorageService,) {

    this.vendor_details = this.storage.local.get('vendor_details');
    console.log(this.vendor_details);

    let login_status = this.storage.local.get('login_status');
    console.log(login_status);
    if(login_status == null){
      this.show_visible = false;
    }else{
      this.show_visible = true;
    }
   }

  ngOnInit(): void {

  }

}
