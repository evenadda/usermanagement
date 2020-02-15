import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class DataService {
  private productUrl = `http://localhost:8081/api/show`;  
  private url = `http://165.5.40.181:3000`;
  
  //private jwt = localStorage.getItem('id_token');
  private headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': 'Bearer '+localStorage.getItem('id_token')
  }
  private headerDictPost = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': 'Bearer '+localStorage.getItem('id_token')
  }
  private requestOptions = { headers: new Headers(this.headerDict), };
  private requestOptionsPost = { headers: new Headers(this.headerDictPost), };
  
  constructor(private http:Http) { }

  login(username:string,password:string){
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password); // .toString() => username=abc&password=abc
    //return this.http.post('http://165.5.40.181:3000/auth/login',params.toString(), {headers}).map(res=>res.json())
    return this.http.post(this.url+"/auth/login",params.toString(), {headers}).map(res=>
      //res.json(){}
      {
        if(res.json().errCode == 0){
          console.log("11111");
          localStorage.setItem('id_token',res.json().token);
          return res.json();
        }else{
          console.log("2");
          return res.json();
        }
      }

    );
    // return this.http.post(this.url+"/auth/login",params.toString(), {headers}).map(res=>{
    //   if(res.errCode == 0){
    //     localStorage.setItem('id_token',res.token);
    //   }
    // });
      // {
      //   if(res.errCode == 0){
      //     res.json())
      //   }
      // }
      
  }
  getAllUser(){
    //console.log(localStorage.getItem('id_token'));
    return this.http.get(this.url+"/users", this.requestOptions).map(res=>res.json())
  }
  getCourse(){
    return this.http.get('http://localhost:8081/api/show').map(res=>res.json().message);
    //return this.http.get<any[]>(this.productUrl, {headers: this.headers });
  }

  // addUsertoMongo(userid:string,nameTh:string,userNameEn:string,deptId:string,teamId:string,branchId:string,supUserId:number,phone:number,mobile:number,email:string,socialNetwork:object,activeFlag:string,startdate:string,lastdate:string,remark:string){
    
  //   const data = {userid : userid,nameTh :nameTh,userNameEn : userNameEn, deptId:deptId, teamId:teamId, branchId:branchId, supUserId:supUserId,phone:phone, mobile:mobile, email:email, socialNetwork:socialNetwork, activeFlag:activeFlag, startWorkDate:startdate, lastWorkDate:lastdate, remark:remark};
  //   //console.log(data);
  //   return this.http.post('http://localhost:8081/api/add', data).map(res=>res.json().message)
  // }
  deleteCourse(username:string){
    return this.http.delete('http://localhost:8081/api/delete/' + username).map(res=>res.json().message)
  }
  getUser(id:string){

   //const url = `${"http://165.5.40.181:3000/users"}/${id}`;
    const url = this.url+"/users/"+`${id}`;
    return this.http.get(url, this.requestOptions).map(res=>res.json());
  }
  // addUser(username:string,nameTh:string,department:string){
  //   const data = {username : username,nameTh :nameTh,department : department};
  //   //return this.http.post('http://localhost:8081/api/add', data).map(res=>res.json().message)
  //   return this.http.post('http://localhost:8081/api/addUser',data).map(res=>res.json().message)
  // }
  updateUser(userid:string,userName:string,userNameTh:string,deptId:string,teamId:string,branchId:string,supUserId:string,phone:string,mobile:string,email:string,socialNetwork:any,activeFlag:string,startdate:string,lastdate:string,remark:string){

    const params = new URLSearchParams();
    //params.append('userId', userid);
    params.append('userName', userName);
    params.append('userNameTh', userNameTh); 
    params.append('deptId', deptId); 
    params.append('teamId', teamId);
    params.append('branchId', branchId); 
    params.append('supUserId', supUserId);
    params.append('phone', phone); 
    params.append('mobile', mobile);
    params.append('email', email); 
    params.append('socialNetwork',JSON.stringify(socialNetwork));
    params.append('activeFlag', activeFlag); 
    params.append('startWorkDate', startdate);
    params.append('lastWorkDate', lastdate); 
    params.append('remark', remark); 

    //console.log(JSON.stringify(socialNetwork));
    const url = this.url+"/users/"+`${userid}`;
    return this.http.patch(url, params.toString(), this.requestOptionsPost).map(res=>res.json())
  }

  addUser(userid:string,nameTh:string,userNameEn:string,deptId:string,teamId:string,branchId:string,supUserId:string,phone:string,mobile:string,email:string,socialNetwork:any,activeFlag:string,startdate:string,lastdate:string,remark:string){
    //console.log(socialNetwork);
    const params = new URLSearchParams();
    params.append('userId', userid);
    params.append('userName', userNameEn); 
    params.append('userNameTh', nameTh);
    params.append('deptId', deptId); 
    params.append('teamId', teamId);
    params.append('branchId', branchId); 
    params.append('supUserId', supUserId);
    params.append('phone', phone); 
    params.append('mobile', mobile);
    params.append('email', email); 
    params.append('socialNetwork',JSON.stringify(socialNetwork));
    params.append('activeFlag', activeFlag); 
    params.append('startWorkDate', startdate);
    params.append('lastWorkDate', lastdate); 
    params.append('remark', remark); 

    return this.http.post('http://165.5.40.181:3000/users', params.toString(), this.requestOptionsPost).map(res=>res.json())
  }
  DeleteUser(userid:string){
    const params = new URLSearchParams();
    params.append('activeFlag', "N");

    const url = this.url+"/users/"+`${userid}`+"/status";
    return this.http.patch(url, params.toString(), this.requestOptionsPost).map(res=>res.json())
  }
  getAllGroup(){
    return this.http.get(this.url+"/groups", this.requestOptions).map(res=>res.json())
  }
  addGroup(groupId:string,groupNameTh:string,groupName:string,subGroupId:string,menuList:string,description:string){
    //console.log(socialNetwork);
    const params = new URLSearchParams();
    params.append('groupId', groupId);
    params.append('groupName', groupNameTh); 
    params.append('groupNameTh', groupName);
    params.append('supGroupId', subGroupId); 
    params.append('menuList', menuList);
    params.append('description', description); 
    params.append('delFlag', "N");


    return this.http.post('http://165.5.40.181:3000/groups', params.toString(), this.requestOptionsPost).map(res=>res.json())
  }
  DeleteGroup(groupId:string){
    const url = this.url+"/groups/"+`${groupId}`;
    return this.http.delete(url, this.requestOptionsPost).map(res=>res.json())
  }
  getGroup(id:string){

    //const url = `${"http://165.5.40.181:3000/users"}/${id}`;
     const url = this.url+"/groups/"+`${id}`;
     return this.http.get(url, this.requestOptions).map(res=>res.json());
   }
   updateGroup(groupId:string,groupNameTh:string,groupName:string,supGroupId:string,menuList:string,description:string){
    const params = new URLSearchParams();

    params.append('groupName', groupName); 
    params.append('groupNameTh', groupNameTh);
    params.append('supGroupId', supGroupId); 
    params.append('menuList', menuList);
    params.append('description', description); 

    const url = this.url+"/groups/"+`${groupId}`;
    return this.http.patch(url, params.toString(), this.requestOptionsPost).map(res=>res.json())
  }
  getAllRole(){
    return this.http.get(this.url+"/roles", this.requestOptions).map(res=>res.json())
  }
  addRole(roleId:string,roleNameTh:string,roleName:string,subRoleId:string,privList:string,description:string){
    //console.log(socialNetwork);
    const params = new URLSearchParams();
    params.append('roleId', roleId);
    params.append('roleName', roleNameTh); 
    params.append('roleNameTh', roleName);
    params.append('supRoleId', subRoleId); 
    params.append('privList', privList);
    params.append('description', description); 
    params.append('delFlag', "N");


    return this.http.post(this.url+"/roles", params.toString(), this.requestOptionsPost).map(res=>res.json())
  }
  DeleteRole(roleId:string){
    const url = this.url+"/roles/"+`${roleId}`;
    return this.http.delete(url, this.requestOptionsPost).map(res=>res.json())
  }
  getRole(id:string){
     const url = this.url+"/roles/"+`${id}`;
     return this.http.get(url, this.requestOptions).map(res=>res.json());
  }
  updateRole(roleId:string,roleNameTh:string,roleName:string,supRoleId:string,privList:string,description:string){
    const params = new URLSearchParams();

    params.append('roleName', roleName); 
    params.append('roleNameTh', roleNameTh);
    params.append('supRoleId', supRoleId); 
    params.append('privList', privList);
    params.append('description', description); 

    const url = this.url+"/roles/"+`${roleId}`;
    return this.http.patch(url, params.toString(), this.requestOptionsPost).map(res=>res.json())
  }
  getAllDept(){
    return this.http.get(this.url+"/depts", this.requestOptions).map(res=>res.json())
  }
  addDept(deptId:string,deptName:string,deptNameTh:string,description:string){
    const params = new URLSearchParams();
    params.append('deptId',deptId);
    params.append('deptName',deptName);
    params.append('deptNameTh',deptNameTh);
    params.append('description',description);
    params.append('delFlag', "N");

    return this.http.post(this.url+"/depts",params.toString(),this.requestOptionsPost).map(res=>res.json())
  }
  getDept(id:string){
    const url = this.url+"/depts/"+`${id}`;
    return this.http.get(url, this.requestOptions).map(res=>res.json());
 }
 updateDept(deptId:string,deptName:string,deptNameTh:string,description:string){
  const params = new URLSearchParams();
  params.append('deptId', deptId); 
  params.append('deptName', deptName);
  params.append('deptNameTh', deptNameTh); 
  params.append('description', description);

  const url = this.url+"/depts/"+`${deptId}`;
  return this.http.patch(url, params.toString(), this.requestOptionsPost).map(res=>res.json())
 }
 DeleteDept(deptId:string){
  const url = this.url+"/depts/"+`${deptId}`;
  return this.http.delete(url,this.requestOptionsPost).map(res=>res.json())
 }
 getAllTeam(){
  return this.http.get(this.url+"/teams", this.requestOptions).map(res=>res.json())
  }
  addTeam(teamId:string,teamName:string,teamNameTh:string,description:string){
    const params = new URLSearchParams();
    params.append('teamId',teamId);
    params.append('teamName',teamName);
    params.append('teamNameTh',teamNameTh);
    params.append('description',description);
    params.append('delFlag', "N");

    return this.http.post(this.url+"/teams",params.toString(),this.requestOptionsPost).map(res=>res.json())
  }
  getTeam(id:string){
    const url = this.url+"/teams/"+`${id}`;
    return this.http.get(url, this.requestOptions).map(res=>res.json());
  }
  updateTeam(teamId:string,teamName:string,teamNameTh:string,description:string){
    const params = new URLSearchParams();
    params.append('teamId',teamId);
    params.append('teamName',teamName);
    params.append('teamNameTh',teamNameTh);
    params.append('description',description);

    const url = this.url+"/teams/"+`${teamId}`;
    return this.http.patch(url, params.toString(), this.requestOptionsPost).map(res=>res.json())
  }
  DeleteTeam(teamId:string){
    const url = this.url+"/teams/"+`${teamId}`;
    return this.http.delete(url,this.requestOptionsPost).map(res=>res.json())
  }
  getAllBranch(){
    return this.http.get(this.url+"/branches", this.requestOptions).map(res=>res.json())
  }
  addBranch(branchId:string,branchName:string,branchNameTh:string,description:string){
    const params = new URLSearchParams();
    params.append('branchId',branchId);
    params.append('branchName',branchName);
    params.append('branchNameTh',branchNameTh);
    params.append('description',description);
    params.append('delFlag', "N");

    return this.http.post(this.url+"/branches",params.toString(),this.requestOptionsPost).map(res=>res.json())
  }
  getBranch(id:string){
    const url = this.url+"/branches/"+`${id}`;
    return this.http.get(url, this.requestOptions).map(res=>res.json());
  }
  updateBranch(branchId:string,branchName:string,branchNameTh:string,description:string){
    const params = new URLSearchParams();
    params.append('branchId',branchId);
    params.append('branchName',branchName);
    params.append('branchNameTh',branchNameTh);
    params.append('description',description);

    const url = this.url+"/branches/"+`${branchId}`;
    return this.http.patch(url, params.toString(), this.requestOptionsPost).map(res=>res.json())
  }
  DeleteBranch(branchId:string){
    const url = this.url+"/branches/"+`${branchId}`;
    return this.http.delete(url,this.requestOptionsPost).map(res=>res.json())
  }
  getAllService(){
    return this.http.get(this.url+"/services", this.requestOptions).map(res=>res.json())
  }
  addService(serviceId:string,serviceName:string,serviceNameTh:string,description:string){
    const params = new URLSearchParams();
    params.append('serviceId',serviceId);
    params.append('serviceName',serviceName);
    params.append('serviceNameTh',serviceNameTh);
    params.append('description',description);
    params.append('delFlag', "N");

    return this.http.post(this.url+"/services",params.toString(),this.requestOptionsPost).map(res=>res.json())
  }
  getService(id:string){
    const url = this.url+"/services/"+`${id}`;
    return this.http.get(url, this.requestOptions).map(res=>res.json());
  }
  updateService(serviceId:string,serviceName:string,serviceNameTh:string,description:string){
    const params = new URLSearchParams();
    params.append('serviceId',serviceId);
    params.append('serviceName',serviceName);
    params.append('serviceNameTh',serviceNameTh);
    params.append('description',description);

    const url = this.url+"/services/"+`${serviceId}`;
    return this.http.patch(url, params.toString(), this.requestOptionsPost).map(res=>res.json())
  }
  DeleteService(serviceId:string){
    const url = this.url+"/services/"+`${serviceId}`;
    return this.http.delete(url,this.requestOptionsPost).map(res=>res.json())
  }
  userGroup(userId:string,groupId:string){
    //console.log(userId);
    const params = new URLSearchParams();
    params.append('groupId',groupId);
    params.append('activeFlag',"Y");
    return this.http.post(this.url+"/users/"+userId+"/groups", params.toString(),this.requestOptionsPost).map(res=>res.json())
    //http://165.5.40.181:3000/users/1891/groups
  }
  getAllMenuService(){
    return this.http.get(this.url+"/branches", this.requestOptions).map(res=>res.json())
  }                         
}

//curl -X POST "http://165.5.40.181:3000/users/5555/groups" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzcxNzAxMjksImV4cCI6MTUzNzE3MTkyOSwidXNlcl9pZCI6MTg5MSwic2Vzc2lvbl9pZCI6IkVBRjQ5M0U1MEU2MzdEMzI2MThDQzg2QkMzQUE2MTEwIn0.tZuOLvUHPM6Yv5tTlOmlTOUWinh56DXN9nNowudNEzc" -H "Content-Type: application/x-www-form-urlencoded" -d "groupId=1&activeFlag=Y"
