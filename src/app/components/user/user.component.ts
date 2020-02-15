import { Component, OnInit, ViewChild, TemplateRef,ChangeDetectorRef } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataService } from '../../data.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private result:Array<any>;
  date: string;
  modalRef: BsModalRef;
  mData;
  mID:any;
  id:any;
  resStartWork: any;
  resLastWork: any;
  departmentArray: { [id: string]: any; } = {}; 
  branchArray: {[id: string]: any;} = {};
  teamArray: {[id: string]: any;} = {};
  //private departmentArray:Array<any>;
  private deptResult:Array<any>;
  private branchResult:Array<any>;
  private teamResult:Array<any>;
  
  //private departmentArray = {1:"IT",2:"Sales",3:"Research"};
  //private branchArray = {1:"HeadOffice",2:"Bangna",3:"Pinklao"};
  //private teamArray = {1:"A",2:"B",3:"C"}; 
  clients: any[];
  dataTable: any;
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private dataService:DataService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private chRef: ChangeDetectorRef
  ) { 
    this.onLoad();
    this.getDept();
    this.getBranch();
    this.getTeam();
  }       
  ngOnInit() {

  }
  getDept(){
    this.dataService.getAllDept().subscribe(res=>{
      this.deptResult = res.respData;
      for(let dept of this.deptResult){
        this.departmentArray[dept.deptId] = dept.deptName;
      }
      //console.log(this.departmentArray);
    });
  }
  getBranch(){
    this.dataService.getAllBranch().subscribe(res=>{
      this.branchResult = res.respData;
      for(let branch of this.branchResult){
        this.branchArray[branch.branchId] = branch.branchName;
      }
    });
  }
  getTeam(){
    this.dataService.getAllTeam().subscribe(res=>{
      this.teamResult = res.respData;
      for(let team of this.teamResult){
        this.teamArray[team.teamId] = team.teamName;
      }
      console.log(this.teamArray);
    });
  }  
  myFunc(){
    this.router.navigateByUrl('user-create');
   }
  openModal(template: TemplateRef<any>,id:string) {

    this.modalRef = this.modalService.show(template);
    this.dataService.getUser(id).subscribe(res=>{
      console.log(res);
      this.mData = res.respData;
      //console.log(res);
      this.resStartWork = this.mData.startWorkDate.substr(6,2)+"/"+this.mData.startWorkDate.substr(4,2)+"/"+this.mData.startWorkDate.substr(0,4);
      this.resLastWork = this.mData.lastWorkDate.substr(6,2)+"/"+this.mData.lastWorkDate.substr(4,2)+"/"+this.mData.lastWorkDate.substr(0,4);
      this.mData.socialNetwork = JSON.parse(this.mData.socialNetwork);
      //console.log(JSON.parse(this.mData.socialNetwork));
      //this.result = res;
      // this.mData = result;
      // this.uploadedImageSize = "100px";
    })

  }
  deleteModal(template2: TemplateRef<any>){
    this.modalRef = this.modalService.show(template2);
  }
  onLoad(){
    //location.reload();
    this.dataService.getAllUser().subscribe(res=>{
      this.result = res.respData;
      //console.log(res.respData);
      this.chRef.detectChanges();
      const table: any = $('#user');
      this.dataTable = table.DataTable({
        "columnDefs": [ {
          "targets": 'no-sort',
          "orderable": false
          } ]
      });
    });

  }
  onDelete(userId:string){
    if(confirm("Are you sure?")){
      this.dataService.DeleteUser(userId).subscribe(res=>{
        console.log(res);
        this.onLoad();
      });
    }
  }
  onEdit(id:string){
    console.log(id);
    this.router.navigate(["/user-edit/edit/" + id + "/mode/edit"]);
  }
}
