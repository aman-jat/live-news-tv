export interface Channel {
  id: string;
  name: string;
  youtubeId: string;
  color: string;
}

// These are placeholder YouTube IDs. Some might change if the live stream URL changes,
// but usually major news networks have a persistent live video ID or we can update them.
export const channels: Channel[] = [
  {
    id: 'aaj_tak',
    name: 'Aaj Tak HD',
    youtubeId: 'Nq2wYlWFucg', // Example Aaj Tak Live ID
    color: '#E21B22',
  },
  {
    id: 'abp_news',
    name: 'ABP News',
    youtubeId: 'yrnFXdvlJFE', // Example ABP News Live ID
    color: '#F6C103',
  },
  {
    id: 'india_tv',
    name: 'India TV',
    youtubeId: '2fiS8jt63tk', // Example India TV Live ID
    color: '#00479A',
  },
  {
    id: 'zee_news',
    name: 'Zee News',
    youtubeId: 'CFeD8fTQDo4', // Example Zee News Live ID
    color: '#16599A',
  },
  {
    id: 'republic_bharat',
    name: 'Republic Bharat',
    youtubeId: 'hD8PGJzE1OA', // Example Republic Bharat Live ID
    color: '#E5161A',
  },
  {
    id: 'ndtv_india',
    name: 'NDTV India',
    youtubeId: 'o09hfmSJJvk', // Example NDTV India Live ID
    color: '#C51921',
  },
];
