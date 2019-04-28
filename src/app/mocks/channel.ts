import { IChannels, IChannel } from '../redux/modules/channels';

const channels: IChannels<IChannel> = {
  starcraft: {
    _id: 42508152,
    broadcaster_language: 'en',
    created_at: '2013-04-15T20:39:45.364539Z',
    display_name: 'StarCraft',
    followers: 149012,
    game: 'StarCraft II',
    language: 'en',
    logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/starcraft-profile_image-91cdefae9d5ee8b4-300x300.png',
    mature: false,
    name: 'starcraft',
    partner: false,
    profile_banner: 'https://static-cdn.jtvnw.net/jtv_user_pictures/starcraft-profile_banner-8a0bd21175f60469-480.png',
    profile_banner_background_color: '',
    status: '2016 WCS Global Finals @BlizzCon',
    updated_at: '2016-12-15T21:35:27.851329Z',
    url: 'https://www.twitch.tv/starcraft',
    video_banner: 'https://static-cdn.jtvnw.net/jtv_user_pictures/starcraft-channel_offline_image-9f80ccdb7362a1d9-1920x1080.jpeg',
    views: 19881024
  }
};

export default channels;
