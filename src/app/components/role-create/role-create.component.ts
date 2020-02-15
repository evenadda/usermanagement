import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  constructor(private location:Location,private dataService:DataService,private router: Router) { }
  private roleId:string;
  private roleNameTh:string;
  private roleName:string;
  private subRoleId:string;
  private privList:string;
  private description:string;
  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
  onAdd(){
    console.log(this.roleId);
    console.log(this.roleNameTh);
    console.log(this.roleName);
    console.log(this.subRoleId);
    console.log(this.privList);
    console.log(this.description);
    this.dataService.addRole(this.roleId,this.roleNameTh,this.roleName,this.subRoleId,this.privList,this.description).subscribe(res=> {
      console.log(res);
      window.alert("เพิ่ม Role เรียบร้อย");
      this.router.navigateByUrl('role');
    })
  }
}
