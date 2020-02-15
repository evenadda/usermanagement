import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mUsername:string = "";
  mPassword:string = "";
  constructor(private router:Router,private location:Location,private dataService:DataService) { }

  ngOnInit() {
  }

  onClickSubmit(){
    if(this.mUsername == "" || this.mPassword ==""){
      window.alert("กรุณากรอก Username หรือ Password");
    }else{
      if(this.mUsername == "admin" || this.mPassword =="password"){
        this.router.navigate(["/user"])
      }else{
        window.alert("กรุณาลองใหม่อีกครั้ง เนื่องจาก Username หรือ Password ไม่ถูกต้อง");
      }
      // this.dataService.login(this.mUsername,this.mPassword).subscribe(res=>{
      //   //console.log(res);
      //   //localStorage.setItem('id_token',res.token);
      //   //console.log("a");
      //   if(res.errCode == 0){
      //     location.reload();
      //     //console.log("b");
      //     this.router.navigate(["/user"])
      //     //console.log("c");
      //     //setTimeout(()=>{this.router.navigate(["/user"])},2000)
      //     //this.router.navigate(["/user"]);
      //   }else{
      //     window.alert("กรุณาลองใหม่อีกครั้ง เนื่องจาก Username หรือ Password ไม่ถูกต้อง");
      //   }
      // })
    }
    // if (this.mUsername == "admin" && this.mPassword == "1234"){
    //   this.router.navigate(["/dashboard"]);
    // }else{
    //   window.alert("Login Failed");
    // }
  }

}
