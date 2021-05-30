import { Component, OnInit } from '@angular/core';
import { WebStorageService } from "ngx-web-storage";

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  constructor(
    private storage: WebStorageService,
  ) {
    let count = this.storage.local.get('load_count');
    console.log(count);
    if(count == 0){
      window.location.reload();
      this.storage.local.set('load_count',1);
    }


   }

  ngOnInit(): void {

  }


}
