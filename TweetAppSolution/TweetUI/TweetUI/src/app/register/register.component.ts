import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { TweetappService } from '../services/tweetapp.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  list:User[]=[];
  user:User;
  submitted=false;
  userForm:FormGroup;
  img:string;
  selectedFile : File;
  message:string;
  emailValid : boolean = false;
  prePasswordCheck : boolean = false;
  passwordValidation :boolean = false;
  passwordLength : boolean = false;
  showElement : boolean = false;
  constructor(private frombuilder:FormBuilder,private service:TweetappService,private route:Router) { }

  ngOnInit() {
    this.userForm=this.frombuilder.group({
      firstname:['',[Validators.required,Validators.pattern("^[A-Za-z]{0,}$")]],
      username:['',Validators.required],
      emailid:['',Validators.required],
      password:['',[Validators.required,Validators.pattern("^[A-Za-z]{7,}[!@#$%^&*]")]],
      confirmpassword:['',Validators.required],
      contactnumber:['',[Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
      lastname:[''],
      imagename:['',Validators.required]});
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
  onSubmitUser(){
    this.submitted=true;
    if(this.userForm.invalid){
     return;
    }
      else{
        if(this.emailValid == false && this.passwordValidation == false){
        this.user=new User();
      this.user.userId = 0;
      this.user.firstName=this.userForm.value["firstname"];
      this.user.lastName=this.userForm.value["lastname"];
      this.user.username=this.userForm.value["username"];
      this.user.emailId=this.userForm.value["emailid"];
      this.user.password=this.userForm.value["password"];
      this.user.contactNumber=this.userForm.value["contactnumber"];
      this.user.imageName=this.img;
      console.log(this.user)
      this.service.Register(this.user).subscribe(res=>{
        alert("Successfully registered");
        console.log(res);
        this.route.navigateByUrl('HOME');
      },
      err=>{
        alert("Failed to Register! Try again")
        console.log(err);
        this.onReset();
      }
  );
      }
    }
    }
    get f(){return this.userForm.controls;}
    onReset()
    {
      this.submitted=false;
      this.userForm.reset();
    }
    fileEvent(event :any){
      this.img= event.target.files[0].name;
    }
}

