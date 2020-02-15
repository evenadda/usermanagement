import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {
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
    this.dataService.getAllGroup().subscribe(res=>{
      this.result = res.respData;
      console.log(res.respData);
    });
  }
}
