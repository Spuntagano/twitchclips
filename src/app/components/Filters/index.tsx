import * as React from 'react';
import Select from 'antd/lib/select';
import _ from 'lodash';
import { Form, FormRenderProps } from 'react-final-form';
import { IClipsRequest } from '../../redux/modules/clips';
import { History } from 'history';

const Option = Select.Option;
const style = require('./style.scss');

interface IProps {
  clips: IClipsRequest;
  history: History;
}

class FiltersC extends React.Component<IProps> {
  public onSubmit: () => () => void;
  public onChange: () => (values: string) => void;

  constructor(props: IProps) {
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

export const Filters = FiltersC;
