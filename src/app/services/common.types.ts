export type Song = {
    id?: number;
    name?: string;
    artist?: any[];
    duration?: number;
    url?: string;
    imgUrl?: string;

}
// export type playList = {
//     id: number;
//     name: string;
//     coverImgUrl: string;
//     songs: song[];
//     total: number;
// }
export type PlayLists = {
    
    playlists: any[];
    total?: number;
}