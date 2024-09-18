export interface TrackData {
  title: string;
  artwork: thumbnailType;
  videoId: string;
  artist: string;
  description: string;
  publishedAt: Date;
  channelId: string;
  duration?: string;
}
interface SearchListResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchResult[];
}

interface SearchResult {
  kind: 'youtube#searchResult';
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: thumbnailType;
    channelTitle: string;
    liveBroadcastContent: string;
  };
}

type thumbnailType = {
    [key: string]: {
      url: string;
      width: number;
      height: number;
    };
  }