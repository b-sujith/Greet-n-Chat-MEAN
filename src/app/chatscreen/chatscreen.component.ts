import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chatscreen',
  templateUrl: './chatscreen.component.html',
  styleUrls: ['./chatscreen.component.css']
})
export class ChatscreenComponent implements OnInit {

  constructor(private us:UserService,private rr:Router) { }
  text: string="";
  user:any=localStorage.getItem('username')
  other:any=localStorage.getItem('curruser')
  messages:any=[]

  fun2(){
    this.us.getmessage().subscribe(
      res=>{
        this.messages=res.message;
      },

    ),
    setTimeout(()=>this.fun2(),5000)
  }
  fun22(){
    this.us.getmessage().subscribe(
      res=>{
        this.messages=res.message;
      },
    ),
    setTimeout(()=>this.fun2(),5000)
  }

  ngOnInit(): void {
    let use1=localStorage.getItem('username')
    let use2=localStorage.getItem('curruser')
    let obj={user1:use1,user2:use2}
    this.us.getmessage().subscribe(
      res=>{
        this.messages=res.message;
      },

    )
    this.fun2()
  }
  send(){
    let use1=localStorage.getItem('username')
    let use2=localStorage.getItem('curruser')
    let obj={user1:use1,user2:use2,message:[{test:this.text,author:use1}]}
    console.log(obj)
    this.us.postmessage(obj).subscribe(
      res=>{
        console.log("suceess")
        this.us.updateDataObservable(res.latest)
        this.us.dataobservable.subscribe(
          mess=>{
            this.messages=mess;
          }
        )
        this.text="";
      },
      err=>{
        alert(err.message)
      }
    )

  }
  fun(){
    this.rr.navigateByUrl('/userlist/'+this.user)
  }

}




