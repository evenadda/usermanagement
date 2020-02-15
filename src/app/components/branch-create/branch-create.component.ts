import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-branch-create',
  templateUrl: './branch-create.component.html',
  styleUrls: ['./branch-create.component.css']
})
export class BranchCreateComponent implements OnInit {

  constructor(private location:Location,private dataService:DataService,private router: Router) { }
  private branchId:string;
  private branchName:string;
  private branchNameTh:string;
  private description:string;
  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
  onAdd(){
    console.log(this.branchId);
    console.log(this.branchName);
    console.log(this.branchNameTh);
    console.log(this.description);
    this.dataService.addBranch(this.branchId,this.branchName,this.branchNameTh,this.description).subscribe(res=>{
      console.log(res);
      window.alert("เพิ่ม Branch เรียบร้อย");
      this.router.navigateByUrl('branch');
    })
  }  
}
