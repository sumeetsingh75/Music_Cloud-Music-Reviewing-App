import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { ISong } from './songs';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  /*Method to fetch all songs from Admin View*/
  getAllSongsForAdmin(): Observable<ISong[]>{
    return this.http.get<ISong[]>('/song/auth/songsForAdmin')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        map(data => data.sort((a,b)=> b.numberOfRatings - a.numberOfRatings))
       
      );
  }

  /*Method to delete song from Database using Song Id*/
  deleteSong(songId: string) :Observable<any> {
    return this.http.request("DELETE",'/song/auth/deleteSong',{
      headers: new HttpHeaders({
          
      }),
    body:{songId}, observe: 'response' });
  }

  /*Method to show/hide song*/
  toggleVisibility(visibility: boolean, songId: string):Observable<any>  {
    var data = {
      "visibility": visibility,
      "songId":songId
    };
    
    return this.http.post('/song/auth/changevisibility',data, { observe: 'response' });
  }

  /*Method to add new Song into Database*/
  addNewSong(newSong: ISong):Observable<any> {

    return this.http.put('/song/auth/addsong',newSong);
  }
 
/*Method to get songs and sorting them on the basis of number of Reviews*/
  getSongs(): Observable<ISong[]>{
    return this.http.get<ISong[]>('/song/getsongs')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        map(data => data.sort((a,b)=> b.numberOfRatings - a.numberOfRatings))     
      );
  }
}
