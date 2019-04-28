import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import { clipsReducer } from './modules/clips';
import { IStore } from './IStore';
import { gamesReducer } from './modules/games';
import { channelsReducer } from './modules/channels';

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
  router: routerReducer,
  clips: clipsReducer,
  games: gamesReducer,
  channels: channelsReducer
});

export default rootReducer;
