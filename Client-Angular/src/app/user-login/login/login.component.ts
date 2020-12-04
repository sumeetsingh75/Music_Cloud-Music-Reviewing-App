import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../../user.service';
import { FacebookLoginProvider, AuthService } from 'angular-6-social-login';  
import { Router } from '@angular/router';  
import { Socialusers } from '../../social-users';
import { NavbarService}  from '../navbar.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private _snackBar: MatSnackBar,private userService:UserService, private router: Router,public OAuth: AuthService,private navService:NavbarService ) { }

  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,Validators.minLength(3)]);
  socialusers=new Socialusers();
  response;   

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getPasswordMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :'';
  }
  signup(){
    this.router.navigate(['/signup']);
  }

  //Method for Service call to verify credentials of Local user and 
  //navigating on being admin/non admin
  submit(){
    this.userService.verifyUser(this.email.value,this.password.value).subscribe(data=>{
      console.log(JSON.stringify(data));
      
        var token:string  =  JSON.stringify(data.body.token);
      
        var user = {
        method:data.body.user.method,
        userId :data.body.user._id,
        name:data.body.user.local.name,
        email:data.body.user.local.email,
        role:data.body.user.role,
        status:data.body.user.status
        }

        console.log(user);
        if(user.status == 'activated'){
        localStorage.setItem('socialusers', JSON.stringify(user));
        localStorage.setItem('userJWTtoken', token.substring(1,token.length-1)); 
        console.log(localStorage.getItem('socialusers')); 
        this.navService.isloggedin = true;
        this.navService.loggedInUser = user;
        if(user.role == "admin"){
          this.router.navigate(['/auth/true/true']);  
        }
        else
        this.router.navigate(['/auth/true/false']);  

        }
        else{
          this.openSnackBar("User is Deactivated.","OK");
        }
       

    },error=>{
      this.openSnackBar("Wrong Email Password Combination","OK");
    });
  }

  //Method to open snackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  //Method to handle login by Facebook
  public socialSignIn(socialProvider: string) {  
    let socialPlatformProvider;  
    if (socialProvider === 'facebook') {  
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
    } 
      
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {   
      console.log(localStorage.getItem('socialusers'));
      this.Savesresponse(socialusers);  
    });  
  }  


  Savesresponse(socialusers: Socialusers) {  
    this.userService.Savesresponse(socialusers).subscribe((res: any) => {  
       
      console.log(res);  
      this.socialusers=res;  
  
      this.response = res.userDetail;  
      var user = {
        method:"facebook",
        userId : res.user._id,
        name: res.user.facebook.name,
        email: res.user.facebook.email,
        role:res.user.role,
        status:res.user.status
      }
      console.log(user);
      if(user.status == 'activated'){
      localStorage.setItem('socialusers', JSON.stringify( user));
      localStorage.setItem('userJWTtoken', JSON.stringify( this.socialusers.token).substring(1,this.socialusers.token.length+1));  
      console.log("###"+localStorage.getItem('userJWTtoken')); 
      console.log("###"+localStorage.getItem('socialusers')); 
      this.navService.isloggedin = true;
      this.navService.loggedInUser = user;
      if(user.role == "admin"){
        this.router.navigate(['/auth/true/true']);  
      }
      else
      this.router.navigate(['/auth/true/false']);  
    }
    else{
      this.openSnackBar("User is Deactivated.","OK");
    }
    })  
  }  
}
