import { Component, OnInit, Inject } from '@angular/core';
import { SongService } from '../song.service';
import { PlaylistService } from '../../playlists/playlist.service';
import { ISong } from '../songs';
import { IPlaylist } from '../../playlists/playlist';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateNewPlaylistDialog } from '../../playlists/createPlaylist/new-playlist-dialog'
import { AddNewSongDialog } from '../add-new-song/add-song-dialog';
import { ShowPlayListDialog } from '../../playlists/viewPlaylist/show-playlist-dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddToPlaylistBottomsheet } from '../../playlists/add-to-playlist/add-to-playlist-bottomsheet';
import { ReviewService } from '../../Reviews/review.service';
import { UserService } from '../../user.service';
import { IApplicationUser } from '../../application-users';
@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  panelOpenState: string = "songs";
  songs: ISong[] = [];
  playlists: IPlaylist[] = [];
  searchedPlaylists: IPlaylist[] = [];
  searchedSongs: ISong[] = [];
  errorMessage = '';
  selected = 'songs';
  isAuth: boolean;
  isAdmin: boolean;
  authUser: IApplicationUser;
  songsInPlaylist: ISong[] = [];
  applicationUsers: IApplicationUser[] = [];
  searchedApplicationUsers: IApplicationUser[] = [];
  response: any;


  constructor(private songService: SongService, private playlistService: PlaylistService, private reviewService: ReviewService,
    private userService: UserService, public dialog: MatDialog, private route: ActivatedRoute, private _bottomSheet: MatBottomSheet) {
  }

  //Method to open bottomsheet to display logged-in user playlists to add songs
  openBottomSheet(songId: string): void {
    this._bottomSheet.open(AddToPlaylistBottomsheet, {
      data: {
        playlists: this.playlists,
        songId: songId,
        loggedInUser: this.authUser
      }
    });
  }

  _searchBy = '';
  get searchBy(): string {
    return this._searchBy;
  }
  set searchBy(value: string) {
    this._searchBy = value;
    if (this.panelOpenState == 'songs')
      this.searchedSongs = this.searchBy ? this.performSongSearch(this.searchBy) : this.songs;

    if (this.panelOpenState == 'users')
      this.searchedApplicationUsers = this.searchBy ? this.performUserSearch(this.searchBy) : this.applicationUsers;

    if (this.panelOpenState == 'playlists')
      this.searchedPlaylists = this.searchBy ? this.performPlaylistSearch(this.searchBy) : this.playlists;
  }

  //Perform Search on Song
  performSongSearch(searchBy: string): ISong[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.songs.filter((song: ISong) =>
      song.songTitle.toLocaleLowerCase().indexOf(searchBy) !== -1 ||
      song.artist.toLocaleLowerCase().indexOf(searchBy) !== -1 ||
      song.album.toLocaleLowerCase().indexOf(searchBy) !== -1 ||
      song.genre.toLocaleLowerCase().indexOf(searchBy) !== -1 ||
      song.year.toString().indexOf(searchBy) !== -1);
  }

   //Perform Search on User
  performUserSearch(searchBy: string): IApplicationUser[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.applicationUsers.filter((user: IApplicationUser) =>
      user.name.toLocaleLowerCase().indexOf(searchBy) !== -1);
  }

   //Perform Search on Playlists
  performPlaylistSearch(searchBy: string): IPlaylist[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.playlists.filter((playlist: IPlaylist) =>
      playlist.listTitle.toLocaleLowerCase().indexOf(searchBy) !== -1);
  }

  showPlaylistDialog(event: Event, listId: string): void {
    var plist = this.getListbyId(listId);
    var plsongs: ISong[] = [];
    for (var i = 0; i < plist.songs.length; i++) {
      plsongs.push(this.getSongById(plist.songs[i]))
    }

    const dialogRef = this.dialog.open(ShowPlayListDialog, {
      width: '400px',
      data: {
        playlist: plist,
        songs: plsongs
      }
    });

  }

