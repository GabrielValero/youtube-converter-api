import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SearchListResponse, SearchResult, TrackData } from 'src/types';
import replaceSpecialCharacters from '../utils/replaceSpecialCharacters';

@Injectable()
export class TrackService {
  async fetchTrackList(key: string, limit: number = 20) {
    const url = `${process.env.YT_API_URL}/search?&key=${process.env.YT_API_KEY}&q=${key}&maxResults=${limit}&order=relevance&type=video&part=snippet`;

    const fetchResponse = await fetch(url);

    if (!fetchResponse.ok) {
      const errorData = await fetchResponse.json();
      // Puedes usar HttpException para lanzar errores HTTP con códigos de estado
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error en la solicitud: ${errorData.msg || fetchResponse.status}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const trackList: SearchListResponse = await fetchResponse.json();
    const result = await Promise.all(
      trackList.items.map(
        async (track: SearchResult): Promise<TrackData> => ({
          title: replaceSpecialCharacters(track.snippet.title),
          artwork: track.snippet.thumbnails,
          videoId: track.id.videoId,
          artist: await replaceSpecialCharacters(track.snippet.channelTitle),
          description: track.snippet.description,
          publishedAt: track.snippet.publishedAt,
          channelId: track.snippet.channelId,
          duration: await this.getContentDuration(track.id.videoId),
        }),
      ),
    );
    console.log(result);

    return { trackList: result, status: HttpStatus.OK };
  }
  fetchTrackById(id: string) {}
  fetchLyricTrack(id: string) {}

  async getContentDuration(id): Promise<string> {
    const url = `${process.env.YT_API_URL}/videos?&key=${process.env.YT_API_KEY}&id=${id}&part=contentDetails`;
    const fetchResponse = await fetch(url);
    const videoDetails = await fetchResponse.json();
    const duration = videoDetails.items[0].contentDetails.duration;
    return duration;
  }
}
