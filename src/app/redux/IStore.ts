import { RouterState } from 'react-router-redux';
import { IClipsRequest } from './modules/clips';
import { IGamesRequest } from './modules/games';
import { IChannelsRequest } from './modules/channels';

export interface IStore {
  router: RouterState;
  clips: IClipsRequest;
  games: IGamesRequest;
  channels: IChannelsRequest;
}
