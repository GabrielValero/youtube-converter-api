import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SearchListResponse, SearchResult, TrackData } from 'src/types';
import replaceSpecialCharacters from '../utils/replaceSpecialCharacters';
import { Item, Snippet, YoutubeResponse } from 'src/types/youtubeApiTypes';

type ResponseItem = Snippet & Partial<{duration: string, licensedContent: boolean, viewCount: number}>
type Response = Omit<Item, "snippet"> & {snippet: ResponseItem}

@Injectable()
export class YoutubeService {

  async getListBySearch(query: string, maxResults: number = 30) {
    const url = `${process.env.YT_API_URL}/search?&key=${process.env.YT_API_KEY}&fields=items(id(kind, videoId), snippet(publishedAt, title, description, thumbnails, channelTitle))&part=snippet&type=video|playlist&maxResults=${maxResults}&order=relevance&q=${query}`;
    const videoList = await fetch(url);
    if (!videoList.ok) {
      const errorData = await videoList.json();
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error en la solicitud: ${errorData.msg || videoList.status}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const trackList: YoutubeResponse = await videoList.json();
    const contentVideosInfo = await this.getInfoListById(`${trackList.items.map((video) => video.id.kind === "youtube#video" && video.id.videoId)}`)
    var result: Response[] = trackList.items.filter(video => video.id.kind === "youtube#playlist")
    for(let i = 0; i< contentVideosInfo.length; i++){
      let videoInfo: Item = trackList.items.filter(video => video.id.kind === "youtube#video")[i]
      let infoTemp: Response = {
        id: videoInfo.id,
        snippet:{
          ... videoInfo.snippet,
          duration: contentVideosInfo[i].contentDetails.duration,
          licensedContent: contentVideosInfo[i].contentDetails.licensedContent,
          viewCount: contentVideosInfo[i].statistics.viewCount
        },
      }
      console.log(infoTemp)
      console.log(contentVideosInfo[i])
      result.push(infoTemp)
    }
    return result;
  }

  async getInfoListById(listId: string) {
    const url = `${process.env.YT_API_URL}/videos?&key=${process.env.YT_API_KEY}&part=contentDetails,statistics&id=${listId}&fields=items(contentDetails(duration,licensedContent),statistics(viewCount))`;
    const fetchResponse = await fetch(url);
    if (!fetchResponse.ok) {
      const errorData = await fetchResponse.json();
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error en la solicitud: ${errorData.msg || fetchResponse.status}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const videoInfo = await fetchResponse.json();
    return videoInfo.items;
  }

  async getVideoRelatedListById(videoId: string) {
    const url = `${process.env.YT_API_URL}/search?&key=${process.env.YT_API_KEY}&part=snippet&relatedToVideoId=${videoId}&type=video|playlist`;
    const fetchResponse = await fetch(url);
    if (!fetchResponse.ok) {
      const errorData = await fetchResponse.json();
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error en la solicitud: ${errorData.msg || fetchResponse.status}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const relatedList = await fetchResponse.json();
    return relatedList;
  }
}
