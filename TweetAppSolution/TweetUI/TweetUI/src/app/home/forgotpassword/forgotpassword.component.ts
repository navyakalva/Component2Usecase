import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/Models/token';
import { User } from 'src/app/Models/user';
import { TweetappService } from 'src/app/services/tweetapp.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  user:User;
  submitted=false;
  token:Token;
  userForm:FormGroup;
  message:string;
  emailValid : boolean = false;
  prePasswordCheck : boolean = false;
  passwordValidation :boolean = false;
  passwordLength : boolean = false;
  showElement : boolean = false;

  constructor(private frombuilder:FormBuilder,private service:TweetappService,private route:Router) { }

  ngOnInit() {
    this.userForm = this.frombuilder.group({
             emailid:['',Validators.required],
        password:['',Validators.required],
        confirmpassword:['',Validators.required], 
      });
      }
      emailValidation(emailid : HTMLInputElement){
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailid.value))
        {
          this.emailValid = false;
          // console.log(this.emailValid)
        }
        else{
      
          this.emailValid = true;
          // console.log(this.emailValid)
        }
        if(emailid.value.length==0){
          this.emailValid = false
        }
      }  
    
       //check if password and repassword are same
    
       checkPassword(password : HTMLInputElement,confirmpassword : HTMLInputElement){
        
        // console.log(password.value,rePassword.value);
        if(password.value.length!=0){
            this.prePasswordCheck = false;
              if(password.value == confirmpassword.value || confirmpassword.value.length==0){
                  this.passwordValidation = false;
                }else{
                    this.passwordValidation = true;
                }
              }else{
                    this.prePasswordCheck = true;
        }
      if(confirmpassword.value.length==0){
        this.prePasswordCheck = false;
      }
      if(this.prePasswordCheck){
        confirmpassword.value="";
      }
      }
    
      // Check prePassword
      checkPrePassword(password : HTMLInputElement ){
        if(password.value.length>=6 && password.value.length<=12){
          this.passwordLength = false;
          }
          else{
            this.passwordLength = true;
          }
        if(password.value.length!=0){
          this.prePasswordCheck = false;
        }else{
          this.passwordLength = false;
        }
      } 
    
    forgot()
    {
      if(this.emailValid == false && this.passwordValidation == false){
      this.user=new User();
      this.user.emailId=this.userForm.value["emailid"],
      this.user.password=this.userForm.value["password"],
      this.service.ForgotPassword(this.user.emailId, this.user.password).subscribe(res=>{
        alert("Changed Password");
        console.log(res);
        this.route.navigateByUrl('HOME');
      })
    }
    }

    onSubmitPassword(){
      this.submitted=true;
      if(this.userForm.invalid){
       return;
      }
        else {
        this.forgot();
        }
      }
      get f(){return this.userForm.controls;}
  onReset()
    {
      this.submitted=false;
      this.userForm.reset();
    }
}