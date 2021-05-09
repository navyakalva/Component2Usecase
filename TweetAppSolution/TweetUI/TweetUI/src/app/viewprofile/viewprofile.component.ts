import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from '../Models/tweet';
import { User } from '../Models/user';
import { UserComment } from '../Models/user-comment';
import { UserTweets } from '../Models/user-tweets';
import { TweetappService } from '../services/tweetapp.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css'],
})
export class ViewprofileComponent implements OnInit {
  username:string;
  id:number;
  user:User;
  tweetslist:UserTweets[]=[];
  form:FormGroup
  uname:string;
  commentslist:UserComment[];
result:number;
clickedButton : {[key: number] : boolean} ={};
count:Tweet;
todaysDataTime = new Date();
today= new Date();
date:string;
text:string;
    constructor(private route:Router,private service:TweetappService) {
      this.Profile();
     }
  Profile()
  {
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
      if(String(localStorage.getItem('Username') || '{}')!=null){
        let username=String(localStorage.getItem('Username'));
      this.service.GetTweetsByUser(username).subscribe(res=>{
        this.tweetslist=res;
        console.log(this.tweetslist)
        this.tweetslist.forEach(element => {
          this.date=formatDate(this.today,'yyyy/MM/dd','en-US', '+0530')
           localStorage.setItem("Tweetss",element.tweets);
           localStorage.setItem("UserNames",element.userName);
           localStorage.setItem("Imagenames",element.imagename);
           localStorage.setItem("Firstnames",element.firstName);
           localStorage.setItem("Lastnames",element.lastName);
           localStorage.setItem("tweetsdate",element.tweetDate.toString());
           var created_date=localStorage.getItem('tweetsdate');
           console.log(created_date)
           var text=this.GetTime(created_date);
           element.datecalculated=String(localStorage.getItem('datescalculated'))
           console.log(element.datecalculated);
         });
     
         console.log(this.tweetslist);
       })
    }
    else
    {
      console.log("Please Login With Credentials...");
    }
  }
    ngOnInit() {

    }
    GetTime(created_date:any)
{
  function getDateDiff(startDate:Date, endDate:Date) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    if(days==0)
    {
      return hours+"h"
    }
    else if(hours==0)
    {
      return minutes+"min"
    }
    else if(minutes==0)
    {
      return seconds+"sec"
    }
    else{
      return days+"days"
    }
}
var diff = getDateDiff(new Date(created_date),new Date(this.todaysDataTime));
localStorage.setItem("datescalculated",diff);
}
    isCommentClicked(index : number){
      console.log(index);
      if(this.clickedButton[index]==false){
      this.clickedButton[index] = true;
    }
      else
      this.clickedButton[index] = false;
    }
    Delete(item:UserTweets)
    {
      this.service.DeleteTweet(item.userName,item.tweets).subscribe(res=>{
        console.log('Deleted');
        alert('Deleted');
        this.Profile();
      })
    }
    Comments(item:UserTweets)
    {
      this.service.GetAllComments(item.userName, item.tweets).subscribe(res=>{
        this.commentslist=res;
        console.log(this.commentslist);
      })
      this.Profile();
    }
    Search()
  {
     this.uname = this.form.value["username"]
    localStorage.setItem("uname", this.uname);
    this.route.navigateByUrl('/SEARCH TWEET');
  }
  PostComments(item:UserTweets)
  {
    let comment = this.form.value['comment']
    this.service.PostComment(comment,this.username,item.userName, item.tweets).subscribe(res=>{
    alert("replies")
  console.log(res)
  this.route.navigateByUrl('VIEWTWEETS')
    },
    err=>{
      alert("Failed")
      this.onReset();
    });
    this.Profile();
}
  GetLikes(item:UserTweets)
{
  this.count=new Tweet();
  this.service.GetLikes(item.userName, item.tweets).subscribe(res=>{
    this.count.likes=res;
    console.log(this.count);
  },err=>{
    console.log(err)
  })
  this.Profile();
}
    logout()
    {
      
      localStorage.clear();
      
    }
    onReset()
{
  this.form.reset();
}
  }
  