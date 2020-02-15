import { Component } from '@angular/core';
import { DataService } from "./data.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private result:Array<any>;
  private name:string;
  private detail:string;
  constructor(private dataService:DataService,private router: Router){
    //this.onLoad();
  }
  // onAdd(){
  //   this.dataService.addCourse(this.name,this.detail).subscribe(res=> {
  //     console.log(res);
  //     //this.onLoad();
  //     this.router.navigateByUrl('user');
  //   });
  // }
  // onDelete(name:string){
  //   this.dataService.deleteCourse(name).subscribe(res=>{
  //     console.log(res);
  //     this.onLoad();
  //   });
  // }
  // onLoad(){
  //   this.dataService.getCourse().subscribe(res=>{
  //     console.log(res);
  //     this.result = res;
  //   });
  // }
}
