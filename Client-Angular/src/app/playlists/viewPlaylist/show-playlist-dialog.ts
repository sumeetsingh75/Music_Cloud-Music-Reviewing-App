import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaylistDialogData } from './show-playlist-dialog-data';
@Component({
    selector: 'show-playlist-dialog',
    templateUrl: './show-playlist-dialog.html',
    styleUrls: ['./show-playlist-dialog.css']
  })
  export class ShowPlayListDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ShowPlayListDialog>,
      @Inject(MAT_DIALOG_DATA) public data: PlaylistDialogData) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }