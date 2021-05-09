import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Tweet } from '../Models/tweet';
import { Token } from '../Models/token';
const Requestheaders={headers:new HttpHeaders({
  'Content-Type':'application/json',
  'Authorization':'Bearer'+localStorage.getItem('token')
})}

@Injectable({
  providedIn: 'root'
})
export class TweetappService {
  url:string='http://localhost:63301/api/v1.0/tweets/'
  constructor(private http:HttpClient) { }
  public Register(user:User):Observable<String>
  {   
     const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<String>(this.url+'register',user, { headers, responseType: 'text' as 'json'})
  }
  public Login(username:string,password:string):Observable<any>
  {
   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
   return this.http.get<any>(this.url+'login/'+escape(username)+','+escape(password), { headers, responseType: 'json'})
  }
  public PostTweet(tweet:Tweet):Observable<String>
  {
   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
   return this.http.post<String>(this.url+'tweet',tweet,{​​​​​​​​ headers, responseType: 'text' as 'json'})
  }
  public GetAllUsers():Observable<any>
  {
    return this.http.get<any>(this.url+'users/all', Requestheaders)
  }
  public GetTweetsByUser(username:string):Observable<any>
  {
    return this.http.get<any>(this.url+'user/search/'+username, Requestheaders)
  }
  public GetAllTweets():Observable<any>
  {
    return this.http.get<any>(this.url+'all', Requestheaders)
  }
   public UpdatePassword(emailid:string,oldpassword:string,newpassword:string):Observable<String>
  {​​​​​​​​    
    const headers = new HttpHeaders().set('Content-Type', 'text/html; charset=utf-8');
    return this.http.put<String>(this.url+'update/'+escape(emailid)+','+escape(oldpassword)+','+escape(newpassword),{​​​​​​​​ headers, responseType: 'text'}​​​​​​​​)
  }​​​​​​​​
   public ForgotPassword(emailid:string,password:string):Observable<String>
  {​​​​​​​​    
     const headers = new HttpHeaders().set('Content-Type', 'text/html; charset=utf-8');
   return this.http.put<String>(this.url+'forgot/'+escape(emailid)+','+escape(password),{​​​​​​​​ headers, responseType: 'text' }​​​​​​​​)
  }​​​​​​​​

  public PostComment(comment:string,username:string,userName:string,tweet:string):Observable<any>
  {  
     const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
     return this.http.post<any>(this.url+'reply/'+escape(comment)+','+escape(username)+','+escape(userName)+','+escape(tweet),{ headers, responseType: 'text' as 'json'}) 
  }
  public GetLikes(username:string,tweet:string):Observable<any>
  {    
     return this.http.get<any>(this.url+'likes/'+escape(username)+','+escape(tweet),Requestheaders)
  }
  public GetUserProfile(username:string):Observable<any>
  {    
     return this.http.get<any>(this.url+'user/'+escape(username),Requestheaders)
  }
  public DeleteTweet(username:string,tweet:string):Observable<String>
  {    
   const headers = new HttpHeaders().set('Content-Type', 'text/html; charset=utf-8');
   return this.http.delete<String>(this.url+'tweetdelete/'+escape(username)+','+escape(tweet),{ headers, responseType: 'text' as 'json'}) 
  }
  public GetAllComments(username:string,tweet:string):Observable<any>
  {    
     return this.http.get<any>(this.url+'allcomments/'+username+','+tweet,Requestheaders)
  }
  public logout(){
    localStorage.clear();
  }
}
