import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-dept-create',
  templateUrl: './dept-create.component.html',
  styleUrls: ['./dept-create.component.css']
})
export class DeptCreateComponent implements OnInit {

  constructor(private location:Location,private dataService:DataService,private router: Router) { }
  private deptId:string;
  private deptName:string;
  private deptNameTh:string;
  private description:string;
  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
  onAdd(){
    console.log(this.deptId);
    console.log(this.deptName);
    console.log(this.deptNameTh);
    console.log(this.description);
    this.dataService.addDept(this.deptId,this.deptName,this.deptNameTh,this.description).subscribe(res=>{
      console.log(res);
      window.alert("เพิ่ม Department เรียบร้อย");
      this.router.navigateByUrl('dept');
    })
  }
}
