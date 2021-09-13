import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private us:UserService,private rr:Router) { }
  user:any={};
  select(event:any){
    this.file=event.target.files[0]
    console.log(this.file)
  }
  username:any="";
  email:string="";
  file!: File;
  status:boolean=false;

  ngOnInit(): void {
    this.user=localStorage.getItem('userObj')
    this.username=localStorage.getItem('username')
    this.user=JSON.parse(this.user)
  }
  fun(){
    this.status=true;
  }
  change(){
    this.status=false;
  }
  submit(){
    let formdata=new FormData();
    formdata.append("photo",this.file)
    let userObj={username:this.username,email:this.email}
    formdata.append("userObj",JSON.stringify(userObj));
    this.us.updateprofile(formdata).subscribe(
      res=>{
        console.log("suceess")
        localStorage.setItem('userObj',JSON.stringify(res.message));
        this.user=localStorage.getItem('userObj')
        this.username=localStorage.getItem('username')
        this.user=JSON.parse(this.user)
        this.status=false;
      },
      err=>{
        console.log("error")
      }
    )
    
  }

}
