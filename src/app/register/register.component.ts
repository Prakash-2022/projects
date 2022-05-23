import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formdata={username:"",email:"",newpassword:"",confirmpassword:""}
  submit=false;
  errorMsg="";
  loading=false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }
  onSubmit(){
    this.loading=true;
    this.auth.register(this.formdata.username,this.formdata.email,this.formdata.confirmpassword)
    .subscribe({
      next:data =>{
      //store token from response data
      this.auth.storeToken(data.idToken)
      console.log("registerd idToke : "+data.idToken);
      this.auth.canAuthenticate();
      },
      error:data =>{
        if(data.error.error.message=="INVALID_EMAIL"){
          this.errorMsg="Invalid Email!";
        }
        else if(data.error.error.message=="EMAIL_EXISTS"){
          this.errorMsg="Already Email Exists!"; 
        }
        else{
          this.errorMsg="Unkown error occured when creating this account!";
        }
      }

    }).add(()=>{
      this.loading=false;
      console.log("register completed...!");
    })
  }
  //password match checking
  checkmatch(){
    if(this.formdata.newpassword==this.formdata.confirmpassword){
      return true;
    }
    else{
      return false;
    }
  }
}
