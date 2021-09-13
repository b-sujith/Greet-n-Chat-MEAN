import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';
  s:any="";
  userrrr:any;

  constructor(public us:UserService,private rr:Router){}
  ngOnInit() {
    this.us.changestatus()

  }
  userLogout(){
    this.us.changestatus()
    localStorage.clear();
    this.us.userLoginStatus=false;
    this.rr.navigateByUrl('/')
  }
  fun3(){
    this.userrrr=localStorage.getItem("username")
    this.rr.navigateByUrl('/userlist/'+this.userrrr)
  }
  fun4(){
    console.log("hello")
    this.rr.navigateByUrl('/userprofile')
  }
}
