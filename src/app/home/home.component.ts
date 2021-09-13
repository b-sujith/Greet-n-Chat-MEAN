import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private rr:Router) { }

  ngOnInit(): void {
  }
  fun1(){
    this.rr.navigateByUrl('/login')
  }
  fun2(){
    this.rr.navigateByUrl('/register')
  }
  
  

}
