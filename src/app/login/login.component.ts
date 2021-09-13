import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService,private rr:Router) { }
  user:String = '';
  pass:String = '';

  ngOnInit(): void {

  }
  fun(){
    let userObj={username:this.user,password:this.pass}
    this.us.fun2(userObj).subscribe(
      res=>{
        if (res.message=="login success"){
          localStorage.setItem("token",res.token)
          localStorage.setItem("username",res.username)
          localStorage.setItem("userObj",JSON.stringify(res.userObj))
          this.us.changestatus();
          this.rr.navigateByUrl('/userlist/'+res.username)

        }
        if(res.message=="invalid username"){
          alert("invalid username")
        }
        if(res.message=="Invalid password"){
          alert("invalid password")
        }
      },
      err=>{
        alert("error");
      }

    )
  }
  

}
