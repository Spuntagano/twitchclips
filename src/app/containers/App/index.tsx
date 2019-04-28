import appConfig from '../../../../config/main';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Navigation } from '../../components';
import { renderRoutes } from 'react-router-config';
import { routes } from '../../routes';
import { hot } from 'react-hot-loader';
import Layout from 'antd/lib/layout';
import Logo from '../../svg/Logo';

const { Header } = Layout;
const style = require('./style.scss');

interface IState {
  loaded: boolean;
}

class AppC extends React.Component {
  public state: IState;

  constructor(props: {}) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  public componentDidMount() {
    this.setState({
      loaded: true
    });
  }

  public render() {
    return this.state.loaded && (
      <Layout className={style.AppContainer}>
        <Helmet {...appConfig.app} {...appConfig.app.head} />
        <Header style={{
          marginBottom: '1.5em',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,.05)',
          height: '4em',
          lineHeight: '4em'
        }}>
          <Link className={style.logoLink} to="/">
            <Logo className={style.logo} />
          </Link>
          <Navigation />
        </Header>
        <Layout className={style.container}>
          {renderRoutes(routes[0].routes)}
        </Layout>
      </Layout>
    );
  }
}

export const App = hot(module)(AppC);
