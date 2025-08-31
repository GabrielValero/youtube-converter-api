export interface YoutubeResponse {
 items: Item[];
}

export interface Item {
 id:      ID;
 snippet: Snippet;
}

export interface ID {
 kind: "youtube#playlist" | "youtube#video";
 videoId: string;
}

export interface Snippet {
 channelTitle: string;
 description:  string;
 publishedAt:  Date;
 thumbnails:   Thumbnails;
 title:        string;
}

export interface Thumbnails {
 default: Default;
 high:    Default;
 medium:  Default;
}

export interface Default {
 height: number;
 url:    string;
 width:  number;
}
