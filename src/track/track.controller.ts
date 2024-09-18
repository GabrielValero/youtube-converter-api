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
    try {
      const trackUrl = await this.trackService.fetchDownloadUrl(id);
      return trackUrl;
    } catch (error) {
      // Si el error es una instancia de HttpException, usa su código de estado
      const statusCode =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: statusCode,
          error: `Error inesperado ${error.message}`,
        },
        statusCode,
      );
    }
  }
}
