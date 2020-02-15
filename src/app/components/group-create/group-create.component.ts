import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  private groupId:string;
  private groupNameTh:string;
  private groupName:string;
  private subGroupId:string;
  private menuList:string;
  private description:string;
  constructor(private location:Location,private dataService:DataService,private router: Router) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
  onAdd(){
    console.log(this.groupId);
    console.log(this.groupNameTh);
    console.log(this.groupName);
    console.log(this.subGroupId);
    console.log(this.menuList);
    console.log(this.description);
    this.dataService.addGroup(this.groupId,this.groupNameTh,this.groupName,this.subGroupId,this.menuList,this.description).subscribe(res=> {
      
      console.log(res);
      window.alert("เพิ่ม Group เรียบร้อย");
      this.router.navigateByUrl('group');
    });
  }
}
