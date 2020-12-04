export interface ISong {
    songId: any;
    songTitle: string;
    artist: string;
    album: string;
    year: number;
    comment: string;
    genre: string;
    submittedOn: Date;
    submittedBy: String;
    numberOfRatings: number;
    averageRating:number;
    visibility:boolean;
}
