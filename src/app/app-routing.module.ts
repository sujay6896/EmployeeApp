import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';


const routes: Routes = [
  {path:'', redirectTo:'/employeelist', pathMatch:'full'},
  {path:'emplyeeDetails',component:EmployeeDetailsComponent,data:{name:'employeeDetail'}},
  {path:'employeelist',component:EmployeeListComponent},
  {path:'addEmployee',component:CreateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