//Fetching Playlist object from playlist Id
  getListbyId(listId: string) {
    for (var i = 0; i < this.playlists.length; i++) {
      if (this.playlists[i].listId === listId)
        return this.playlists[i];

    }
  }


//Fetching Song object from Song Id
  getSongById(songId: String): ISong {
    var i = 0;
    for (var i = 0; i < this.songs.length; i++) {
      if (this.songs[i].songId == songId) {
        return this.songs[i];
      }
    }
    var dummy: ISong = {
      songId: "",
      songTitle: "",
      artist: "",
      album: "",
      year: 0,
      comment: "",
      genre: "",
      submittedOn: new Date,
      submittedBy: "",
      numberOfRatings: 0,
      averageRating: 0,
      visibility: false
    }

    return dummy;
  }

  
//Shows Dialog to add new song
  showAddSongDialog() {
    var user = JSON.parse(localStorage.getItem("socialusers"));
    var newSong: ISong = {
      songId: "",
      songTitle: "",
      artist: "",
      album: "",
      year: 2019,
      comment: "",
      genre: "",
      submittedOn: new Date(),
      submittedBy: user.email,
      numberOfRatings: 0,
      averageRating: 0,
      visibility: true
    };
    const dialogRef = this.dialog.open(AddNewSongDialog, {
      width: '400px',
      data: {
        newSong: newSong,
        allSongs: this.songs
      }
    });

  }

  //Shows Dialog to create new Playlist
  showCreatePlaylistDialog(action: string, listId: string) {
    console.log(listId);
    var user = JSON.parse(localStorage.getItem("socialusers"));
    if (action == 'create') {
      var newPlaylist: IPlaylist = {
        listId: "",
        listTitle: "",
        listDesc: "",
        createdOn: new Date(),
        createdBy: user.email,
        visibility: true,
        songs: []
      };

      var allSongs: ISong[] = Object.assign([], this.songs);
      var playlistSongs: ISong[] = Object.assign([], this.songsInPlaylist);
    }
    else {
      var newPlaylist: IPlaylist = this.getListbyId(listId);

      var playlistSongs: ISong[] = [];
      for (var i = 0; i < newPlaylist.songs.length; i++) {
        playlistSongs.push(this.getSongById(newPlaylist.songs[i]))
      }

      var allSongs: ISong[] = Object.assign([], this.songs);
      for (var i = 0; i < newPlaylist.songs.length; i++)
        allSongs.splice(allSongs.findIndex(x => x.songId == newPlaylist.songs[i]), 1);


    }

    const dialogRef = this.dialog.open(CreateNewPlaylistDialog, {
      height: '400px',
      width: '600px',
      data: {
        availableSongs: allSongs,
        playlistInfo: newPlaylist,
        songsInPlaylist: playlistSongs,
        playlists: this.playlists,
        action: action
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    });

  }
  ngOnInit() {
    this.route.params.subscribe(params => {

      if (params['flag'] == 'true') 
        this.isAuth = true;
      else
        this.isAuth = false;

      if (params['isadmin'] == 'true')
        this.isAdmin = true;
      else
        this.isAdmin = false;


      console.log(this.isAuth, this.isAdmin);
      this.authUser = JSON.parse(localStorage.getItem("socialusers"));
      console.log(this.authUser);
    });


    if (this.isAdmin) {
      this.songService.getAllSongsForAdmin().subscribe({
        next: songs => {
          this.songs = songs;
          this.searchedSongs = this.songs;
        },
        error: err => this.errorMessage = err
      });


      this.userService.getAllUsers().subscribe((res) => {
        this.response = res;
        console.log(this.response);
        for (var i = 0; i < this.response.length; i++) {
          if (this.response[i]._id != this.authUser.userId) {
            if (this.response[i].method == 'local') {
              var appuser: IApplicationUser = {
                userId: this.response[i]._id,
                method: "local",
                name: this.response[i].local.name,
                email: this.response[i].local.email,
                role: this.response[i].role,
                status: this.response[i].status
              }

              this.applicationUsers.push(appuser);
            }
            else {
              var appuser: IApplicationUser = {
                userId: this.response[i]._id,
                method: "facebook",
                name: this.response[i].facebook.name,
                email: this.response[i].facebook.email,
                role: this.response[i].role,
                status: this.response[i].status
              }
              this.applicationUsers.push(appuser);
            }


          }
        }
        console.log(this.applicationUsers);
        this.searchedApplicationUsers = this.applicationUsers;

      });



    } else {
      this.songService.getSongs().subscribe({
        next: songs => {
          this.songs = songs;
          this.searchedSongs = this.songs;
        },
        error: err => this.errorMessage = err
      });

    }


    var user = JSON.parse(localStorage.getItem("socialusers"));
    if (user) {

      this.playlistService.getLoggedInUserPlaylists(user.email).subscribe({
        next: playlists => {
          this.playlists = playlists;
          this.searchedPlaylists = this.playlists;
        },
        error: err => this.errorMessage = err
      });
    }
    else {
      this.playlistService.getPlaylists().subscribe({
        next: playlists => {
          this.playlists = playlists;
          this.searchedPlaylists = this.playlists;
        },
        error: err => this.errorMessage = err
      });
    }

  }

  //Service call to show/hide playlist
  togglePlaylistVisibility(action: string, playlistId: string) {
    var visibility: boolean;
    if (action == "hide")
      visibility = false;

    else
      visibility = true

    console.log("playlist id is" + playlistId);
    this.playlistService.toggleVisibility(visibility, playlistId).subscribe(res => {
      if (res && res.status == 200) {
        console.log(res.status);
        this.getListbyId(playlistId).visibility = visibility;
      }
    });
  }

  //Service call to show/hide playlist by Admin
  toggleSongVisibility(action: string, songId: string) {
    var visibility: boolean;
    if (action == "hide")
      visibility = false;

    else
      visibility = true

    this.songService.toggleVisibility(visibility, songId).subscribe(res => {
      if (res && res.status == 200) {
        console.log(res.status);
        this.getSongById(songId).visibility = visibility;

      }
    });
  }

  //Service call to activate/deactivate user
  toggleUserStatus(action: string, user: IApplicationUser) {
   this.userService.toggleStatus(action, user).subscribe(res => {
      if (res && res.status == 200) {
        console.log(res.status);
        this.applicationUsers[this.applicationUsers.findIndex(x => x.userId == user.userId)].status = action;
      }
    });
  }

  //Service call to grant/revoke admin permissions to user
  toggleAdminAccess(action: string, user: IApplicationUser) {
    this.userService.toggleAccess(action, user).subscribe(res => {
      if (res && res.status == 200) {
        console.log(res.status);
        this.applicationUsers[this.applicationUsers.findIndex(x => x.userId == user.userId)].role = action;
      }
    });
  }

//Service call to delete song using song ID
  deleteSong(songId: string) {
    if (this.getSongById(songId).numberOfRatings > 0) {
      this.reviewService.deleteReviews(songId).subscribe(res => {
        if (res && res.status == 200) {
          console.log(res.status);
        }
      });
    }

    this.songService.deleteSong(songId).subscribe(res => {
      if (res && res.status == 200) {
        this.songs.splice(this.songs.findIndex(x => x.songId == songId), 1);
      }
    });

  }

  onPlaylistPanelSelected(event: MatTabChangeEvent) {

    if (event.index == 0)
      this.panelOpenState = 'songs';

    if (event.index == 1)
      this.panelOpenState = 'playlists';

    if (event.index == 2)
      this.panelOpenState = 'users';

    console.log(this.panelOpenState);

  }

}



