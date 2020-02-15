import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  observer: Observable<Object>;
  rData;
  rID:any;
  constructor(private dataService:DataService,private location:Location,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.rID = params["id"];
      console.log(this.rID);
    });
    this.loadRole();
  }
  goBack(){
    this.location.back();
  }
  loadRole(){
    this.dataService.getRole(this.rID).subscribe(res=>{
      this.rData = res.respData
      console.log(this.rData);
    })
  }
  onEdit(){
    console.log(this.rData.roleId);
    console.log(this.rData.roleNameTh);
    console.log(this.rData.roleName);
    console.log(this.rData.supRoleId);
    console.log(this.rData.privList);
    console.log(this.rData.description);

    this.dataService.updateRole(this.rData.roleId,this.rData.roleNameTh,this.rData.roleName,this.rData.supRoleId,this.rData.privList,this.rData.description).subscribe(res=> {
      console.log(res);
      window.alert("แก้ไขข้อมูล Role เรียบร้อย");
      this.router.navigateByUrl('role');
    });
  }
}
