import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
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
    this.dataService.getAllRole().subscribe(res=>{
      this.result = res.respData;
      console.log(res.respData);
    });
  }
  addRole(){
    this.router.navigateByUrl('role-create');
  }
  onDelete(roleId:string){
    if(confirm("Are you sure?")){
      this.dataService.DeleteRole(roleId).subscribe(res=>{
        //console.log(res);
        this.onLoad();
      });
    }
  }
  onEdit(id:string){
    this.router.navigate(["/role-edit/edit/" + id]);
  }  
}
