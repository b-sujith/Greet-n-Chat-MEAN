import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  constructor(private us:UserService,private rr:Router) { }
  searchTerm: string="";
  chattedusers:any =[];
  userrr:any=""
  status:boolean = true;
  setstatus1(){
    this.status=false;
  }
  setstatus2(){
    this.status=true
  }
  userslist:any =[];
  ngOnInit(): void {
    this.userrr=localStorage.getItem("username")
    this.us.fun3().subscribe(
      res=>{
        let usersl=res.message
        for(let i=0;i<usersl.length;i++){
          if (usersl[i].username!=this.userrr){
            this.userslist.push(usersl[i])
          }
        }
},
      err=>{
        console.log(err.message)
      }
    )
    let k=localStorage.getItem('username')
    this.us.getfriends(k).subscribe(
      res=>{
        if (res.message=="Connect with friends"){

        }
        else{
          this.chattedusers=res.message
          console.log(this.chattedusers)
        }
      }
    )

  }
  fun(username:string){
    console.log(username)
    localStorage.setItem("curruser",username)
    this.rr.navigateByUrl('/'+username)
  }

}
