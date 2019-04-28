import { IClips, IClip } from '../redux/modules/clips';

const clips: IClips<IClip> = {
  AmazonianEncouragingLyrebirdAllenHuhu: {
    slug: 'AmazonianEncouragingLyrebirdAllenHuhu',
    tracking_id: '13160765',
    url: 'https://clips.twitch.tv/AmazonianEncouragingLyrebirdAllenHuhu?tt_medium=clips_api&tt_content=url',
    embed_url: 'https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed',
    embed_html: '<iframe src="https://clips.twitch.tv/embed?clip=AmazonianEncouragingLyrebirdAllenHuhu&tt_medium=clips_api&tt_content=embed" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>',
    broadcaster: {
      id: '12826',
      name: 'twitch',
      display_name: 'Twitch',
      channel_url: 'https://www.twitch.tv/twitch',
      logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/twitch-profile_image-8a8c5be2e3b64a9a-300x300.png'
    },
    curator: {
      id: '59222117',
      name: 'skiptoplay',
      display_name: 'SkipToPlay',
      channel_url: 'https://www.twitch.tv/skiptoplay',
      logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/skiptoplay-profile_image-1d66e001a46b0c9d-300x300.png'
    },
    vod: {
      id: '107049351',
      url: 'https://www.twitch.tv/videos/107049351?t=0s'
    },
    game: '',
    language: 'en',
    title: 'Clip Title Editing',
    views: 106,
    duration: 32.000333,
    created_at: '2016-12-14T16:28:49Z',
    thumbnails: {
      medium: 'https://clips-media-assets.twitch.tv/vod-107049351-offset-26-preview-480x272.jpg',
      small: 'https://clips-media-assets.twitch.tv/vod-107049351-offset-26-preview-260x147.jpg',
      tiny: 'https://clips-media-assets.twitch.tv/vod-107049351-offset-26-preview-86x45.jpg'
    }
  }
};

export default clips;
