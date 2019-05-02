import { Dispatch } from 'redux';
import Fetch from '../../../helpers/Fetch';

export interface IClip {
  slug: string;
  tracking_id: string;
  url: string;
  embed_url: string;
  embed_html: string;
  broadcaster: {
    id: string
    name: string,
    display_name: string,
    channel_url: string,
    logo: string
  };
  curator: {
    id: string,
    name: string,
    display_name: string,
    channel_url: string,
    logo: string
  };
  vod: {
    id: string,
    url: string
  };
  game: string;
  language: string;
  title: string;
  views: number;
  duration: number;
  created_at: string;
  thumbnails: {
    medium: string,
    small: string,
    tiny: string
  };
}

export interface IClips<IClip> {
  [key: string]: IClip;
}

export interface ILabels {
  [label: string]: string[];
}

export interface IClipsRequest {
  isFetching: boolean;
  data: IClips<IClip>;
  error?: boolean;
  message?: any;
  labels: ILabels;
  search: IClipsSearch;
}

/** Action Types */
export const GET_CLIPS_REQUEST = 'GET_CLIPS_REQUEST';
export const GET_CLIPS_SUCCESS = 'GET_CLIPS_SUCCESS';
export const GET_CLIPS_FAILURE = 'GET_CLIPS_FAILURE';

export interface IActionGetClipsRequest {
  type: typeof GET_CLIPS_REQUEST;
}

export interface IActionGetClipsSuccess {
  type: typeof GET_CLIPS_SUCCESS;
  data: IClips<IClip>;
  label: string;
  search: IClipsSearch;
}

export interface IActionGetClipsFailure {
  type: typeof GET_CLIPS_FAILURE;
  message: string;
}

export interface IClipsSearch {
  type?: string;
  name?: string;
  period?: string;
}

export type IClipsAction = IActionGetClipsRequest | IActionGetClipsSuccess | IActionGetClipsFailure;

/** Initial State */
const initialState: IClipsRequest = {
  isFetching: false,
  data: {},
  labels: {
    top: [],
    single: []
  },
  search: {
    type: undefined,
    name: undefined,
    period: 'week'
  }
};

/** Reducer */
export function clipsReducer(state = initialState, action: IClipsAction) {
  switch (action.type) {
    case GET_CLIPS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case GET_CLIPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          ...action.data
        },
        labels: {
          ...state.labels,
          [action.label]: Object.keys(action.data)
        },
        search: action.search,
        error: false
      };

    case GET_CLIPS_FAILURE:
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
export async function getClips(dispatch: Dispatch<IClipsAction>, search: IClipsSearch = {}) {
  dispatch(clipsRequest());

  try {
    const url = new URL('https://api.twitch.tv/kraken/clips/top');
    if (search.type && search.name) {
      url.searchParams.append(search.type, search.name);
    }

    if (search.period) {
      url.searchParams.append('period', search.period);
    }

    const response = await Fetch(url.toString(), {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'lojsaxagiahvdq30xcx4gxxgycjonb'
      }
    });
    const json = await response.json();

    if (response.ok) {
      return dispatch(clipsSuccess(json.clips.reduce((accumulator: IClips<IClip>, clip: IClip) => {
        accumulator[clip.slug] = clip;
        return accumulator;
      }, {}), 'top', search));
    } else {
      return dispatch(clipsFailure(json.message));
    }
  } catch (e) {
    return dispatch(clipsFailure(e));
  }
}

/** Async Action Creator */
export async function getClip(dispatch: Dispatch<IClipsAction>, slug: string) {
  dispatch(clipsRequest());

  try {
    const response = await Fetch(`https://api.twitch.tv/kraken/clips/${slug}`, {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'lojsaxagiahvdq30xcx4gxxgycjonb'
      }
    });
    const json = await response.json();

    if (response.ok) {
      return dispatch(clipsSuccess({
        [json.slug]: json
      }, 'single'));
    } else {
      return dispatch(clipsFailure(json.message));
    }
  } catch (e) {
    return dispatch(clipsFailure(e));
  }
}

/** Action Creator */
export function clipsRequest(): IActionGetClipsRequest {
  return {
    type: GET_CLIPS_REQUEST,
  };
}

/** Action Creator */
export function clipsSuccess(data: IClips<IClip>, label: string, search: IClipsSearch = {}): IActionGetClipsSuccess {
  return {
    type: GET_CLIPS_SUCCESS,
    data,
    label,
    search
  };
}

/** Action Creator */
export function clipsFailure(message: string): IActionGetClipsFailure {
  return {
    type: GET_CLIPS_FAILURE,
    message,
  };
}
