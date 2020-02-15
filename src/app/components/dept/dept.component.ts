import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {
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
    this.dataService.getAllDept().subscribe(res=>{
      this.result = res.respData;
      console.log(res.respData);
    });
  }
  addDept(){
    this.router.navigateByUrl('dept-create');
  }
  onEdit(id:string){
    this.router.navigate(["/dept-edit/"+id]);
  } 
  onDelete(deptId:string){
    if(confirm("Are you sure?")){
      this.dataService.DeleteDept(deptId).subscribe(res=>{
        this.onLoad();
      });
    }
  } 
}
