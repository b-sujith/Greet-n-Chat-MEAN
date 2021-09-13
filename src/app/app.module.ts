import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UserslistComponent } from './userslist/userslist.component';
import { ChatscreenComponent } from './chatscreen/chatscreen.component';
import { ChattedusersComponent } from './chattedusers/chattedusers.component';
import { SearchPipe } from './search.pipe';
import { UserprofileComponent } from './userprofile/userprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserslistComponent,
    ChatscreenComponent,
    ChattedusersComponent,
    SearchPipe,
    UserprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
