import { createAction, props } from '@ngrx/store';
import { Song } from 'src/app/services/common.types';

export const setPlaying = createAction('[player] Set Playing', props<{isPaused: boolean}>());
export const setSongList = createAction('[player] Set SongList', props<{songList: Song[]}>());
export const setCurrentIndex = createAction('[player] Set CurrentIndex', props<{currentIndex: number}>());
export const setSongListName = createAction('[player] Set SongListName', props<{songListName: string}>());
export const setCurrentTime = createAction('[player] Set CurrentTime', props<{currentTime: number}>());

