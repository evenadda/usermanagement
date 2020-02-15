import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
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
    this.dataService.getAllGroup().subscribe(res=>{
      this.result = res.respData;
      console.log(res.respData);
    });
  }
  addGroup(){
    this.router.navigateByUrl('group-create');
   }
   onDelete(groupId:string){
    if(confirm("Are you sure?")){
      this.dataService.DeleteGroup(groupId).subscribe(res=>{
        console.log(res);
        this.onLoad();
      });
    }
  }
  onEdit(id:string){
    console.log(id);
    this.router.navigate(["/group-edit/" + id]);
  }
}
