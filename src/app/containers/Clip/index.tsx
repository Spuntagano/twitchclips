import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import numeral from 'numeral';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { getClip, IClipsAction, IClipsRequest } from '../../redux/modules/clips';
import { IStore } from '../../redux/IStore';
import Layout from 'antd/lib/layout';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

const { Content } = Layout;
const style = require('./style.scss');

interface IMatchParams {
  slug: string;
}

interface IProps {
  clips: IClipsRequest;
  dispatch: Dispatch;
}

class ClipC extends React.Component<RouteComponentProps<IMatchParams> & IProps> {
  // public static async fetchData(store: any, match: any) {
  //   await getClip(store.dispatch, match.params.slug);
  // }

  public componentDidMount() {
    const { match, clips } = this.props;

    if (clips.labels.single[0] !== match.params.slug) {
      getClip(this.props.dispatch, match.params.slug);
    }
  }

  public render() {
    const { clips } = this.props;

    return (
      <div className={style.Clip}>
        <Content>
          {clips.isFetching && <span>Loading...</span>}
          {clips.error && <span>Error loading clips</span>}
          <Row gutter={16} type="flex" justify="space-between">
            <Col span={24}>
                {clips.data[clips.labels.single[0]] && <div className={style.video}>
                  <iframe
                    src={clips.data[clips.labels.single[0]].embed_url}
                    scrolling="no"
                    allowFullScreen={true}
                  />
                </div>}
                {clips.data[clips.labels.single[0]] && <div className={style.description}>
                  <div className={style.title}>
                      {clips.data[clips.labels.single[0]].title}
                  </div>
                  <div className={style.views}>
                      {numeral(clips.data[clips.labels.single[0]].views).format('0,0')} views
                  </div>
                  <hr />
                  <div className={`${style.broadcaster} clearfix`}>
                    <img src={clips.data[clips.labels.single[0]].broadcaster.logo} alt={clips.data[clips.labels.single[0]].broadcaster.name}/>
                    <div className={style.broadcasterInfo}>
                      <div className={style.name}>
                        {clips.data[clips.labels.single[0]].broadcaster.name}
                      </div>
                      <div className={style.date}>
                        Created on {moment(clips.data[clips.labels.single[0]].created_at).format('MMM Do YYYY')}
                      </div>
                    </div>
                  </div>
                </div>}
                {!clips.data[clips.labels.single[0]] && <div>Clip not found</div>}
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

export const Clip = connect(
  (state: IStore) => {
    return { clips: state.clips };
  },
  (d: Dispatch<IClipsAction>) => ({ dispatch: d })
)(ClipC);
