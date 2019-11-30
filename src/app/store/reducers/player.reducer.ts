import { Song } from 'src/app/services/common.types';
import { createReducer, on, Action } from '@ngrx/store';
import { setPlaying, setSongList, setCurrentIndex } from '../actions/player.action';

export interface PlayerState {
    isPaused: boolean;

    songList: Song[];
    
    currentIndex: number;
}

export const initialState: PlayerState = {
    isPaused: true,
    songList: [],
    currentIndex: -1
}

const reducer = createReducer(
    initialState,
    on(setPlaying, (state, { isPaused }) => ({...state, isPaused})), 
    on(setSongList, (state, { songList }) => ({...state, songList})),
    on(setCurrentIndex, (state,{ currentIndex }) => ({...state, currentIndex}))
)

export function playerReducer(state: PlayerState, action: Action){
    return reducer(state, action);
}