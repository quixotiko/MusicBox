import { PlayerState } from "../reducers/player.reducer";
import { createSelector } from '@ngrx/store';

const selectPlayerStates = (state: PlayerState) => state;

export const getPlaying = createSelector(selectPlayerStates, (state:PlayerState) => state.isPaused);
export const getSongList = createSelector(selectPlayerStates, (state:PlayerState) => state.songList);
export const getCurrentIndex = createSelector(selectPlayerStates, (state:PlayerState) => state.currentIndex);
export const getSongListName = createSelector(selectPlayerStates, (state:PlayerState) => state.songListName);
export const getCurrentTime = createSelector(selectPlayerStates, (state:PlayerState) => state.currentTime);
export const getIsNew = createSelector(selectPlayerStates, (state:PlayerState) => state.isNew);
