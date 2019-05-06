// tslint:disable: no-unused-expression

import { Navigation } from './index';
import { renderComponentWithRouter } from '../../helpers/TestHelper';
import { createStore } from 'redux';
import rootReducer from '../../redux/reducers';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
const { expect, spy } = chai;

describe('<Navigation />', () => {
    it('Renders with correct style', () => {
        const store = createStore(rootReducer, {});
        const component = renderComponentWithRouter(Navigation, store);
        const style = require('./style.scss');
        expect(component.find(style.Navigation)).to.exist;
      });

    it('Dispatch search action on field change', done => {
        const store = createStore(rootReducer, {});
        const dispatchSpy = spy.on(store, 'dispatch');
        const component = renderComponentWithRouter(Navigation, store);
        const autocomplete = component.find('AutoComplete').first().instance() as any;

        autocomplete.props.onChange('games;|;starCraft');

        setTimeout(() => {
            expect(dispatchSpy).to.have.been.first.called.with({ type: 'GET_GAMES_REQUEST' });
            expect(dispatchSpy).to.have.been.second.called.with({ type: 'GET_CHANNELS_REQUEST' });
            done();
        }, 300);
    });

    it('Pushes history on select', done => {
        const component = renderComponentWithRouter(Navigation);
        const autocomplete = component.find('AutoComplete').first().instance() as any;
        const navigationC = component.find('NavigationC').first().instance() as any;

        const historySpy = spy.on(navigationC.props.history, 'push');
        autocomplete.props.onSelect('games;|;starCraft');

        expect(historySpy).to.have.been.called.with({
            pathname: `/games/starCraft/week`
        });
        done();
    });
});
