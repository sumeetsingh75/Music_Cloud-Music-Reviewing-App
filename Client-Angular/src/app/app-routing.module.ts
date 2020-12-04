import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsListComponent } from './songs/songs-list/songs-list.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth.guard';
import { LoginComponent } from './user-login/login/login.component';
import { SignupComponent } from './user-login/signup/signup.component';

const routes: Routes = [ 
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'songsList',component:SongsListComponent},
  {path:'auth/:flag/:isadmin',component:SongsListComponent,canActivate:[AuthGuard]},
//  {path:'auth/:flag',component:SongsListComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
