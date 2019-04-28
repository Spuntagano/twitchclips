// tslint:disable: no-unused-expression

import { expect } from 'chai';
import { renderComponent } from '../../helpers/TestHelper';
import { About } from './index';

describe('<About />', () => {
  const component = renderComponent(About);

  it('Renders with correct style', () => {
    const style = require('./style.scss');
    expect(component.find(style.About)).to.exist;
  });
});
