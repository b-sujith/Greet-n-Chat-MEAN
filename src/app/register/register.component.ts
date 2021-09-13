import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pass: string="";
  user: string="";
  emai: string="";
  file!: File;
  constructor(private us:UserService,private rr:Router) { }
  select(event:any){
    this.file=event.target.files[0]
    console.log(this.file)
  }

  ngOnInit(): void {
  }
  fun(){
    let formdata=new FormData();
    formdata.append("photo",this.file)
    let userObj={password:this.pass,username:this.user,email:this.emai}
    formdata.append("userObj",JSON.stringify(userObj));
    this.us.fun(formdata).subscribe(
      res=>{
        console.log(res.message)
        if(res.message=="User already existed"){
          alert("user already exists")
        }
        else{
          alert("user created")
          this.rr.navigateByUrl('login')


        }
      },
      err=>{
        console.log(err)
      }
    )
    }
  

}
