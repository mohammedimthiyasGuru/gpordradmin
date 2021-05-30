import { Component, OnInit } from '@angular/core';
import { WebStorageService } from "ngx-web-storage";
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  vendor_details : any;
  links : any;
  show_visible : boolean = false;

   showstatus : boolean = true;

  constructor(
    private storage: WebStorageService,
  ) { }

  ngOnInit(): void {

    this.vendor_details = this.storage.local.get('vendor_details');
    console.log(this.vendor_details.shop_name);
    let login_status = this.storage.local.get('login_status');
    console.log(login_status);
    if(login_status == null){
      this.show_visible = false;
    }else{
      this.show_visible = true;
    }


    this.links = '/#/ordr/productadd/' + this.vendor_details._id;

    if(this.vendor_details.shop_name == 'Ordr Admin'){
      this.showstatus  = true;
    }else{
      this.showstatus  = false;
    }


  }

}
