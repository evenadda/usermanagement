import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
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
    this.dataService.getAllBranch().subscribe(res=>{
      this.result = res.respData;
      console.log(res.respData);
    });
  }
  addBranch(){
    this.router.navigateByUrl('branch-create');
  }
  onEdit(id:string){
    this.router.navigate(["/branch-edit/"+id]);
  }
  onDelete(branchId:string){
    if(confirm("Are you sure?")){
      this.dataService.DeleteBranch(branchId).subscribe(res=>{
        this.onLoad();
      });
    }
  }      
}
