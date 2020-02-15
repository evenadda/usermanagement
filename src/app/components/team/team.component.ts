import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
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
    this.dataService.getAllTeam().subscribe(res=>{
      this.result = res.respData;
      console.log(res.respData);
    });
  }
  addTeam(){
    this.router.navigateByUrl('team-create');
  }
  onEdit(id:string){
    this.router.navigate(["/team-edit/"+id]);
  }
  onDelete(teamId:string){
    if(confirm("Are you sure?")){
      this.dataService.DeleteTeam(teamId).subscribe(res=>{
        this.onLoad();
      });
    }
  }   
}
