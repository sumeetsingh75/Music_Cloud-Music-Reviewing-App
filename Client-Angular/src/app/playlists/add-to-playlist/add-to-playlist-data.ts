import {IPlaylist} from '../playlist';
import { IApplicationUser } from 'src/app/application-users';
export interface IAddToPlaylistData{
    playlists:IPlaylist[],
    songId:string,
    loggedInUser:IApplicationUser; 

}