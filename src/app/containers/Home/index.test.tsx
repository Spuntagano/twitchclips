// tslint:disable: no-unused-expression

import { expect } from 'chai';
import { renderComponent, createState } from '../../helpers/TestHelper';
import { Home } from './index';
import clipMock from '../../mocks/clip';

/** Mock App. State */
const state = createState({
  clips: {
    data: {
      ...clipMock
    },
    isFetching: false,
    labels: {
      top: [...Object.keys(clipMock)],
      single: []
    },
    search: {}
  },
});

describe('<Home />', () => {
  const component = renderComponent(Home, {}, state);
  const style = require('./style.scss');

  it('Renders with correct style', () => {
    expect(component.find(style.Home)).to.exist;
  });

  it('Renders clips', () => {
    expect(component.find(`.${style.title}`).text()).to.eql('Clip Title Editing');
  });
});
