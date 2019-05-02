import { expect } from 'chai';
import { fetchMock, mockStore } from '../../../helpers/TestHelper';
import { IClipsAction, GET_CLIPS_REQUEST, GET_CLIPS_SUCCESS, GET_CLIPS_FAILURE, getClips, getClip } from './';
import clipMock from '../../../mocks/clip';

const errResponse = {
  message: 'ERROR :-O',
};

/** Stargazers Module */
describe('Clips Module', () => {
  /** Action Creators */
  describe('Action Creators', () => {
    describe('Get Clips (Async)', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      /** 200 */
      it('dispatches Request and Success Actions on OK clips', done => {
        fetchMock.mock(new URL('https://api.twitch.tv/kraken/clips/top').toString(), {
          status: 200,
          body: {
            clips: Object.keys(clipMock).map((slug) => {
              return clipMock[slug];
            })
          },
        });

        const expectedActions: IClipsAction[] = [
          { type: GET_CLIPS_REQUEST },
          { type: GET_CLIPS_SUCCESS, data: clipMock, label: 'top', search: {} },
        ];

        const store = mockStore({});

        getClips(store.dispatch)
          .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });

      /** 400 */
      it('dispatches Failure on failed clips', done => {
        fetchMock.mock(new URL('https://api.twitch.tv/kraken/clips/top').toString(), {
          status: 400,
          body: errResponse,
        });

        const expectedActions: IClipsAction[] = [
          { type: GET_CLIPS_REQUEST },
          { type: GET_CLIPS_FAILURE, message: errResponse.message },
        ];

        const store = mockStore({});

        getClips(store.dispatch)
          .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });
    });

    describe('Get Clip (Async)', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      /** 200 */
      it('dispatches Request and Success Actions on single OK clip', done => {
        fetchMock.mock('https://api.twitch.tv/kraken/clips/AmazonianEncouragingLyrebirdAllenHuhu', {
          status: 200,
          body: clipMock.AmazonianEncouragingLyrebirdAllenHuhu
        });

        const expectedActions: IClipsAction[] = [
          { type: GET_CLIPS_REQUEST },
          { type: GET_CLIPS_SUCCESS, data: clipMock, label: 'single', search: {} },
        ];

        const store = mockStore({});

        getClip(store.dispatch, 'AmazonianEncouragingLyrebirdAllenHuhu')
        .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });

      /** 400 */
      it('dispatches Failure on single failed clip', done => {
        fetchMock.mock('https://api.twitch.tv/kraken/clips/AmazonianEncouragingLyrebirdAllenHuhu', {
          status: 400,
          body: errResponse,
        });

        const expectedActions: IClipsAction[] = [
          { type: GET_CLIPS_REQUEST },
          { type: GET_CLIPS_FAILURE, message: errResponse.message },
        ];

        const store = mockStore({});

        getClip(store.dispatch, 'AmazonianEncouragingLyrebirdAllenHuhu')
          .then(() => expect(store.getActions()).to.eql(expectedActions))
          .then(() => done())
          .catch(err => done(err));
      });
    });
  });
});
