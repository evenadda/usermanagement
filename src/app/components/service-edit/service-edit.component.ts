import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
  observer: Observable<Object>;
  sData;
  sID:any;
  constructor(private dataService:DataService,private location:Location,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.sID = params["id"];
      console.log(this.sID);
    });
    this.loadService();
  }
  goBack(){
    this.location.back();
  }
  loadService(){
    this.dataService.getService(this.sID).subscribe(res=>{
      this.sData = res.respData;
      console.log(this.sData);
    })
  }
  onEdit(){
    console.log(this.sData.serviceId);
    console.log(this.sData.serviceName);
    console.log(this.sData.serviceNameTh);
    console.log(this.sData.description);
    this.dataService.updateService(this.sData.serviceId,this.sData.serviceName,this.sData.serviceNameTh,this.sData.description).subscribe(res=>{
      console.log(res);
      window.alert("แก้ไขข้อมูล Service เรียบร้อย");
      this.router.navigateByUrl('service');
    });
  }  
}
