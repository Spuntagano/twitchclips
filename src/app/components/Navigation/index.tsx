import * as React from 'react';
import { Link, withRouter as router } from 'react-router-dom';
import AutoComplete from 'antd/lib/auto-complete';
import _ from 'lodash';
import { Form, Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getClips } from '../../redux/modules/clips';
import { getChannels, IChannelsRequest, IChannelsAction } from '../../redux/modules/channels';
import { getGames, IGamesRequest, IGamesAction } from '../../redux/modules/games';
import { IStore } from '../../redux/IStore';
import { History } from 'history';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const style = require('./style.scss');

interface IProps {
  dispatch: Dispatch;
  games: IGamesRequest;
  channels: IChannelsRequest;
  history: History;
}

interface IForm {
  search?: string;
}

class NavigationC extends React.Component<IProps> {
  public onSearch: () => (values: IForm) => void;
  public getGames: (dispatch: Dispatch<IGamesAction>, search: string) => void;
  public getChannels: (dispatch: Dispatch<IChannelsAction>, search: string) => void;

  constructor(props: IProps) {
    super(props);

    this.onSearch = () => (values: IForm) => this.search(values);
    this.renderForm = this.renderForm.bind(this);
    this.textFieldAdapter = this.textFieldAdapter.bind(this);
    this.getGames = _.debounce(getGames, 200, {leading: false, trailing: true});
    this.getChannels = _.debounce(getChannels, 200, {leading: false, trailing: true});
  }

  private splitSearch(search?: string) {
    let value = search || '';
    let type = '';

    if (search) {
      const splitSearch = search.split(';|;');

      if (splitSearch.length === 2) {
        type = splitSearch[0];
        value = splitSearch[1];
      }
    }

    return { type, value };
  }

  public search(values: IForm) {
    getClips(this.props.dispatch, { type: 'game', search: values.search });
  }

  public textFieldAdapter(field: FieldRenderProps<any> & any) {
    const { games, channels } = this.props;

    const dataSource = (field.input.value) ? [{
      title: 'Channels',
      type: 'channel',
      children: Object.keys(channels.data).map((key) => {
        return channels.data[key].name;
      })
    }, {
      title: 'Games',
      type: 'game',
      children: Object.keys(games.data).map((key) => {
        return games.data[key].name;
      })
    }] : [];

    const options = dataSource.map((group: any) => (
      <OptGroup
        key={group.title}
        label={group.title}
      >
        {group.children.map((opt: any) => (
          <Option key={opt} value={`${group.type};|;${opt}`}>
            {opt}
          </Option>
        ))}
      </OptGroup>
    ));

    const onChange = (search: any) => {
      const { value } = this.splitSearch(search);

      this.getGames(this.props.dispatch, value);
      this.getChannels(this.props.dispatch, value);
      field.input.onChange(value);
    };

    const onSelect = (search: any) => {
      const { value, type } = this.splitSearch(search);

      this.props.history.push({
        pathname: `/${type}/${value}`
      });

      getClips(this.props.dispatch, { type, search: value });
    };

    return (
      <AutoComplete
        placeholder="Search"
        value={field.input.value}
        onChange={onChange}
        dataSource={options}
        onSelect={onSelect}
      />
    );
  }

  public renderForm(form: FormRenderProps) {
    return (
      <form className={style.searchBar} onSubmit={form.handleSubmit}>
        <Field
          name="search"
          component={this.textFieldAdapter}
          handleSubmit={form.handleSubmit}
        />
      </form>
    );
  }

  public render() {
    return (
      <div className={style.Nav}>
        <div className={style.searchBarContainer}>
          <Form onSubmit={this.onSearch()} render={this.renderForm} />
        </div>
        <div className={style.items}>
          <Link to="/about">About</Link>
        </div>
      </div>
    );
  }
}

export const Navigation = connect(
  (state: IStore) => {
    return {
      games: state.games,
      channels: state.channels
    };
  },
  (d: Dispatch<IGamesAction>) => ({ dispatch: d })
)(router(NavigationC as any));
