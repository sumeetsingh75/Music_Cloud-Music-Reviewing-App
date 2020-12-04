import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialLoginModule, AuthServiceConfig, AuthService } from 'angular-6-social-login';
import { UserService } from './user.service';
import { NavbarService } from './user-login/navbar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECE9065-Project-Angular';

  constructor(private route: ActivatedRoute, public OAuth: AuthService, private userService: UserService,
    private router: Router,private navService:NavbarService) {
  }
 
  logout() {
    var loggedInUser = JSON.parse(localStorage.getItem('socialusers'));

    if (loggedInUser) {
      if (loggedInUser.method && loggedInUser.method == 'local') {
        localStorage.removeItem("socialusers");
        localStorage.removeItem("userJWTtoken");
        console.log(localStorage.getItem('userJWTtoken'));
        this.navService.isloggedin = false;
        this.router.navigate([``]);
      }

      else {
        this.OAuth.signOut().then(data => {
          localStorage.removeItem("socialusers");
          localStorage.removeItem("userJWTtoken");
          console.log(localStorage.getItem('userJWTtoken'));
          this.navService.isloggedin = false;
          this.router.navigate([``]);
        });
      }
    }
  }

}
