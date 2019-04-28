import { Dispatch } from 'redux';
import Fetch from '../../../helpers/Fetch';

export interface IGame {
  _id: number;
  box: {
    large: string,
    medium: string,
    small: string,
    template: string
  };
  giantbomb_id: number;
  logo: {
    large: string,
    medium: string,
    small: string,
    template: string
  };
  name: string;
  popularity: number;
}

export interface IGames<IGame> {
  [key: string]: IGame;
}

export interface IGamesRequest {
  isFetching: boolean;
  data: IGames<IGame>;
  error?: boolean;
  message?: any;
}

/** Action Types */
export const GET_GAMES_REQUEST = 'GET_GAMES_REQUEST';
export const GET_GAMES_RESET = 'GET_GAMES_RESET';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const GET_GAMES_FAILURE = 'GET_GAMES_FAILURE';

export interface IActionGetGamesRequest {
  type: typeof GET_GAMES_REQUEST;
}

export interface IActionGetGamesReset {
  type: typeof GET_GAMES_RESET;
}

export interface IActionGetGamesSuccess {
  type: typeof GET_GAMES_SUCCESS;
  data: IGames<IGame>;
}

export interface IActionGetGamesFailure {
  type: typeof GET_GAMES_FAILURE;
  message: string;
}

export type IGamesAction = IActionGetGamesRequest | IActionGetGamesSuccess | IActionGetGamesFailure | IActionGetGamesReset;

/** Initial State */
const initialState: IGamesRequest = {
  isFetching: false,
  data: {}
};

/** Reducer */
export function gamesReducer(state = initialState, action: IGamesAction) {
  switch (action.type) {
    case GET_GAMES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_GAMES_RESET:
      return {
        ...state,
        data: {}
      };

    case GET_GAMES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        error: false
      };

    case GET_GAMES_FAILURE:
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
export async function getGames(dispatch: Dispatch<IGamesAction>, search: string) {
  if (!search) {
    return dispatch(gamesReset());
  }

  dispatch(gamesRequest());

  try {
    const url = new URL(`https://api.twitch.tv/kraken/search/games?query=${search}`);
    const response = await Fetch(url.toString(), {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'lojsaxagiahvdq30xcx4gxxgycjonb'
      }
    });
    const json = await response.json();

    if (response.ok) {
      return dispatch(gamesSuccess(json.games.reduce((accumulator: IGames<IGame>, game: IGame) => {
        accumulator[game._id] = game;
        return accumulator;
      }, {})));
    } else {
      return dispatch(gamesFailure(json.message));
    }
  } catch (e) {
    return dispatch(gamesFailure(e.message));
  }
}

/** Action Creator */
export function gamesRequest(): IActionGetGamesRequest {
  return {
    type: GET_GAMES_REQUEST,
  };
}

/** Action Creator */
export function gamesReset(): IActionGetGamesReset {
  return {
    type: GET_GAMES_RESET,
  };
}

/** Action Creator */
export function gamesSuccess(data: IGames<IGame>): IActionGetGamesSuccess {
  return {
    type: GET_GAMES_SUCCESS,
    data
  };
}

/** Action Creator */
export function gamesFailure(message: string): IActionGetGamesFailure {
  return {
    type: GET_GAMES_FAILURE,
    message,
  };
}
