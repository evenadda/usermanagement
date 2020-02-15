import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {
  observer: Observable<Object>;
  bData;
  bID:any;
  constructor(private dataService:DataService,private location:Location,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.bID = params["id"];
      console.log(this.bID);
    });
    this.loadBranch();
  }
  goBack(){
    this.location.back();
  }
  loadBranch(){
    this.dataService.getBranch(this.bID).subscribe(res=>{
      this.bData = res.respData;
      console.log(this.bID);
    })
  }
  onEdit(){
    console.log(this.bData.branchId);
    console.log(this.bData.branchName);
    console.log(this.bData.branchNameTh);
    console.log(this.bData.description);
    this.dataService.updateBranch(this.bData.branchId,this.bData.branchName,this.bData.branchNameTh,this.bData.description).subscribe(res=>{
      console.log(res);
      window.alert("แก้ไขข้อมูล Branch เรียบร้อย");
      this.router.navigateByUrl('branch');
    });
  }  
}
