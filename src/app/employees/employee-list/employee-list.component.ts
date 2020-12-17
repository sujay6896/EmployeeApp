import { Component, OnChanges, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { employee } from 'src/model/employeeModel';
import {EmployeeService} from '../../employee.service'
import {HttpClient} from '@angular/common/http'; 
import {AngularFireStorage} from "@angular/fire/storage"
import  {map} from "rxjs/operators"
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  li:any; 
  lis:any=[];
  url='https://run.mocky.io/v3/fb158fb6-98c3-40d0-805b-853bd9ea4cfe'
  employeeHeader=['Id','Name','email Id','PhoneNumber'];
  employees;

  constructor(private storage:AngularFireStorage,private EmployeeService:EmployeeService,private router:Router,private http : HttpClient) {
    // setTimeout(()=>{
    //   this.http
    //   .get('https://useremployee-6833e-default-rtdb.firebaseio.com/posts.json')
    //   .pipe(map(responseData=>{
    //     var  employeeArray=[];
    //     for( const key in responseData)
    //     {
    //       console.log("inside")
    //       employeeArray.push({ ...responseData[key]})
    //     }
    //     return employeeArray
    //   }))
    //   .subscribe(listOfEmployees=>{
    //     this.employees=listOfEmployees  
    //   });
    // },5000)
    



   
   }
   loadEmployees()
   {this.http
    .get('https://useremployee-6833e-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(responseData=>{
      const  employeeArray=[];
      for( const key in responseData)
      {
        console.log("inside")
        employeeArray.push({ ...responseData[key]})
      }
      return employeeArray
    }))
    .subscribe(listOfEmployees=>{
      this.employees=listOfEmployees
    });

   }
 

  ngOnInit() {

    setTimeout(()=>{
      this.http
      .get('https://useremployee-6833e-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(responseData=>{
        var  employeeArray=[];
        for( const key in responseData)
        {
          console.log("inside")
          employeeArray.push({ ...responseData[key]})
        }
        return employeeArray
      }))
      .subscribe(listOfEmployees=>{
        this.employees=listOfEmployees
      });
    },2000)
   
    // console.log(  this.http.get('https://useremployee-6833e-default-rtdb.firebaseio.com/'+ 'posts.json'))

    
  //   this.http.get(this.url) 
  //   .pipe(map(responseData=>{
  //     const  employeeArray=[];
  //     for( const key in responseData)
  //     {
  //       employeeArray.push({...responseData[key]})
  //     }
  //     return employeeArray
  //   }
  //   ))
  // .subscribe(Response => {    
  //   console.log(Response) 
  //   this.li=Response; 
  //   this.lis=this.li.list; 
    
   
  // }); 
  
    // this.http.get(this.url) 
    // .pipe()
    // .subscribe(Response => {    
    //   console.log(Response) 
    //   this.li=Response; 
    //   this.lis=this.li.list; 
    //   console.log(this.lis)
    // }); 




    // this.http.post(this.url,'sujay').subscribe(Response=>{
    //   console.log(Response)
    // })
  }
  getNewEmployee(newEmp)
  {
this.lis.push(newEmp)
  }
  EmployeeSelected(EmployeeGotSelected)
  {
    this.EmployeeService.setData(EmployeeGotSelected);
    
    this.EmployeeService.sendDataToEmployeeDetail(EmployeeGotSelected)
    this.router.navigate(['/emplyeeDetails'])
    
    console.log(EmployeeGotSelected)
  }

}
