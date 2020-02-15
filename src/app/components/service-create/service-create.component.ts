import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {

  constructor(private location:Location,private dataService:DataService,private router: Router) { }
  private serviceId:string;
  private serviceName:string;
  private serviceNameTh:string;
  private description:string;
  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }
  onAdd(){
    console.log(this.serviceId);
    console.log(this.serviceName);
    console.log(this.serviceNameTh);
    console.log(this.description);
    this.dataService.addService(this.serviceId,this.serviceName,this.serviceNameTh,this.description).subscribe(res=>{
      console.log(res);
      window.alert("เพิ่ม Service เรียบร้อย");
      this.router.navigateByUrl('service');
    })
  }  
}
