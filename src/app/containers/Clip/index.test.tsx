// tslint:disable: no-unused-expression

import { expect } from 'chai';
import { createState, renderComponentWithRouter } from '../../helpers/TestHelper';
import { Clip } from './index';
import clipMock from '../../mocks/clip';

/** Mock App. State */
const state = createState({
  clips: {
    data: {
      ...clipMock
    },
    isFetching: false,
    labels: {
      top: [],
      single: [...Object.keys(clipMock)]
    },
    search: {}
  }
});

describe('<Clip />', () => {
  const component = renderComponentWithRouter(Clip, state, '/clip', '/AmazonianEncouragingLyrebirdAllenHuhu', '/clip/:slug');
  const style = require('./style.scss');

  it('Renders with correct style', () => {
    expect(component.find(style.Clip)).to.exist;
  });

  it('Renders clip', () => {
    expect(component.find(`.${style.title}`).text()).to.eql('Clip Title Editing');
  });
});
