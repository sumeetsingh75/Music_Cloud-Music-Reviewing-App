export interface IPlaylist {
    listId: string,
    listTitle: string,
    listDesc: string,
    createdOn: Date,
    createdBy: string,
    visibility: boolean,
    songs: string[]
}