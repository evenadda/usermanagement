import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataService } from '../../data.service';
import { Location } from '@angular/common';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  mMode:string = "edit";
  testObserver: Observable<Object>;
  mData;
  mID:any;
  year:string;
  month:string;
  day:string;
  startWorkEdit:any;
  lastWorkEdit:any;
  lastWorkYear:string;
  lastWorkMonth:string;
  lastWorkDay:string;
  socialNetwork:Object;
  email:string;
  private departmentArray:Array<any>;
  private branchArray:Array<any>;
  private teamArray:Array<any>;
  startWorkUpdateSave:string;
  startWorkDayUpdate:string;
  startWorkMonthUpdate:string;

  lastWorkUpdateSave:string;
  lastWorkDayUpdate:string;
  lastWorkMonthUpdate:string;

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };
  myOptions2: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  //private result:Array<any>;
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
  private deptResult:Array<any>;
  constructor(private dataService:DataService,private location:Location,private route:ActivatedRoute,private router: Router) 
  { 
    this.dataService.getAllDept().subscribe(res=>{
      this.departmentArray = res.respData;
      console.log(this.departmentArray);
    });
    this.dataService.getAllBranch().subscribe(res=>{
      this.branchArray = res.respData;
    });
    this.dataService.getAllTeam().subscribe(res=>{
      this.teamArray = res.respData;
    }); 
  }

  ngOnInit() {
    
    //console.log("test");
    this.route.params.subscribe(params => {
      this.mID = params["id"];
      this.mMode = params["mode"];
      

      this.testObserver = this.dataService.getUser(this.mID);
      
    });
    //this.mID = "5b111f29a20e6b1a842fcbbb";
    this.loadUser();
    
  }
  onDateChanged(event: IMyDateModel): void {
    // date selected
  }
  onDateChanged2(event: IMyDateModel): void {
    // date selected
  }
  loadUser(){
    
    // this.dataService.getCourse().subscribe(res=>{
    //   this.result = res;
    // });

    this.dataService.getUser(this.mID).subscribe(res=>{
      
      this.mData = res.respData
      this.startWorkEdit = this.mData.startWorkDate;
      this.lastWorkEdit = this.mData.lastWorkDate;
      //console.log(this.lastWorkEdit);

      this.year = this.startWorkEdit.substring(0,4);
      this.month = this.startWorkEdit.substring(4,6);
      this.day = this.startWorkEdit.substring(6,8);

      this.lastWorkYear = this.lastWorkEdit.substring(0,4);
      this.lastWorkMonth = this.lastWorkEdit.substring(4,6);
      this.lastWorkDay = this.lastWorkEdit.substring(6,8);

      if(this.day[0] == "0"){
        this.day = this.day[1];
      }
      if(this.month[0] == "0"){
        this.month = this.month[1];
      }

      if(this.lastWorkDay[0] == "0"){
        this.lastWorkDay = this.lastWorkDay[1];
      }
      if(this.lastWorkMonth[0] == "0"){
        this.lastWorkMonth = this.lastWorkMonth[1];
      }

      this.startWorkEdit= { date: { year: this.year, month: this.month, day: this.day } };
      this.lastWorkEdit = { date: { year: this.lastWorkYear, month: this.lastWorkMonth, day: this.lastWorkDay } };
      this.mData.socialNetwork = JSON.parse(this.mData.socialNetwork);
      console.log(this.mData);
    })
    
  }
  goBack(){
    //window.alert("test");
    this.location.back();
  }
  onEdit(){
    // console.log(this.mData.userId);
    // console.log(this.mData.userName);
    // console.log(this.mData.deptId);
    // console.log(this.mData.branchId);
    // console.log(this.mData.phone);
    // console.log(this.startWorkEdit);
    // console.log(this.mData.socialNetwork.facebook);
    // console.log(this.mData.activeFlag);
    // console.log(this.mData.email);
    // console.log(this.mData.userNameEn);
    // console.log(this.mData.teamId);
    // console.log(this.mData.supUserId);
    // console.log(this.mData.mobile);
    // console.log(this.lastWorkEdit);
    // console.log(this.mData.socialNetwork.line);
    // console.log(this.mData.remark);
    
    //const getstartdate = JSON.stringify(this.startWorkEdit);
    //const objGetStartDate = JSON.parse(getstartdate);
    // console.log(this.startWorkEdit.date.year);
    // console.log(this.startWorkEdit.date.month.toString().length);
    // console.log(this.startWorkEdit.date.day.toString().length);

    if(this.startWorkEdit.date.month.toString().length == 1){
      this.startWorkMonthUpdate = "0"+ this.startWorkEdit.date.month.toString();
    }else{
      this.startWorkMonthUpdate = this.startWorkEdit.date.month.toString();
    }
    if(this.startWorkEdit.date.day.toString().length == 1){
      this.startWorkDayUpdate = "0"+ this.startWorkEdit.date.day.toString();
    }else{
      this.startWorkDayUpdate = this.startWorkEdit.date.day.toString();
    }
    this.startWorkUpdateSave = this.startWorkEdit.date.year.toString()+this.startWorkMonthUpdate+this.startWorkDayUpdate;


    if(this.lastWorkEdit.date.month.toString().length == 1){
      this.lastWorkMonthUpdate = "0"+ this.lastWorkEdit.date.month.toString();
    }else{
      this.lastWorkMonthUpdate = this.lastWorkEdit.date.month.toString();
    }
    if(this.lastWorkEdit.date.day.toString().length == 1){
      this.lastWorkDayUpdate = "0"+ this.lastWorkEdit.date.day.toString();
    }else{
      this.lastWorkDayUpdate = this.lastWorkEdit.date.day.toString();
    }
    this.lastWorkUpdateSave = this.lastWorkEdit.date.year.toString()+this.lastWorkMonthUpdate+this.lastWorkDayUpdate;
    //console.log(this.lastWorkUpdateSave);


    const socialNetwork = {};
    socialNetwork['facebook'] = this.mData.socialNetwork.facebook;
    socialNetwork['line'] = this.mData.socialNetwork.line;
    this.socialNetwork = socialNetwork;



    // this.mData.userId = "33";
    // this.mData.userName = "แดง แดนไทย";
    // this.mData.userNameEn = "Dang Danthai";
    // this.mData.deptId = "1";
    // this.mData.teamId = "1";
    // this.mData.branchId = "1";
    // this.mData.supUserId = "99";
    // this.mData.phone = "9999";
    // this.mData.mobile = "0809999999";
    // this.mData.email = "dang.da@bualuang.com";
    // this.mData.socialNetwork = "00";
    // this.mData.activeFlag = "Y";
    
    this.dataService.updateUser(this.mData.userId,this.mData.userName,this.mData.userNameTh,this.mData.deptId,this.mData.teamId,this.mData.branchId,this.mData.supUserId,this.mData.phone,this.mData.mobile,this.mData.email,this.socialNetwork,this.mData.activeFlag,this.startWorkUpdateSave,this.lastWorkUpdateSave,this.mData.remark).subscribe(res=> {
    // this.dataService.updateUser(this.mData.userId,this.mData.userName,this.mData.userNameEn,this.mData.deptId,this.mData.teamId,this.mData.branchId,this.mData.supUserId,this.mData.phone,this.mData.mobile,this.mData.email,this.socialNetwork,this.mData.activeFlag,this.mData.startdate,this.lastWorkUpdateSave,this.mData.remark).subscribe(res=> {
      // console.log(this.mData.userNameEn);
      // console.log(this.mData.userName);
      window.alert("แก้ไขข้อมูล User เรียบร้อย");
      this.router.navigateByUrl('user');
    });
    //window.alert("เพิ่ม User เรียบร้อย");
    // this.dataService.updateUser(this.mData.userid).subscribe(res=> {
    //   console.log(res);
    // });
  }
}
