import { expect } from 'chai';
import { fetchMock, mockStore } from '../../../helpers/TestHelper';
import { IChannelsAction, GET_CHANNELS_REQUEST, GET_CHANNELS_SUCCESS, GET_CHANNELS_FAILURE, GET_CHANNELS_RESET, getChannels } from './';
import channelMock from '../../../mocks/channel';

const errResponse = {
  message: 'ERROR :-O',
};

/** Stargazers Module */
describe('Channels Module', () => {
  /** Action Creators */
  describe('Action Creators', () => {
    describe('Get Channels (Async)', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      /** 200 */
      it('dispatches Request and Success Actions on OK channels', done => {
        const query = 'hearthstone';
        const url = new URL(`https://api.twitch.tv/kraken/search/channels?query=${query}&limit=${3}`);

        fetchMock.mock(url.toString(), {
          status: 200,
          body: {
            channels: Object.keys(channelMock).map((id) => {
              return channelMock[id];
            })
          },
        });

        const expectedActions: IChannelsAction[] = [
          { type: GET_CHANNELS_REQUEST },
          { type: GET_CHANNELS_SUCCESS, data: channelMock },
        ];

        const store = mockStore({});

        getChannels(store.dispatch, query)
          .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });

      /** 400 */
      it('dispatches Failure on failed channels', done => {
        const query = 'hearthstone';
        const url = new URL(`https://api.twitch.tv/kraken/search/channels?query=${query}&limit=${3}`);

        fetchMock.mock(url.toString(), {
          status: 400,
          body: errResponse,
        });

        const expectedActions: IChannelsAction[] = [
          { type: GET_CHANNELS_REQUEST },
          { type: GET_CHANNELS_FAILURE, message: errResponse.message },
        ];

        const store = mockStore({});

        getChannels(store.dispatch, query)
          .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });

      /** empty search */
      it('dispatches Reset on empty search string', done => {
        const expectedActions: IChannelsAction[] = [
          { type: GET_CHANNELS_RESET },
        ];

        const store = mockStore({});

        getChannels(store.dispatch, '')
          .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });
    });
  });
});
