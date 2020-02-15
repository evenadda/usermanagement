import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  observer: Observable<Object>;
  tData;
  tID:any;
  constructor(private dataService:DataService,private location:Location,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.tID = params["id"];
      console.log(this.tID);
    });
    this.loadTeam();
  }
  goBack(){
    this.location.back();
  }
  loadTeam(){
    this.dataService.getTeam(this.tID).subscribe(res=>{
      this.tData = res.respData;
      console.log(this.tData);
    })
  }
  onEdit(){
    console.log(this.tData.teamId);
    console.log(this.tData.teamName);
    console.log(this.tData.teamNameTh);
    console.log(this.tData.description);
    this.dataService.updateTeam(this.tData.teamId,this.tData.teamName,this.tData.teamNameTh,this.tData.description).subscribe(res=>{
      console.log(res);
      window.alert("แก้ไขข้อมูล Team เรียบร้อย");
      this.router.navigateByUrl('team');
    });
  }

}
