import { Song } from 'src/app/services/common.types';
import { createReducer, on, Action } from '@ngrx/store';
import { setPlaying, setSongList, setCurrentIndex, setSongListName } from '../actions/player.action';

export interface PlayerState {
    isPaused: boolean;

    songList: Song[];
    
    currentIndex: number;

    songListName: string;
}

export const initialState: PlayerState = {
    isPaused: true,
    songList: [],
    currentIndex: 0,
    songListName: '玫瑰与威士忌•蓝调女歌手精选集'
}

const reducer = createReducer(
    initialState,
    on(setPlaying, (state, { isPaused }) => ({...state, isPaused})), 
    on(setSongList, (state, { songList }) => ({...state, songList})),
    on(setCurrentIndex, (state,{ currentIndex }) => ({...state, currentIndex})),
    on(setSongListName, (state,{ songListName }) => ({...state, songListName}))
)

export function playerReducer(state: PlayerState, action: Action){
    return reducer(state, action);
}