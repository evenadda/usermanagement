import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };
  myOptions2: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };
  // Initialized to specific date (09.10.2018)
  model: any = { };
  model2: any = { };
  private result:Array<any>;
  private userid:string;
  private nameTh:string;
  private userNameEn:string;
  private deptId:string= null;
  private teamId:string= null;
  private branchId:string= null;
  private groupId:string= null;
  private supUserId:string;
  private phone:string;
  private mobile:string;
  private email:string;
  private socialNetwork:Object;
  private activeFlag:string;
  private startdate: string; 
  private lastdate:string;
  private remark:string;
  private facebook:string;
  private line:string;
  private departmentArray:Array<any>;
  private branchArray:Array<any>;
  private teamArray:Array<any>;
  private groupArray:Array<any>;
  // departmentArray = [
  //   {name: 'IT', code: '1'},
  //   {name: 'Sales', code: '2'},
  //   {name: 'Research', code: '3'}
  // ];
  // branchArray = [
  //   {name: 'HeadOffice', code: '1'},
  //   {name: 'Bangna', code: '2'},
  //   {name: 'Pinklao', code: '3'}
  // ];
  // teamArray = [
  //   {name: 'A', code: '1'},
  //   {name: 'B', code: '2'},
  //   {name: 'C', code: '3'}
  // ];
  constructor(private location:Location,private dataService:DataService,private router: Router) { 
    this.dataService.getAllDept().subscribe(res=>{
      this.departmentArray = res.respData;
    });
    this.dataService.getAllBranch().subscribe(res=>{
      this.branchArray = res.respData;
    });
    this.dataService.getAllTeam().subscribe(res=>{
      this.teamArray = res.respData;
    });
    this.dataService.getAllGroup().subscribe(res=>{    
      this.groupArray = res.respData;
      //console.log(this.groupArray);
    });
  }

  ngOnInit() {
  }
  onDateChange(newDate: Date) {
    //console.log(newDate);
  }
  goBack(){
    //window.alert("test");
    this.location.back();
  }
  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
      // date selected
  }
  onDateChanged2(event: IMyDateModel): void {
    // date selected
  }

  // onAdd(this.username,this.nameTh,this.department){
  //   //window.alert("test");
  //   this.dataService.addUser().subscribe(data=> {
  //     var result = JSON.parse(data)
  //     if(result.respCode == 0){
  //       window.alert("เพิ่ม User เรียบร้อย");
  //       this.router.navigateByUrl('user');
  //     }else if(result.respCode == -9){
  //       window.alert("ผู้ใช้งานนี้มีในระบบแล้ว");
  //     }else{
  //       window.alert(result.respDesc);
  //     }

  //   });
  // }
  //this.userid,this.nameTh,this.userNameEn,this.deptId,this.teamId,this.branchId,this.supUserId,this.phone,this.mobile,this.email,this.socialNetwork,this.activeFlag,this.startdate,this.lastdate
  onAdd(){

 
    const getstartdate = JSON.stringify(this.startdate);

    const objGetStartDate = JSON.parse(getstartdate);
    const splitStartDate = objGetStartDate.formatted.split("/")[2]+objGetStartDate.formatted.split("/")[1]+objGetStartDate.formatted.split("/")[0];
    this.startdate = splitStartDate.toString();
    
    const getlastdate = JSON.stringify(this.lastdate);
    const objGetLastDate = JSON.parse(getlastdate);
    const splitLastDate = objGetLastDate.formatted.split("/")[2]+objGetLastDate.formatted.split("/")[1]+objGetLastDate.formatted.split("/")[0];
    this.lastdate = splitLastDate.toString();

    const socialNetwork = {};
    socialNetwork['facebook'] = this.facebook;
    socialNetwork['line'] = this.line;


    this.dataService.addUser(this.userid,this.nameTh,this.userNameEn,this.deptId,this.teamId,this.branchId,this.supUserId,this.phone,this.mobile,this.email,socialNetwork,this.activeFlag,this.startdate,this.lastdate,this.remark).subscribe(res=> {
      if(res.errCode == 0){
        console.log(res);
        // this.dataService.userGroup(this.userid,this.groupId).subscribe(response=>{
        // });
        this.dataService.userGroup(this.userid,this.groupId).subscribe(response=>{
              console.log(response.respData);
              window.alert("เพิ่ม User เรียบร้อย");
              this.router.navigateByUrl('user');
        });
      }else{
        console.log(res);
        window.alert("เพิ่ม User ไม่สำเร็จ กรุณาลองใหม่");
        this.router.navigateByUrl('user');
      }
      
      // window.alert("เพิ่ม User เรียบร้อย");
      // this.router.navigateByUrl('user');
    });
  }
  // onDepartmentLoad(){
  //   this.dataService.getAllDept().subscribe(res=>{
  //     this.departmentArray = res.respData;
  //   });
  // }
}
