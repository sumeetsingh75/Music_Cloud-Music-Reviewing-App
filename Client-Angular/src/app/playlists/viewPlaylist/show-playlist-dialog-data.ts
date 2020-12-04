import { IPlaylist } from '../playlist';
import { ISong } from 'src/app/songs/songs';

export interface PlaylistDialogData {
    playlist: IPlaylist,
    songs: ISong[]
  }
  