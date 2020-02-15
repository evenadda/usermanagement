import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  constructor(private location:Location,private dataService:DataService,private router: Router) { }
  private teamId:string;
  private teamName:string;
  private teamNameTh:string;
  private description:string;
  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
  onAdd(){
    console.log(this.teamId);
    console.log(this.teamName);
    console.log(this.teamNameTh);
    console.log(this.description);
    this.dataService.addTeam(this.teamId,this.teamName,this.teamNameTh,this.description).subscribe(res=>{
      console.log(res);
      window.alert("เพิ่ม Team เรียบร้อย");
      this.router.navigateByUrl('team');
    })
  }    
}
