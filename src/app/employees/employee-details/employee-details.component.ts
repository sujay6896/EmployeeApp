import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../employee.service'

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit  {

  constructor(private EmployeeService:EmployeeService ) { }
employeeData;
  ngOnInit() {
    this.EmployeeService.currentData.subscribe(data=>{
      this.employeeData=data;
      console.log(data)
    })
  }


}
