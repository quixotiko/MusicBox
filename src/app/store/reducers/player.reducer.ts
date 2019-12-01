import { Song } from 'src/app/services/common.types';
import { createReducer, on, Action } from '@ngrx/store';
import { setPlaying, setSongList, setCurrentIndex, setSongListName, setCurrentTime, setIsNew } from '../actions/player.action';

export interface PlayerState {
    isPaused: boolean;

    songList: Song[];
    
    currentIndex: number;

    songListName: string;

    currentTime: number;

    isNew: boolean;//当添加新歌单时设为true，根据这个值初始化音乐播放器
}

export const initialState: PlayerState = {
    isPaused: true,
    songList: [],
    currentIndex: 0,
    songListName: '玫瑰与威士忌•蓝调女歌手精选集',
    currentTime: 0,
    isNew: false 
}

const reducer = createReducer(
    initialState,
    on(setPlaying, (state, { isPaused }) => ({...state, isPaused})), 
    on(setSongList, (state, { songList }) => ({...state, songList})),
    on(setCurrentIndex, (state,{ currentIndex }) => ({...state, currentIndex})),
    on(setSongListName, (state,{ songListName }) => ({...state, songListName})),
    on(setCurrentTime, (state,{ currentTime }) => ({...state, currentTime})),
    on(setIsNew, (state,{ isNew }) => ({...state, isNew}))
)

export function playerReducer(state: PlayerState, action: Action){
    return reducer(state, action);
}