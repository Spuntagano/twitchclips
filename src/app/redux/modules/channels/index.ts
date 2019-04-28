import { Dispatch } from 'redux';
import Fetch from '../../../helpers/Fetch';

export interface IChannel {
  _id: number;
  broadcaster_language: string;
  created_at: string;
  display_name: string;
  followers: number;
  game: string;
  language: string;
  logo: string;
  mature: boolean;
  name: string;
  partner: boolean;
  profile_banner: string;
  profile_banner_background_color: string;
  status: string;
  updated_at: string;
  url: string;
  video_banner: string;
  views: number;
}

export interface IChannels<IChannel> {
  [key: string]: IChannel;
}

export interface IChannelsRequest {
  isFetching: boolean;
  data: IChannels<IChannel>;
  error?: boolean;
  message?: any;
}

/** Action Types */
export const GET_CHANNELS_REQUEST = 'GET_CHANNELS_REQUEST';
export const GET_CHANNELS_RESET = 'GET_CHANNELS_RESET';
export const GET_CHANNELS_SUCCESS = 'GET_CHANNELS_SUCCESS';
export const GET_CHANNELS_FAILURE = 'GET_CHANNELS_FAILURE';

export interface IActionGetChannelsRequest {
  type: typeof GET_CHANNELS_REQUEST;
}

export interface IActionGetChannelsReset {
  type: typeof GET_CHANNELS_RESET;
}

export interface IActionGetChannelsSuccess {
  type: typeof GET_CHANNELS_SUCCESS;
  data: IChannels<IChannel>;
}

export interface IActionGetChannelsFailure {
  type: typeof GET_CHANNELS_FAILURE;
  message: string;
}

export type IChannelsAction = IActionGetChannelsRequest | IActionGetChannelsSuccess | IActionGetChannelsFailure | IActionGetChannelsReset;

/** Initial State */
const initialState: IChannelsRequest = {
  isFetching: false,
  data: {}
};

/** Reducer */
export function channelsReducer(state = initialState, action: IChannelsAction) {
  switch (action.type) {
    case GET_CHANNELS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_CHANNELS_RESET:
      return {
        ...state,
        data: {}
      };

    case GET_CHANNELS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        error: false
      };

    case GET_CHANNELS_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.message,
        error: true
      };

    default:
      return state;
  }
}

/** Async Action Creator */
export async function getChannels(dispatch: Dispatch<IChannelsAction>, search: string) {
  if (!search) {
    return dispatch(channelsReset());
  }

  dispatch(channelsRequest());

  try {
    const url = new URL(`https://api.twitch.tv/kraken/search/channels?query=${search}&limit=${3}`);
    const response = await Fetch(url.toString(), {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'lojsaxagiahvdq30xcx4gxxgycjonb'
      }
    });
    const json = await response.json();

    if (response.ok) {
      return dispatch(channelsSuccess(json.channels.reduce((accumulator: IChannels<IChannel>, channel: IChannel) => {
        accumulator[channel.name] = channel;
        return accumulator;
      }, {})));
    } else {
      return dispatch(channelsFailure(json.message));
    }
  } catch (e) {
    return dispatch(channelsFailure(e.message));
  }
}

/** Action Creator */
export function channelsRequest(): IActionGetChannelsRequest {
  return {
    type: GET_CHANNELS_REQUEST,
  };
}

/** Action Creator */
export function channelsReset(): IActionGetChannelsReset {
  return {
    type: GET_CHANNELS_RESET,
  };
}

/** Action Creator */
export function channelsSuccess(data: IChannels<IChannel>): IActionGetChannelsSuccess {
  return {
    type: GET_CHANNELS_SUCCESS,
    data
  };
}

/** Action Creator */
export function channelsFailure(message: string): IActionGetChannelsFailure {
  return {
    type: GET_CHANNELS_FAILURE,
    message,
  };
}
