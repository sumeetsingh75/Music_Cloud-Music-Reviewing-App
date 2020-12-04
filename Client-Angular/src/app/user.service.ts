import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IApplicationUser } from './application-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url;
  constructor(private http: HttpClient) { }


  toggleStatus(action: string, user: IApplicationUser) :Observable<any>  {
    var data = {
      "status": action,
      "user":user
    };
    console.log(data);
    return this.http.post('/auth/user/changeStatus',data, { observe: 'response' });
}

toggleAccess(action: string, user: IApplicationUser) :Observable<any>  {
  var data = {
    "role": action,
    "user":user
  };
  console.log(data);
  return this.http.post('/auth/user/changeRole',data, { observe: 'response' });
}
  

  Savesresponse(response)
      {
        this.url =  '/auth/oauth/facebook';
        return this.http.post(this.url,{
          "access_token": response.token
        });
      }

      verifyUser(email: string, password: string):Observable<any>  {
        this.url = '/auth/signin';
        return this.http.post(this.url,{
          "email": email,
          "password":password
        },{observe:'response'});
      }
    
      
      getAllUsers():Observable<any> {
        return this.http.get<any>('/auth/getusers')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
       
      );
        
}

  userSignup(name:string,email:string,password:string):Observable<any> {
    this.url = '/auth/signup';
    return this.http.put(this.url,{
      "name": name,
      "email": email,
      "password":password
    },{observe:'response'});

  } 

  
}

