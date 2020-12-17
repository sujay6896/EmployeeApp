import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject ,BehaviorSubject} from 'rxjs';
import { employee } from 'src/model/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees:employee[]=[
    new employee(1,'Miller','miller@gmail.com',74678875,20100720,"dsadasdasda",'../../../assets/PngItem_1924283.png'),
    new employee(2,'David','david@gamil.com',4321312,20021911,"dsadasdasda",'../../../assets/MSD.png'),
    new employee(3,'Max','max@gamil.com',4321312,20021911,"dsadasdasda",'../../../assets/sachin.png'),
    new employee(4,'Streven','streven@gamil.com',4321312,20021911,"dsadasdasda",'../../../assets/rohit.png')
  ];
  li:any; 
  lis=[];
  url='https://run.mocky.io/v3/fb158fb6-98c3-40d0-805b-853bd9ea4cfe'

private employeeDataSource=new Subject();
employeeData$=this.employeeDataSource.asObservable();


private EmployeeSource=new BehaviorSubject("");
currentEmployee=this.EmployeeSource.asObservable(); 




private data = new BehaviorSubject("")
       currentData = this.data.asObservable();

    
  constructor(private http : HttpClient) { }
AddEmployee(newEmp)
{

  this.EmployeeSource.next(newEmp)
}


setData(data)

{this.data.next(data);

}

addEmployee(newEmployee)
{
  newEmployee.id=this.employees.length+1;
  console.log(newEmployee)
  this.employees.push(newEmployee);
}


  sendDataToEmployeeDetail(employeeDetails)
  {
    console.log(employeeDetails)
    for(var i=0;i<this.employees.length;i++)
    {
      if(this.employees[i].name==employeeDetails.name&& this.employees[i].id==employeeDetails.id)
      {
        this.employeeDataSource.next(this.employees[i]);
      }
    }
    
  }

 
}
