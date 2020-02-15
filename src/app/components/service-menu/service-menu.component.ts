import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.css']
})
export class ServiceMenuComponent implements OnInit {
  private result:Array<any>;
  constructor(
    private router: Router,
    private dataService:DataService,
  ) { 
    this.onLoad();
  }

  ngOnInit() {

  }
  onLoad(){
    this.dataService.getAllMenuService().subscribe(res=>{
      this.result = res.respData;
      console.log(res.respData);
    });
  }
}
