import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IClipsAction } from '../../redux/modules/clips';
import Layout from 'antd/lib/layout';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

const { Content } = Layout;
const style = require('./style.scss');

interface IProps {
  dispatch: Dispatch;
}

class AboutC extends React.Component<IProps> {
  public render() {
    return (
      <div className={style.About}>
        <Content>
          <Row gutter={16} type="flex" justify="space-between">
            <Col span={24}>
                About
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

export const About = connect(
  () => {
    return {};
  },
  (d: Dispatch<IClipsAction>) => ({ dispatch: d })
)(AboutC);
