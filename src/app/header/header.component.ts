import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router,NavigationEnd,Event} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
url;
currentRoute;

  constructor(private router:ActivatedRoute,private Router:Router) { }

 
  backToEmployeeList()
  {
    this.Router.navigate([''])
  }
  addEmloyee()
  {
    this.Router.navigate(['addEmployee'])
  }
  about()
  {
    window.location.href = "https://pacewisdom.com/";
    
  }
  
  ngOnInit() {
    this.router.data.subscribe(data => {
      this.currentRoute=data;
      console.log(this.currentRoute.name)
      this.url=this.currentRoute.name
  })
  }


}
