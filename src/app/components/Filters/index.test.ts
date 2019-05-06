// tslint:disable: no-unused-expression

import { Filters } from './index';
import { renderComponent, createState } from '../../helpers/TestHelper';
import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
const { expect } = chai;

describe('<Filters />', () => {
    it('Renders with correct style', () => {
        const history = {
            push: chai.spy()
        };

        const clips = createState().clips;
        const component = renderComponent(Filters, { history, clips });
        const style = require('./style.scss');
        expect(component.find(style.Filters)).to.exist;
      });

    it('Pushes history on change without search', done => {
        const history = {
            push: chai.spy()
        };

        const clips = createState().clips;

        const component = renderComponent(Filters, { history, clips });
        const select = component.find('Select').first().instance() as any;

        select.props.onChange('day');

        expect(history.push).to.be.called.with({
            pathname: `/day`
        });

        done();
    });

    it('Pushes history on change with search', done => {
        const history = {
            push: chai.spy()
        };

        const clips = createState({
            ...createState(),
            clips: {
                ...createState().clips,
                search: {
                    type: 'games',
                    name: 'starCraft'
                }
            }
        }).clips;

        const component = renderComponent(Filters, { clips, history });
        const select = component.find('Select').first().instance() as any;

        select.props.onChange('day');

        expect(history.push).to.be.called.with({
            pathname: `/games/starCraft/day`
        });

        done();
    });
});
