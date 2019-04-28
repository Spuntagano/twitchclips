import { expect } from 'chai';
import { fetchMock, mockStore } from '../../../helpers/TestHelper';
import { IGamesAction, GET_GAMES_REQUEST, GET_GAMES_SUCCESS, GET_GAMES_FAILURE, GET_GAMES_RESET, getGames } from './';
import gameMock from '../../../mocks/game';

const errResponse = {
  message: 'ERROR :-O',
};

/** Stargazers Module */
describe('Games Module', () => {
  /** Action Creators */
  describe('Action Creators', () => {
    describe('Get Games (Async)', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      /** 200 */
      it('dispatches Request and Success Actions on OK games', done => {
        const query = 'hearthstone';
        const url = new URL(`https://api.twitch.tv/kraken/search/games?query=${query}`);

        fetchMock.mock(url.toString(), {
          status: 200,
          body: {
            games: Object.keys(gameMock).map((id) => {
              return gameMock[id];
            })
          },
        });

        const expectedActions: IGamesAction[] = [
          { type: GET_GAMES_REQUEST },
          { type: GET_GAMES_SUCCESS, data: gameMock },
        ];

        const store = mockStore({});

        getGames(store.dispatch, query)
          .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });

      /** 400 */
      it('dispatches Failure on failed games', done => {
        const query = 'hearthstone';
        const url = new URL(`https://api.twitch.tv/kraken/search/games?query=${query}`);

        fetchMock.mock(url.toString(), {
          status: 400,
          body: errResponse,
        });

        const expectedActions: IGamesAction[] = [
          { type: GET_GAMES_REQUEST },
          { type: GET_GAMES_FAILURE, message: errResponse.message },
        ];

        const store = mockStore({});

        getGames(store.dispatch, query)
          .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });

      /** empty search */
      it('dispatches Reset on empty search string', done => {
        const expectedActions: IGamesAction[] = [
          { type: GET_GAMES_RESET }
        ];

        const store = mockStore({});

        getGames(store.dispatch, '')
          .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });
    });
  });
});
