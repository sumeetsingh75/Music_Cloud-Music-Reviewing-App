import { Injectable } from '@angular/core';
import { IApplicationUser } from '../application-users';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
isloggedin:boolean = false;
loggedInUser:IApplicationUser;
  constructor() { }
}
