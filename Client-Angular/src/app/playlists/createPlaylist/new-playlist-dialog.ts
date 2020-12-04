import { Component, Inject } from '@angular/core';
import { IPlaylist } from '../playlist';
import { ISong } from '../../songs/songs';
import { INewPlaylistData } from './new-playlist-data';
import { PlaylistService } from '../playlist.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'show-create-playlist-dialog',
  templateUrl: './new-playlist-dialog.html',
  styleUrls: ['./new-playlist-dialog.css']
})
export class CreateNewPlaylistDialog {
  searchedSongs: ISong[] = this.data.availableSongs;
  _songSearchBy = '';
  get songSearchBy(): string {
    return this._songSearchBy;
  }
  set songSearchBy(value: string) {
    this._songSearchBy = value;
    this.searchedSongs = this.songSearchBy ? this.performSearch(this.songSearchBy) : this.data.availableSongs;
  }
  
  //Perform Search while creating new Playlist
  performSearch(searchBy: string): ISong[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.data.availableSongs.filter((song: ISong) =>
      song.songTitle.toLocaleLowerCase().indexOf(searchBy) !== -1);
  }

  constructor(
    public dialogRef: MatDialogRef<CreateNewPlaylistDialog>, private playlistService: PlaylistService,
    @Inject(MAT_DIALOG_DATA) public data: INewPlaylistData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Method to handle add song in new/existing playlist
  onAddClicked(songId: String) {
    var selectedSong = this.data.availableSongs.splice(this.data.availableSongs.findIndex(x => x.songId == songId), 1)[0];
    this.data.songsInPlaylist.push(selectedSong);
    this.data.playlistInfo.songs.push(selectedSong.songId);
    this.searchedSongs = this.performSearch(this.songSearchBy);
  }

  
  //Method to handle remove song in  new/existing  playlist
  onRemoveClicked(songId: String) {

    var selectedSong = this.data.songsInPlaylist.splice(this.data.songsInPlaylist.findIndex(x => x.songId == songId), 1)[0];
    this.data.availableSongs.push(selectedSong);
    this.data.playlistInfo.songs.splice(this.data.playlistInfo.songs.findIndex(x => x == songId), 1);
    this.searchedSongs = this.performSearch(this.songSearchBy);
  }

  //Service call to add new created/edited list into database
  save() {
    if (this.data.action == 'create') {
      this.playlistService.addPlaylist(this.data.playlistInfo).subscribe(data => {
        if (data) {
          var createdPlaylist: IPlaylist = {
            listId: data.listId,
            listTitle: data.listTitle,
            listDesc: data.listDesc,
            createdOn: data.createdOn,
            createdBy: data.createdBy,
            visibility: data.visibility,
            songs: data.songs
          }
          this.data.playlists.push(createdPlaylist);
        }

      }, error => {

        console.log(JSON.stringify(error.error.details[0].message));
      });
    } else {
      var listId = this.data.playlistInfo.listId;
      this.playlistService.editPlaylist(this.data.playlistInfo).subscribe(res => {
        if (res) {
          this.data.playlists.splice(this.data.playlists.findIndex(x => x.listId == listId), 1)[0];
          this.data.playlists.push(this.data.playlistInfo);
        }

      }, error => {

        console.log(JSON.stringify(error.error.details[0].message));
      });
    }

  }

}