import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { GetDownloadTrackDto } from './dto/get-download-url.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  trackService: TrackService;
  constructor(trackService: TrackService) {
    this.trackService = trackService;
  }

  @Get()
  async getDownloadTrack(@Query('id') id: string) {
      const trackUrl = await this.trackService.fetchDownloadUrl(id);
      return trackUrl;
  }
  @Get('/search')
  async searchTracks(@Query('key') key: string, @Query('limit') limit: number) {
    const trackList = await this.trackService.fetchTrackList(key, limit);
    return trackList;
  }
}
