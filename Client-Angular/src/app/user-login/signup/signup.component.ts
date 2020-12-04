import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(3)]);
  name = new FormControl('', [Validators.requiredTrue]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPasswordMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }
  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  submit() {

    this.userService.userSignup(this.name.value, this.email.value, this.password.value).subscribe((res) => {
      if (res.status == 202)
        this.openSnackBar("User Exists!", "OK");

      if (res.status == 200)
        this.openSnackBar("User Created!", "OK");

    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
