import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  datasource=new BehaviorSubject<any>(0);
  dataobservable=this.datasource.asObservable();
  updateDataObservable(data: any){
    this.datasource.next(data)
  }
  constructor(private hc:HttpClient) { }
  userLoginStatus=false;
  s=localStorage.getItem('username')
  changestatus(){
    let k=localStorage.getItem('username')
    if (k!=null){
      this.userLoginStatus=true;
    }  
    else{
      this.userLoginStatus=false;

    }
    console.log(this.userLoginStatus)

  }
  fun(userObj:any):Observable<any>{
    return this.hc.post("/user/create",userObj)
  }
  fun2(userObj:any):Observable<any>{
    return this.hc.post("/user/login",userObj)
  }
  fun3():Observable<any>{
    return this.hc.get("/user/userlist")
  }
  postmessage(userObj:any):Observable<any>{
    return this.hc.post("/message/create",userObj)
  }
  getfriends(username:any):Observable<any>{
    return this.hc.get('/chat/getusers/'+username)
  }
  updateprofile(userObj:any):Observable<any>{
    return this.hc.post('/user/change',userObj)
  }
  getmessage():Observable<any>{
    let username=localStorage.getItem("username")
    let user=localStorage.getItem("curruser")
    return this.hc.get("/message/"+username+"/"+user)
  }
}
