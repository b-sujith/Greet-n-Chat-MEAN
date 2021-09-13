import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatscreenComponent } from './chatscreen/chatscreen.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserslistComponent } from './userslist/userslist.component';

const routes: Routes = [  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:'userlist/:username',component:UserslistComponent},
{path:'userprofile',component:UserprofileComponent},
{path:':user',component:ChatscreenComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
