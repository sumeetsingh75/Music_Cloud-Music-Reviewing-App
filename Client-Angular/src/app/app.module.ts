import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { SongsListComponent } from './songs/songs-list/songs-list.component';
import { ShowPlayListDialog } from './playlists/viewPlaylist/show-playlist-dialog';
import { AddNewSongDialog } from './songs/add-new-song/add-song-dialog';
import { HomeComponent } from './home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { ReviewComponent } from './Reviews/review/review.component';
import { AddReviewDialog } from './Reviews/add-review/add-new-review';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateNewPlaylistDialog } from './playlists/createPlaylist/new-playlist-dialog'
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RatingModule } from 'ng-starrating';
import { GoogleLoginProvider, FacebookLoginProvider,AuthService } from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login'; 
import {AddToPlaylistBottomsheet} from './playlists/add-to-playlist/add-to-playlist-bottomsheet';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserTokenInterceptor } from './user-token-interceptor';
import {AuthGuard} from './auth.guard';
import { LoginComponent } from './user-login/login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { SignupComponent } from './user-login/signup/signup.component';

export function socialConfigs() {  
  const config = new AuthServiceConfig(  
    [  
      
      {  
        id: GoogleLoginProvider.PROVIDER_ID,  
        provider: new GoogleLoginProvider('981940788707-855184vmjdn5cgg8c3flqp1plcf2b5lp.apps.googleusercontent.com')  
      } ,
      {  
        id: FacebookLoginProvider.PROVIDER_ID,  
        provider: new FacebookLoginProvider('532759764234641')  
      },  
    ]  
  );  
  return config;  
}  

@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    HomeComponent,
    ReviewComponent,
    AddReviewDialog,
    ShowPlayListDialog,
    AddNewSongDialog,
    CreateNewPlaylistDialog,
    AddToPlaylistBottomsheet,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatButtonToggleModule,
    RatingModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [AuthService,AuthGuard,
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserTokenInterceptor,
      multi: true
    }  ],
  bootstrap: [AppComponent],
  entryComponents: [ReviewComponent, AddReviewDialog,SongsListComponent , ShowPlayListDialog,AddNewSongDialog,CreateNewPlaylistDialog,AddToPlaylistBottomsheet] 
})
export class AppModule { }
