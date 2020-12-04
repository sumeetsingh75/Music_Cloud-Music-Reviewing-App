import { IPlaylist } from '../playlist';
import { ISong } from '../../songs/songs';

export interface INewPlaylistData{
    playlistInfo: IPlaylist,
    songsInPlaylist: ISong[],
    availableSongs:ISong[],
    playlists:IPlaylist[],
    action:String

}