import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
loadComonent="employeelist"
  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    id:this.router.snapshot.params['id'];
  }

}
