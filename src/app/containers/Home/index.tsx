import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { RouteComponentProps } from 'react-router';
import { getClips, IClipsAction, IClipsRequest } from '../../redux/modules/clips';
import { IStore } from '../../redux/IStore';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Layout from 'antd/lib/layout';
import { Spinner, Filters } from '../../components';
import _ from 'lodash';

const { Content } = Layout;
const style = require('./style.scss');

interface IMatchParams {
  type: string;
  name: string;
  period: string;
}

interface IProps {
  clips: IClipsRequest;
  dispatch: Dispatch;
}

class HomeC extends React.Component<RouteComponentProps<IMatchParams> & IProps> {
  // public static async fetchData(store: any, match: any) {
  //   await getClips(store.dispatch, {
  //     type: match.params.type,
  //     name: match.params.name,
  //     period: match.params.period || 'week'
  //   });
  // }

  public componentDidMount() {
    const { match, clips, dispatch } = this.props;

    if (!_.isEqual(match.params, clips.search)) {
      getClips(dispatch, {
        type: match.params.type,
        name: match.params.name,
        period: match.params.period || 'week'
      });
    }
  }

  public componentWillReceiveProps(nextProps: RouteComponentProps<IMatchParams> & IProps) {
    if (!_.isEqual(this.props.match.params, nextProps.match.params)) {
      getClips(this.props.dispatch, {
        type: nextProps.match.params.type,
        name: nextProps.match.params.name,
        period: nextProps.match.params.period || 'week'
      });
    }
  }

  public renderClips() {
    const { clips } = this.props;

    const jsx = clips.labels.top.map((slug) => {
      return (
        <Col span={6} key={slug} className={style.clip}>
          <Link to={`/clip/${slug}`}>
            <img src={clips.data[slug].thumbnails.medium} alt={clips.data[slug].title} />
          </Link>
          <div className={style.description}>
            <div className={style.title}>
              <Link to={`/clip/${slug}`}>{clips.data[slug].title}</Link>
            </div>
            <div>
              <span className={style.broadcaster}>
                <Link to={`/channel/${clips.data[slug].broadcaster.display_name}/${clips.search.period}`}>{clips.data[slug].broadcaster.display_name}</Link>
              </span>
              <span className={style.game}>
                <Link to={`/game/${clips.data[slug].game}/${clips.search.period}`}>{clips.data[slug].game}</Link>
              </span>
            </div>
              <div>
                <span className={style.views}>{numeral(clips.data[slug].views).format('0,0')} views</span>
                <span className={style.created_at}>{moment(clips.data[slug].created_at).fromNow()}</span>
              </div>
          </div>
        </Col>
      );
    });

    return <Row gutter={4} type="flex">{jsx}</Row>;
  }

  public render() {
    const { clips, history } = this.props;

    return (
      <div className={style.Home}>
        <Content>
          <Filters history={history} clips={clips} />
          {clips.isFetching && <Spinner />}
          {clips.error && <h2>Error loading clips</h2>}
          {!clips.isFetching && !clips.error && !clips.labels.top.length && <h2>No results found</h2>}
          {!clips.isFetching && !clips.error && !!clips.labels.top.length && <div>
            <h2>Featured</h2>
            {this.renderClips()}
          </div>}
        </Content>
      </div>
    );
  }
}

export const Home = connect(
  (state: IStore) => {
    return { clips: state.clips };
  },
  (d: Dispatch<IClipsAction>) => ({ dispatch: d })
)(HomeC);
