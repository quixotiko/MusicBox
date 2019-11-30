import { createAction, props } from '@ngrx/store';
import { Song } from 'src/app/services/common.types';

export const setPlaying = createAction('[player] Set Playing', props<{isPaused: boolean}>());
export const setSongList = createAction('[player] Set SongList', props<{songList: Song[]}>());
export const setCurrentIndex = createAction('[player] Set CurrentIndex', props<{currentIndex: number}>());

