import * as React from 'react';
import { Link, withRouter as router } from 'react-router-dom';
import AutoComplete from 'antd/lib/auto-complete';
import _ from 'lodash';
import { Form, Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getChannels, IChannelsRequest, IChannelsAction } from '../../redux/modules/channels';
import { getGames, IGamesRequest, IGamesAction } from '../../redux/modules/games';
import { IStore } from '../../redux/IStore';
import { History } from 'history';
import { IClipsRequest } from '../../redux/modules/clips';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const style = require('./style.scss');

interface IProps {
  dispatch: Dispatch;
  games: IGamesRequest;
  clips: IClipsRequest;
  channels: IChannelsRequest;
  history: History;
}

interface IForm {
  name?: string;
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
    let name = search || '';
    let type = '';

    if (search) {
      const splitSearch = search.split(';|;');

      if (splitSearch.length === 2) {
        type = splitSearch[0];
        name = splitSearch[1];
      }
    }

    return { type, name };
  }

  public search(values: IForm) {
    const { clips } = this.props;

    this.props.history.push({
      pathname: `/game/${values.name}/${clips.search.period}`
    });
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
      const { name } = this.splitSearch(search);

      this.getGames(this.props.dispatch, name);
      this.getChannels(this.props.dispatch, name);
      field.input.onChange(name);
    };

    const onSelect = (search: any) => {
      const { clips } = this.props;
      const { name, type } = this.splitSearch(search);

      this.props.history.push({
        pathname: `/${type}/${name}/${clips.search.period}`
      });
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
      clips: state.clips,
      channels: state.channels
    };
  },
  (d: Dispatch<IGamesAction>) => ({ dispatch: d })
)(router(NavigationC as any));
