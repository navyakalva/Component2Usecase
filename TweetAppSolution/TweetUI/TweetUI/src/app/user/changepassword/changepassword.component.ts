import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/Models/token';
import { User } from 'src/app/Models/user';
import { TweetappService } from 'src/app/services/tweetapp.service';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  user:User;
  submitted=false;
  token:Token;
  userForm:FormGroup;
  message:string;
  id:number;
  username:string;
  uname:string;
  form:FormGroup
  constructor(private frombuilder:FormBuilder,private service:TweetappService,private route:Router) { 
    this.id = Number(localStorage.getItem('UserId') || '{}') ;
    this.username = String(localStorage.getItem('Username') || '{}');
    this.service.GetUserProfile(this.username).subscribe(res=>
      {
        this.user=res;
        console.log(this.user);
      },
      err=>{
        console.log(err);
      }
      )
  }

  ngOnInit() {
    this.userForm = this.frombuilder.group({
             emailid:['',Validators.required],
        oldpassword:['',Validators.required],
        newpassword:['',Validators.required], 
      });
      }

    changepassword()
    {
      let emailId=this.userForm.value["emailid"];
      let oldPassword=this.userForm.value["oldpassword"];
      let newPassword=this.userForm.value["newpassword"]

      this.service.UpdatePassword(emailId, oldPassword, newPassword).subscribe(res=>{console.log(this.message),alert("updated succesfully"), this.route.navigateByUrl('USER')},err=>{
        console.log(err)
      })
    }

    onSubmitPassword(){
      this.submitted=true;
      if(this.userForm.invalid){
       return;
      }
        else {
        this.changepassword();
        }
      }
      get f(){return this.userForm.controls;}
      Search()
  {
     this.uname = this.form.value["username"]
    localStorage.setItem("uname", this.uname);
    this.route.navigateByUrl('/SEARCH TWEET');
  }
  onReset()
    {
      this.submitted=false;
      this.userForm.reset();
    }
}