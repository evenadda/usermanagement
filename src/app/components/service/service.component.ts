import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
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
    this.dataService.getAllService().subscribe(res=>{
      this.result = res.respData;
      console.log(res.respData);
    });
  }
  addService(){
    this.router.navigateByUrl('service-create');
  }
  onEdit(id:string){
    this.router.navigate(["/service-edit/"+id]);
  }
  onDelete(serviceId:string){
    if(confirm("Are you sure?")){
      this.dataService.DeleteService(serviceId).subscribe(res=>{
        this.onLoad();
      });
    }
  }      
}
