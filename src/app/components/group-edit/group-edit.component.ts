import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  observer: Observable<Object>;
  gData;
  gID:any;
  constructor(private dataService:DataService,private location:Location,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gID = params["id"];
      this.observer = this.dataService.getUser(this.gID);
    });
    this.loadGroup();
  }
  goBack(){
    this.location.back();
  }
  loadGroup(){
    this.dataService.getGroup(this.gID).subscribe(res=>{
      this.gData = res.respData
      console.log(this.gData);
    })
  }
  onEdit(){
    console.log(this.gData.groupId);
    console.log(this.gData.groupNameTh);
    console.log(this.gData.groupName);
    console.log(this.gData.supGroupId);
    console.log(this.gData.menuList);
    console.log(this.gData.description);
    //updateGroup
    this.dataService.updateGroup(this.gData.groupId,this.gData.groupNameTh,this.gData.groupName,this.gData.supGroupId,this.gData.menuList,this.gData.description).subscribe(res=> {
      console.log(res);
      window.alert("แก้ไขข้อมูล Group เรียบร้อย");
      this.router.navigateByUrl('group');
    });
  }
}
