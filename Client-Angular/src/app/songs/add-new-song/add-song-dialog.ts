import { Component, Inject } from '@angular/core';
import { SongService } from '../song.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewSongDialogData } from '../add-new-song/new-song-dialog-data';
import { ISong } from '../../songs/songs';

@Component({
  selector: 'show-addSong-dialog',
  templateUrl: './add-song-dialog.html',
})
export class AddNewSongDialog {

  constructor(
    public dialogRef: MatDialogRef<AddNewSongDialog>, private songService: SongService,
    @Inject(MAT_DIALOG_DATA) public data: AddNewSongDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //Service call to add new Song
  save() {
    console.log("new Review is" + this.data.newSong);

    this.songService.addNewSong(this.data.newSong).subscribe(data => {
      if (data) {
        var addedSong: ISong = {
          songId: data.songId,
          songTitle: data.songTitle,
          artist: data.artist,
          album: data.album,
          year: data.year,
          comment: data.comment,
          genre: data.genre,
          submittedOn: data.submittedOn,
          submittedBy: data.submittedBy,
          numberOfRatings: data.numberOfRatings,
          averageRating: data.averageRating,
          visibility: data.visibility
        }
        this.data.allSongs.push(addedSong);
      }

    }, error => {

      console.log(JSON.stringify(error.error.details[0].message));
    });
  }

}