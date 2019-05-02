import * as React from 'react';
import {withRouter as router } from 'react-router-dom';
import Select from 'antd/lib/select';
import _ from 'lodash';
import { RouteComponentProps } from 'react-router';
import { Form, FormRenderProps } from 'react-final-form';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IClipsAction, IClipsRequest } from '../../redux/modules/clips';
import { IStore } from '../../redux/IStore';
import { History } from 'history';

const Option = Select.Option;
const style = require('./style.scss');

interface IProps {
  dispatch: Dispatch;
  clips: IClipsRequest;
  history: History;
}

interface IMatchParams {
  type: string;
  title: string;
}

class NavigationC extends React.Component<RouteComponentProps<IMatchParams> & IProps> {
  public onSubmit: () => () => void;
  public onChange: () => (values: string) => void;

  constructor(props: RouteComponentProps<IMatchParams> & IProps) {
    super(props);

    this.onSubmit = () => () => { return; };
    this.onChange = () => (values: string) => this.search(values);
    this.renderForm = this.renderForm.bind(this);
  }

  public search(period: string) {
    const { clips, history } = this.props;

    if (clips.search.type && clips.search.name) {
      history.push({
        pathname: `/${clips.search.type}/${clips.search.name}/${period}`
      });
    } else {
      history.push({
        pathname: `/${period}`
      });
    }
  }

  public renderForm(form: FormRenderProps) {
    const { clips } = this.props;

    return (
      <form onSubmit={form.handleSubmit}>
        <Select value={clips.search.period} onChange={this.onChange()}>
          <Option value="day">Day</Option>
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
          <Option value="all">All</Option>
        </Select>
      </form>
    );
  }

  public render() {
    return (
      <div className={style.Filters}>
        <div className="clearfix">
          <h3 className={style.periodLabel}>Period:</h3>
          <div className={style.period}>
            <Form onSubmit={this.onSubmit()} render={this.renderForm} />
          </div>
        </div>
      </div>
    );
  }
}

export const Filters = connect(
  (state: IStore) => {
    return { clips: state.clips };
  },
  (d: Dispatch<IClipsAction>) => ({ dispatch: d })
)(router(NavigationC as any));
