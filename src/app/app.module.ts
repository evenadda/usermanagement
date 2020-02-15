import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppsettingComponent } from './components/appsetting/appsetting.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { LoginComponent } from './components/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { UserComponent } from './components/user/user.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { GroupComponent } from './components/group/group.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { GroupEditComponent } from './components/group-edit/group-edit.component';
import { RoleComponent } from './components/role/role.component';
import { RoleCreateComponent } from './components/role-create/role-create.component';
import { RoleEditComponent } from './components/role-edit/role-edit.component';
import { DeptComponent } from './components/dept/dept.component';
import { DeptCreateComponent } from './components/dept-create/dept-create.component';
import { DeptEditComponent } from './components/dept-edit/dept-edit.component';
import { TeamComponent } from './components/team/team.component';
import { TeamCreateComponent } from './components/team-create/team-create.component';
import { TeamEditComponent } from './components/team-edit/team-edit.component';
import { BranchComponent } from './components/branch/branch.component';
import { BranchCreateComponent } from './components/branch-create/branch-create.component';
import { BranchEditComponent } from './components/branch-edit/branch-edit.component';
import { ServiceComponent } from './components/service/service.component';
import { ServiceCreateComponent } from './components/service-create/service-create.component';
import { ServiceEditComponent } from './components/service-edit/service-edit.component';
import { UserGroupComponent } from './components/user-group/user-group.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';

const routes: Routes = [
  //no layout routes
  { path: '', redirectTo:'/login', pathMatch: 'full'},
  
  { path: 'login',component:LoginComponent },
  { path: 'dashboard',component:DashboardComponent },
  { path: 'user',component:UserComponent },
  { path: 'user-create',component:UserCreateComponent },
  { path: 'user-edit/edit/:id/mode/:mode',component:UserEditComponent },
  { path: 'group',component:GroupComponent },
  { path: 'group-create',component:GroupCreateComponent },
  { path: 'group-edit/edit/:id',component:GroupEditComponent },
  { path: 'role',component:RoleComponent },
  { path: 'role-create',component:RoleCreateComponent },
  { path: 'role-edit/edit/:id',component:RoleEditComponent },
  { path: 'dept',component:DeptComponent },
  { path: 'dept-create',component:DeptCreateComponent },
  { path: 'dept-edit/:id',component:DeptEditComponent },
  { path: 'team',component:TeamComponent },
  { path: 'team-create',component:TeamCreateComponent },
  { path: 'team-edit/:id',component:TeamEditComponent },
  { path: 'branch',component:BranchComponent },
  { path: 'branch-create',component:BranchCreateComponent },
  { path: 'branch-edit/:id',component:BranchEditComponent },
  { path: 'service',component:ServiceComponent },
  { path: 'service-create',component:ServiceCreateComponent },
  { path: 'service-edit/:id',component:ServiceEditComponent },
  { path: 'user-group',component:UserGroupComponent },
  { path: 'service-menu',component:ServiceMenuComponent },
  { path: '**', redirectTo:'/login'},
   
  // { path: 'stock',component:StockComponent },
  // { path: 'stock/create',component:StockCreateComponent },
  // { path: '**', redirectTo:'/login'}
];
@NgModule({
  declarations: [
    AppComponent,
    AppfooterComponent,
    AppheaderComponent,
    AppsettingComponent,
    AppmenuComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    UserCreateComponent,
    UserEditComponent,
    GroupComponent,
    GroupCreateComponent,
    GroupEditComponent,
    RoleComponent,
    RoleCreateComponent,
    RoleEditComponent,
    DeptComponent,
    DeptCreateComponent,
    DeptEditComponent,
    TeamComponent,
    TeamCreateComponent,
    TeamEditComponent,
    BranchComponent,
    BranchCreateComponent,
    BranchEditComponent,
    ServiceComponent,
    ServiceCreateComponent,
    ServiceEditComponent,
    UserGroupComponent,
    ServiceMenuComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),

  ],
  providers: [DataService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
