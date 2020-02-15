import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-dept-edit',
  templateUrl: './dept-edit.component.html',
  styleUrls: ['./dept-edit.component.css']
})
export class DeptEditComponent implements OnInit {
  observer: Observable<Object>;
  dData;
  dID:any;
  constructor(private dataService:DataService,private location:Location,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(){
    this.route.params.subscribe(params =>{
      this.dID = params["id"];
      console.log(this.dID);
    });
    this.loadDept();
  }
  goBack(){
    this.location.back();
  }
  loadDept(){
    this.dataService.getDept(this.dID).subscribe(res=>{
      this.dData = res.respData
      console.log(this.dData);
    })
  }
  onEdit(){
    console.log(this.dData.deptId);
    console.log(this.dData.deptNameTh);
    console.log(this.dData.deptName);
    console.log(this.dData.description);
    this.dataService.updateDept(this.dData.deptId,this.dData.deptName,this.dData.deptNameTh,this.dData.description).subscribe(res=>{
      console.log(res);
      window.alert("แก้ไขข้อมูล Department เรียบร้อย");
      this.router.navigateByUrl('dept');
    });
  }
}
