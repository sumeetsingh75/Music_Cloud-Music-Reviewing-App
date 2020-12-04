import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { IReview } from './review';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

 //Method to Delete all reviews for a song from Database
  deleteReviews(songId: string):Observable<any> {
    return this.http.request("DELETE",'/review/auth/deleteAllReviews',{
      headers: new HttpHeaders({ }),
    body:{songId}, observe: 'response' });
    
  }
  
  //Method to Fetch all reviews for a song from Database and sort them by Date
  getReviews(songId:String): Observable<IReview[]>{
    return this.http.get<IReview[]>('/review/getreviews')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
       map(data => data.filter( data  => data.songId == songId)),
       map(data => data.sort((a, b) => new Date(b.submittedOn).getTime() - new Date(a.submittedOn).getTime()))
       
      );
  }

//Method to add new reviews for a song into Database
  addNewReview(newReview: IReview):Observable<any> {
    console.log(newReview);
    return this.http.put('/review/auth/addreview',newReview);
  }
}

