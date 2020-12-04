import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPlaylist } from './playlist';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Options } from 'selenium-webdriver/chrome';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  //Method to get Logged-In user Playlists from Database
  getLoggedInUserPlaylists(email: string): Observable<IPlaylist[]> {
    var data = { email: email };
    return this.http.get<IPlaylist[]>('/playlist/auth/getplaylists')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        map(data => data.filter(data => data.createdBy == email || data.visibility == true)),

      );
  }

  //Method to get show/Hide Playlist
  toggleVisibility(visibility: boolean, playlistId: string): Observable<any> {
    var data = {
      "visibility": visibility,
      "playlistId": playlistId
    };
    console.log(data);
    return this.http.post('/playlist/auth/changevisibility', data, { observe: 'response' });
  }

  //Method to Save Edited Playlists into Database
  editPlaylist(playlistInfo: IPlaylist): Observable<any> {
    return this.http.post('/playlist/auth/editplaylist', playlistInfo, { observe: 'response' });
  }

  //Method to Save  Playlists into Database
  addPlaylist(playlistInfo: IPlaylist): Observable<any> {
    return this.http.put('/playlist/auth/addplaylist', playlistInfo);
  }

  //Method to get  Playlists from Database
  getPlaylists(): Observable<IPlaylist[]> {
    return this.http.get<IPlaylist[]>('/playlist/getplaylists')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))

      );
  }


}
