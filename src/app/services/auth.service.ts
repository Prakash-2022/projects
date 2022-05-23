import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }
  isAuthenticated():boolean{
    if (sessionStorage.getItem("token")!==null){
    return true;
    }
    else{
      return false;
    }
  }
  canAccess(){
    if (!this.isAuthenticated()){
      this.router.navigate(["/login"]);
    }
  }
  canAuthenticate(){
    if (this.isAuthenticated()){
      this.router.navigate(["/dashboard"]);
    }
  }
  register(name:string,email:string,confirmpassword:string){
    return this.http.
    post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API-KEY]',
    {displayName:name,email:email,password:confirmpassword});
  }
  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }
  removeToken(){
    sessionStorage.removeItem('token');
  }
  login(email:string,password:string){
    return this.http
    .post<{idToken:string}>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API-KEY]',
    {email:email,password:password});
  }
  userdetail(){
    let token=sessionStorage.getItem('token');
    return this.http.post<{users:Array<{localId:string,displayName:string}>}>('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API-KEY]',
    {idToken:token}
    )
  }
  
}
